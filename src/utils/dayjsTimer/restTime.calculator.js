import { useEffect, useState } from 'react';
import { getRemainingTimeUntilMsTimestamp } from './restTime';

const defaultRemainingTime = {
	seconds: '00',
	minutes: '00',
	hours: '00',
	days: '00',
};

export const RestTimeCalculator = (countdownTimestampMs) => {
	const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
	useEffect(() => {
		const intervalId = setInterval(() => {
			updateRemainingTime(countdownTimestampMs);
		}, 1000);
		return () => clearInterval(intervalId);
	}, [countdownTimestampMs]);

	function updateRemainingTime(countdown) {
		setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
	}
	return { remainingTime };
};
