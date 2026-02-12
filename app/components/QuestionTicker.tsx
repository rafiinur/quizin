import { useShallow } from "zustand/react/shallow";
import { useQuizStore } from "~/stores/useQuizStore";

const QuestionTicker = () => {
	const { totalQuestion, currentIndex } = useQuizStore(
		useShallow((state) => ({
			totalQuestion: state.questions.length,
			currentIndex: state.currentIndex,
		})),
	);
	return (
		<div className="hidden md:flex flex-col items-center gap-1.5">
			<div className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
				Soal <span className="text-zinc-200">{currentIndex + 1}</span> /{" "}
				{totalQuestion}
			</div>
			<div className="flex items-center gap-1">
				{Array.from({ length: totalQuestion }).map((_, i) => {
					const isActive = i === currentIndex;
					const isCompleted = i < currentIndex;

					return (
						<div
							key={i}
							className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
								isActive
									? "bg-blue-500 scale-110"
									: isCompleted
										? "bg-green-500/50"
										: "bg-zinc-800"
							}`}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default QuestionTicker;
