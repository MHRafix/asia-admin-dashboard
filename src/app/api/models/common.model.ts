export interface IMeta {
	totalCount: number;
	currentPage: number;
	hasNextPage: boolean;
	totalPages: number;
}

export enum Visa_Types {
	TOURIST = 'TOURIST',
	WORK_PERMIT = 'WORK_PERMIT',
	MEDICAL = 'MEDICAL',
	BUSINESS = 'BUSINESS',
	STUDENT = 'STUDENT',
}
