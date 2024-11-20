export interface IDashboardOverview {
	bookingsChartAnalytics: IBookingsChartChartAnalytics;
	overViewCardData: IOverViewCardData;
}

export interface IBookingsChartChartAnalytics {
	bookings: number[];
	appointments: number[];
}

export interface IOverViewCardData {
	newAppointments: number;
	newBookings: number;
	newFlights: number;
	totalTransactions: number;
}

export interface ITaskRevinewDataType {
	title: string;
	totalAmount: number;
	paidAmount: number;
	dueAmount: number;
}
