import React, { type InputHTMLAttributes } from "react";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const InputText: React.FC<InputTextProps> = ({
	label,
	error,
	className = "",
	id,
	...props
}) => {
	const inputId = id || props.name;

	return (
		<div className="w-full">
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-medium mb-2 text-zinc-300"
				>
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={`
					w-full px-4 py-3 bg-zinc-950 border rounded-lg 
					focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
					transition-all text-zinc-100 placeholder:text-zinc-600
					${error ? "border-red-500 focus:ring-red-500" : "border-zinc-700"}
					${className}
				`}
				{...props}
			/>
			{error && (
				<p className="mt-2 text-sm text-red-400 flex items-center gap-1">
					{error}
				</p>
			)}
		</div>
	);
};

export default InputText;
