export const getTransactionDateRange = (): [Date, Date] => {
	const firstDate = new Date();
	firstDate.setDate(firstDate.getDate() - firstDate.getDate() + 1);

	return [firstDate, new Date()];
};

export const getDateRange = (): [Date, Date] => {
	const firstDate = new Date();
	firstDate.setDate(firstDate.getDate() + 1);

	const lastDate = new Date();
	lastDate.setDate(lastDate.getDate() + 30);

	return [firstDate, lastDate];
};

export const getBookingsDateRange = (): [Date, Date] => {
	const secondDate = new Date();
	secondDate.setDate(secondDate.getDate() + 1);

	return [new Date(), secondDate];
};
