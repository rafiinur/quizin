import { useEffect } from "react";
import { PiClockCountdown } from "react-icons/pi";
import { useQuizStore } from "~/stores/useQuizStore";

const TimerCountdown = () => {
	const timeLeft = useQuizStore((state) => state.timeLeft);

	useEffect(() => {
		const interval = setInterval(() => {
			useQuizStore.getState().tickTime();
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative flex items-center justify-center w-24 h-12 bg-zinc-900 border border-zinc-800 rounded-full shadow-inner">
			<div className="flex items-center gap-2 text-blue-400">
				<PiClockCountdown />
				<span className="text-xl font-bold tracking-wider pt-0.5">
					{timeLeft}
				</span>
			</div>
		</div>
	);
};

export default TimerCountdown;
