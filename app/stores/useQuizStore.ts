import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Question } from "~/types/quiz";
import { clearCache } from "~/utils/api";

export interface QuizState {
	user: string | null;
	sessionToken: string | null;
	questions: Question[];
	currentIndex: number;
	timeLeft: number;
	isFinished: boolean;
	answers: Record<number, string>;

	// AUTH🔒
	login: (username: string) => void;
	logout: () => void;
	setSessionToken: (token: string | null) => void;

	// QUIZ❓
	setQuestions: (data: Question[]) => void;
	submitAnswer: (answer: string) => void;
	nextQuestion: () => void;
	tickTime: () => void;
	resetQuiz: () => void;
	getScore: () => { correct: number; wrong: number; answered: number };
}

export const useQuizStore = create<QuizState>()(
	persist(
		(set, get) => ({
			user: null,
			sessionToken: null,
			questions: [],
			currentIndex: 0,
			timeLeft: 30,
			isFinished: false,
			answers: {},

			login: (username: string) => {
				clearCache();
				set({
					user: username,
					questions: [],
					answers: {},
					currentIndex: 0,
					timeLeft: 30,
					isFinished: false,
				});
			},

			logout: () => {
				clearCache();
				set({
					user: null,
					sessionToken: null,
					questions: [],
					answers: {},
					currentIndex: 0,
					timeLeft: 30,
					isFinished: false,
				});
			},

			setSessionToken: (token: string | null) => set({ sessionToken: token }),

			setQuestions: (data: Question[]) => {
				set({ questions: data, currentIndex: 0, timeLeft: 30 });
			},

			submitAnswer: (answer: string) => {
				const { currentIndex, isFinished, questions, nextQuestion } = get();

				if (
					isFinished ||
					!answer ||
					currentIndex < 0 ||
					currentIndex >= questions.length
				) {
					return;
				}

				set((state) => ({
					answers: {
						...state.answers,
						[currentIndex]: answer,
					},
				}));

				nextQuestion();
			},
			nextQuestion: () => {
				const { currentIndex, questions } = get();

				if (currentIndex < questions.length - 1) {
					set({ currentIndex: currentIndex + 1 });
				} else {
					set({ isFinished: true });
				}
			},

			tickTime: () => {
				const { timeLeft, isFinished } = get();

				if (isFinished || timeLeft <= 0) return;

				if (timeLeft > 1) {
					set({ timeLeft: timeLeft - 1 });
				} else {
					set({ timeLeft: 0, isFinished: true });
				}
			},

			resetQuiz: () => {
				clearCache();
				set({
					sessionToken: null,
					questions: [],
					answers: {},
					currentIndex: 0,
					timeLeft: 30,
					isFinished: false,
				});
			},

			getScore: () => {
				const { questions, answers } = get();
				let correct = 0;

				questions.forEach((q, index) => {
					if (answers[index] === q.correct_answer) correct++;
				});

				const answered = Object.keys(answers).length;
				return {
					correct,
					wrong: questions.length - correct,
					answered,
				};
			},
		}),
		{
			name: "quiz-storage",
		},
	),
);
