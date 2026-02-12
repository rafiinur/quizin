import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuizStore } from "~/stores/useQuizStore";
import LoginForm from "~/components/LoginForm";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Login - Quizin" },
		{ name: "description", content: "Login" },
	];
}

export default function Home() {
	const navigate = useNavigate();
	const user = useQuizStore((state) => state.user);

	// Redirect jika sudah login
	useEffect(() => {
		if (user) {
			navigate("/quiz");
		}
	}, [user, navigate]);

	return (
		<div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50">
			<main className="flex-1 flex items-center justify-center p-4">
				<div className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold bg-linear-to-r text-blue-500 mb-2">
							Login
						</h1>
						<p className="text-zinc-400">Masukkan nama untuk memulai quiz!</p>
					</div>
					<LoginForm />
				</div>
			</main>
		</div>
	);
}
