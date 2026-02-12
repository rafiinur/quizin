interface DifficultyBadgeProps {
	label: "easy" | "medium" | "hard";
}

const DIFFICULTY_STYLE: Record<string, string> = {
	easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
	medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
	hard: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const DifficultyBadge = ({ label }: DifficultyBadgeProps) => {
	return (
		<div
			className={`inline-flex items-center justify-center px-3 py-1 rounded-full capitalize text-xs font-medium border ${DIFFICULTY_STYLE[label]}`}
		>
			{label}
		</div>
	);
};

export default DifficultyBadge;
