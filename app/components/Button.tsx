import React, { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "danger" | "outline";
	fullWidth?: boolean;
	isLoading?: boolean;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	fullWidth = false,
	isLoading = false,
	className = "",
	disabled,
	...props
}) => {
	const baseStyles =
		"inline-flex items-center justify-center font-semibold transition-colors focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed px-4 py-3 text-base rounded-lg";

	const variantStyles = {
		primary:
			"bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-500/20 focus:ring-blue-500",
		danger: "bg-red-800 hover:bg-red-700 text-white focus:ring-red-500",
		outline:
			"bg-transparent border border-zinc-700 hover:bg-zinc-800 text-zinc-300",
	};

	const widthStyles = fullWidth ? "w-full" : "";

	const classes = [baseStyles, variantStyles[variant], widthStyles, className]
		.filter(Boolean)
		.join(" ");

	return (
		<button className={classes} disabled={disabled || isLoading} {...props}>
			{isLoading ? (
				<span className="flex items-center gap-2">
					<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
					Loading...
				</span>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
