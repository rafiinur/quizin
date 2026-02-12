import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuizStore } from "~/stores/useQuizStore";
import {
	PiCheckCircle,
	PiXCircle,
	PiArrowRight,
	PiSignOut,
	PiListChecks,
} from "react-icons/pi";
import Button from "~/components/Button";
import { useShallow } from "zustand/shallow";
import StatItem from "~/components/StatItem";

export function meta() {
	return [
		{ title: "Hasil Quiz - Quizin" },
		{ name: "description", content: "Hasil pengerjaan quiz" },
	];
}

export default function Result() {
	const navigate = useNavigate();

	const { user, questions, isFinished, getScore, resetQuiz, logout } =
		useQuizStore(
			useShallow((state) => ({
				user: state.user,
				questions: state.questions,
				isFinished: state.isFinished,
				getScore: state.getScore,
				resetQuiz: state.resetQuiz,
				logout: state.logout,
			})),
		);

	const { correct, wrong, answered } = getScore();

	const totalQuestions = questions.length;
	const percentage =
		totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

	useEffect(() => {
		if (!user) {
			navigate("/");
			return;
		}
		if (!isFinished || questions.length === 0) {
			navigate("/quiz");
		}
	}, [isFinished, questions, navigate, user]);

	const handlePlayAgain = () => {
		resetQuiz();
		navigate("/");
	};

	const handleLogout = () => {
		logout();
	};

	if (!isFinished || questions.length === 0) {
		return null;
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 p-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2">Quiz Selesai!</h1>
				</div>

				{/* Score Card - Start*/}
				<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
					<div className="text-center mb-6">
						<div className="text-6xl font-bold text-blue-500 mb-2">
							{percentage}%
						</div>
					</div>
					<p className="mb-4 text-zinc-400">Username: {user}</p>
					{/* Stats */}
					<div className="space-y-4">
						<StatItem
							icon={<PiCheckCircle className="text-green-500 text-xl" />}
							label="Jawaban Benar"
							value={correct}
							className="text-green-400"
						/>
						<StatItem
							icon={<PiXCircle className="text-red-500 text-xl" />}
							label="Jawaban Salah"
							value={wrong}
							className="text-red-400"
						/>
						<StatItem
							icon={<PiListChecks className="text-blue-500 text-xl" />}
							label="Soal Terjawab"
							value={answered}
							className="text-blue-400"
						/>

						<div className="border-t border-zinc-700 pt-4 mt-4">
							<div className="flex items-center justify-between">
								<span className="text-zinc-400">Total Soal</span>
								<span className="font-bold">{totalQuestions}</span>
							</div>
						</div>
					</div>
				</div>
				{/* Score Card - End*/}

				{/* Action Buttons - Start */}
				<div className="flex flex-col gap-3">
					<Button
						type="button"
						onClick={handlePlayAgain}
						variant="primary"
						fullWidth
						className="gap-2"
					>
						<span>Main Lagi</span>
						<PiArrowRight />
					</Button>
					<Button
						type="button"
						onClick={handleLogout}
						variant="danger"
						fullWidth
						className="gap-2"
					>
						<span>Keluar</span>
						<PiSignOut />
					</Button>
				</div>
				{/* Action Buttons - Start */}
			</div>
		</div>
	);
}
