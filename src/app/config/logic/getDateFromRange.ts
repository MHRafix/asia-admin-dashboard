import { useState } from 'react';

// filter booking with date and status
export const useGetDateFilteredBookings = (filter: any) => {
	const [startDate, setStartDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();

	var getDaysArray = function (s: string, e: string) {
		for (
			var a = [], d = new Date(s);
			d <= new Date(e);
			d.setDate(d.getDate() + 1)
		) {
			a.push(new Date(d).toDateString());
		}
		return a;
	};

	// getDaysArray(filter?.firstDate, filter?.lastDate)?.map(async (date) => {
	// 	setStartDate(subDays(new Date(date), 1));
	// 	setEndDate(addDays(startDate!, 1));
	// });
	return { getDaysArray };
};
