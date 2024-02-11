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

export enum Payment_Types {
	ONLINE = 'ONLINE',
	BANK = 'BANK',
	NONE = 'NONE',
	NAGAD = 'NAGAD',
	ROCKET = 'ROCKET',
}

export const Payment__Types__Input__Data = [
	'ONLINE',
	'BANK',
	'NONE',
	'NAGAD',
	'ROCKET',
];
