export interface IDashboardOverview {
	bookingsChartAnalytics: IBookingsChartChartAnalytics;
	overViewCardData: IOverViewCardData;
}

export interface IBookingsChartChartAnalytics {
	approved: number[];
	canceled: number[];
	completed: number[];
	pending: number[];
}

export interface IOverViewCardData {
	newAppointments: number;
	newBookings: number;
	newFlights: number;
	totalTransactions: number;
}
