// export interface IDashboardOverview {
// 	overViewCardData: IOverViewCardData;
// }

export interface IBookingsChartChartAnalytics {
	bookings: number[];
	appointments: number[];
}

export interface IGrandRevinewOverviewData {
	totalExpence: number;
	totalRevinew: number;
	totalPaidRevinew: number;
	totalDueRavinew: number;
	grandRevinew: number;
}

export interface ITaskRevinewDataType {
	title: string;
	totalAmount: number;
	paidAmount: number;
	dueAmount: number;
}
