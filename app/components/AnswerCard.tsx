import { useQuizStore } from "~/stores/useQuizStore";
import { sanitize } from "~/utils/sanitize";

interface AnswerCardProps {
	answer: string;
	choice: number;
}

const choiceLabels = ["A", "B", "C", "D"];

const AnswerCard = ({ answer, choice }: AnswerCardProps) => {
	const submitAnswer = useQuizStore((state) => state.submitAnswer);

	const handleAnswer = () => {
		submitAnswer(answer);
	};

	return (
		<button
			type="button"
			onClick={handleAnswer}
			className="
                group relative w-full p-6 text-left transition-all duration-300 border rounded-xl
                bg-zinc-900/50 border-zinc-700 
                hover:bg-zinc-800 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 
                cursor-pointer active:scale-[0.98]
            "
		>
			<div className="flex items-center gap-4">
				<div className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-lg shrink-0 transition-colors bg-zinc-800 text-zinc-300 group-hover:bg-blue-600 group-hover:text-white">
					{choiceLabels[choice]}
				</div>
				<span className="text-lg font-medium text-zinc-200">
					{sanitize(answer)}
				</span>
			</div>
		</button>
	);
};

export default AnswerCard;
