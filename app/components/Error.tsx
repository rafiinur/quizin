import { useNavigate } from "react-router";
import Button from "./Button";

type ErrorConfig = {
	title: string;
	message: string;
	showRetry?: boolean;
};

const ERROR_MESSAGE: Record<number, ErrorConfig> = {
	1: {
		title: "No Results",
		message: "Tidak ada soal tersedia untuk kategori ini",
	},
	2: {
		title: "Invalid Parameter",
		message: "Konfigurasi quiz tidak valid",
	},
	3: { title: "Token Not Found", message: "Your session has ended" },
	4: {
		title: "Token Empty",
		message: "Token soal habis. Silakan mulai quiz baru",
	},
	5: {
		title: "Rate Limit",
		message: "Mohon tunggu beberapa detik",
		showRetry: true,
	},
	[-1]: {
		title: "Network Error",
		message: "Periksa koneksi internet Anda",
	},
};

const Error = ({ responseCode }: { responseCode: number }) => {
	const navigate = useNavigate();
	const config = ERROR_MESSAGE[responseCode] || {
		title: "Terjadi Kesalahan",
		message: "Kesalahan tidak diketahui",
	};

	return (
		<div className="relative h-screen flex flex-col items-center justify-center text-zinc-50 bg-zinc-950 gap-6 p-4">
			<div className="text-center space-y-2 max-w-md">
				<h2 className="text-2xl font-bold text-red-400">{config.title}</h2>
				<p className="text-lg text-zinc-300">{config.message}</p>
			</div>
			<div className="flex gap-3">
				<Button variant="outline" onClick={() => navigate("/")}>
					Kembali ke Home
				</Button>
				{config.showRetry && (
					<Button variant="primary" onClick={() => window.location.reload()}>
						Coba Lagi
					</Button>
				)}
			</div>
		</div>
	);
};

export default Error;
