export interface Question {
	category: string;
	correct_answer: string;
	difficulty: "easy" | "medium" | "hard";
	incorrect_answers: string[];
	question: string;
	type: "multiple" | "boolean";
}

export interface ApiResponse {
	response_code: number;
	results: Question[];
}
