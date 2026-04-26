import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: ["build/**", ".react-router/**", "node_modules/**"],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			"react-hooks": reactHooks,
			"jsx-a11y": jsxA11y,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,
			"react-hooks/purity": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
			],
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
);
