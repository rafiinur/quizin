import { useQuizStore } from "~/stores/useQuizStore";

const CACHE_KEY = "quizin-questions-cache";
const CACHE_DURATION = 5 * 60 * 1000;

export const getCachedQuestions = () => {
	try {
		const cached = localStorage.getItem(CACHE_KEY);

		// Jika tidak ada cache, return
		if (!cached) return null;

		// Cek apakah cache masih valid
		const { data, timestamp } = JSON.parse(cached);
		const now = Date.now();

		if (now - timestamp < CACHE_DURATION) {
			return data;
		}

		return null;
	} catch (error) {
		return null;
	}
};

const setCachedQuestions = (data: any) => {
	try {
		localStorage.setItem(
			CACHE_KEY,
			JSON.stringify({
				data,
				timestamp: Date.now(),
			}),
		);
	} catch (error) {
		console.warn(error);
	}
};

export const clearCache = () => {
	try {
		localStorage.removeItem(CACHE_KEY);
	} catch (error) {
		console.warn(error);
	}
};

export async function fetchQuestions(): Promise<any> {
	try {
		const token = await getSessionToken();

		const res = await fetch(
			`https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&token=${token}`,
		);
		const data = await res.json();

		// Handle error jika token bermasalah
		if (data.response_code === 3 || data.response_code === 4) {
			// Reset token dan coba fetch ulang
			try {
				await fetch(
					`https://opentdb.com/api_token.php?command=reset&token=${token}`,
				);
				return fetchQuestions();
			} catch (e) {
				console.error(e);
			}
		}

		if (data.response_code === 0) {
			setCachedQuestions(data);
			return { ...data, mode: "new" };
		}

		// Error rate limit, coba ambil dari cache
		if (data.response_code === 5) {
			const cached = getCachedQuestions();
			if (cached) {
				return cached;
			}
		}

		return data;
	} catch (error) {
		console.error("Network error:", error);

		const cached = getCachedQuestions();
		if (cached) {
			return cached;
		}

		return { response_code: -1, results: [], mode: "error" };
	}
}

export const getSessionToken = async (): Promise<string> => {
	const token = useQuizStore.getState().sessionToken;
	const setSessionToken = useQuizStore.getState().setSessionToken;

	// Jika ada token di store, kembalikan token
	if (token) return token;

	// Kalau tidak, fetch token baru
	try {
		const res = await fetch(
			"https://opentdb.com/api_token.php?command=request",
		);
		const data = await res.json();
		if (data.response_code === 0 && data.token) {
			setSessionToken(data.token);
			return data.token;
		}
	} catch (error) {
		console.error("Failed to get session token:", error);
	}
	return "";
};
