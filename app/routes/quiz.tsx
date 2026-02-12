import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/shallow";
import { fetchQuestions, getCachedQuestions } from "~/utils/api";
import { type QuizState, useQuizStore } from "~/stores/useQuizStore";
import AnswerCard from "~/components/AnswerCard";
import TimerCountdown from "~/components/TimerCountdown";
import QuestionCard from "~/components/QuestionCard";
import QuestionTicker from "~/components/QuestionTicker";
import DifficultyBadge from "~/components/DifficultyBadge";
import CategoryBadge from "~/components/CategoryBadge";
import Spinner from "~/components/Spinner";
import Error from "~/components/Error";
import type { Route } from "./+types/quiz";
import type { Question } from "~/types/quiz";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Quizin" }, { name: "description", content: "Quizin" }];
}

export async function clientLoader() {
	const { questions, isFinished } = useQuizStore.getState();

	// Lanjutkan quiz jika ada pertanyaan yang belum selesai
	if (questions.length > 0 && !isFinished) {
		return { response_code: 0, results: [], mode: "resume" };
	}

	// Gunakan cache jika ada
	const cached = getCachedQuestions();
	if (cached) {
		return { ...cached, mode: "cached" };
	}

	// Kalau ga ada cache, fetch baru
	const data = await fetchQuestions();
	return { ...data, mode: "fresh" };
}

export default function Quiz({ loaderData }: Route.ComponentProps) {
	const navigate = useNavigate();

	const { user, questions, setQuestions, currentIndex, isFinished } =
		useQuizStore(
			useShallow((state: QuizState) => ({
				user: state.user,
				questions: state.questions,
				setQuestions: state.setQuestions,
				currentIndex: state.currentIndex,
				isFinished: state.isFinished,
			})),
		);

	// Validasi User
	useEffect(() => {
		if (!user) {
			navigate("/", { replace: true });
		}
	}, [user, navigate]);

	// Set question dari loaderData
	useEffect(() => {
		const { results, mode, response_code } = loaderData;

		if (mode === "resume" || response_code !== 0) {
			return;
		}

		if (results && Array.isArray(results) && results.length > 0) {
			setQuestions(results as Question[]);
		}
	}, [loaderData, setQuestions]);

	// Navigasi ke halaman results jika quiz selesai
	useEffect(() => {
		if (isFinished && questions.length > 0) {
			navigate("/results", { replace: true });
		}
	}, [isFinished, questions.length, navigate]);

	// Acak jawaban setiap render
	const shuffledAnswers = useMemo(() => {
		const question = questions[currentIndex];
		if (!question) return [];

		const allAnswers = [question.correct_answer, ...question.incorrect_answers];

		return allAnswers.sort(() => Math.random() - 0.5);
	}, [questions, currentIndex]);

	// Error handler
	if (loaderData.response_code !== 0 && loaderData.mode !== "resume") {
		return <Error responseCode={loaderData.response_code} />;
	}

	// Loading state
	if (!user || questions.length === 0 || !questions[currentIndex]) {
		return (
			<div className="relative h-screen flex flex-col items-center justify-center text-zinc-50 bg-zinc-950">
				<Spinner />
			</div>
		);
	}

	const currentQuestion = questions[currentIndex];

	return (
		<div className="relative h-screen flex flex-col overflow-hidden text-zinc-50 bg-zinc-950">
			<main className="w-full flex-1 flex flex-col items-center p-4 md:p-8 overflow-hidden bg-zinc-950/50">
				<div className="w-full max-w-5xl flex flex-col gap-4 h-full">
					{/* Top Bar - Start*/}
					<div className="flex justify-between items-center w-full shrink-0">
						<TimerCountdown />
						<QuestionTicker />
						<div className="flex items-center gap-2">
							<DifficultyBadge label={currentQuestion.difficulty} />
							<CategoryBadge name={currentQuestion.category} />
						</div>
					</div>
					{/* Top Bar - End*/}

					{/* Question - Start*/}
					<div className="flex-1 flex items-center justify-center w-full min-h-0">
						<QuestionCard question={currentQuestion.question} />
					</div>
					{/* Question - End*/}

					{/* Answers - Start*/}
					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0 mt-auto">
						{shuffledAnswers.map((answer, index) => (
							<AnswerCard key={index} answer={answer} choice={index} />
						))}
					</div>
					{/* Answers - End*/}
				</div>
			</main>
		</div>
	);
}
