import { useState } from "react";
import { useQuizStore } from "~/stores/useQuizStore";
import Button from "./Button";
import InputText from "./InputText";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");

	const login = useQuizStore((state) => state.login);

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		if (username.length === 0) {
			setError("Username tidak boleh kosong.");
			return;
		}

		login(username);
		window.location.href = "/quiz";
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<InputText
				label="Username"
				id="username"
				value={username}
				onChange={(e) => {
					setUsername(e.target.value);
					setError("");
				}}
				placeholder="Masukkan username..."
				autoFocus
				error={error}
			/>

			<Button type="submit" variant="primary" fullWidth>
				Mulai Quiz
			</Button>
		</form>
	);
};

export default LoginForm;
