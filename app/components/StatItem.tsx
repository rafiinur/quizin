export default function StatItem({ icon, label, value, className }: any) {
	return (
		<div
			className={`flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg ${className}`}
		>
			<div className="flex items-center gap-3">
				{icon}
				<span className="text-zinc-300 text-sm">{label}</span>
			</div>
			<span className="font-bold">{value}</span>
		</div>
	);
}
