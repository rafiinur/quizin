const QuestionCard = ({ question }: { question: string }) => {
	return (
		<div className="w-full max-w-4xl mx-auto bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
			<div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
			<div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent opacity-50" />

			<div className="relative z-10 flex flex-col items-center justify-center min-h-40">
				<p
					className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-zinc-100 leading-relaxed tracking-tight max-w-prose"
					dangerouslySetInnerHTML={{ __html: question }}
				></p>
			</div>

			<div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent opacity-50" />
		</div>
	);
};

export default QuestionCard;
