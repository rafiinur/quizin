interface CategoryBadgeProps {
	name: string;
}

const CategoryBadge = ({ name }: CategoryBadgeProps) => {
	return (
		<div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 whitespace-nowrap">
			{name}
		</div>
	);
};

export default CategoryBadge;
