export const getTransactionDateRange = (): [Date, Date] => {
	const firstDate = new Date();
	firstDate.setDate(firstDate.getDate() - firstDate.getDate() + 1);

	return [firstDate, new Date()];
};

export const getBookingsDateRange = (): [Date, Date] => {
	const firstDate = new Date();
	firstDate.setDate(firstDate.getDate() - 5);

	return [firstDate, new Date()];
};
