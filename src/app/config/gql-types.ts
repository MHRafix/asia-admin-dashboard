import { IClient } from '../api/models/client.model';
import { IPaginationMeta } from '../api/models/CommonPagination.model';
import { IUser } from '../api/models/users.model';

/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
	  };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	/** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
	DateTime: { input: any; output: any };
	_Any: { input: any; output: any };
	federation__FieldSet: { input: any; output: any };
	link__Import: { input: any; output: any };
};

export type CommonFindDocumentDto = {
	and?: InputMaybe<Array<CommonFindDocumentDto>>;
	key: Scalars['String']['input'];
	operator: MatchOperator;
	or?: InputMaybe<Array<CommonFindDocumentDto>>;
	value?: InputMaybe<Scalars['String']['input']>;
};

export enum Month_Name {
	April = 'APRIL',
	August = 'AUGUST',
	December = 'DECEMBER',
	February = 'FEBRUARY',
	January = 'JANUARY',
	July = 'JULY',
	June = 'JUNE',
	March = 'MARCH',
	May = 'MAY',
	November = 'NOVEMBER',
	October = 'OCTOBER',
	September = 'SEPTEMBER',
}

export enum MatchOperator {
	Contains = 'contains',
	Eq = 'eq',
	Exists = 'exists',
	Gt = 'gt',
	Gte = 'gte',
	In = 'in',
	Lt = 'lt',
	Lte = 'lte',
	Ne = 'ne',
	Nin = 'nin',
}

export enum SortType {
	Asc = 'ASC',
	Desc = 'DESC',
}

export enum Attendance_Status {
	VERIFIED = 'VERIFIED',
	PENDING = 'PENDING',
	NOT_PRESENT = 'NOT_PRESENT',
}

export interface TaskManagement_TaskDetails {
	taskName: String;
	taskAssignTo: IUser;
	taskDescription: String;
	issuesDescription: String;
}

export interface Task {
	_id: String;
	taskCreatedBy: IUser;
	client: IClient;
	taskDetails: TaskManagement_TaskDetails;
	taskId: String;
	totalBillAmount: Number;
	paidBillAmount: Number;
	dueAmount: Number;
	progressStatus: Task_Progress_Status;
	paymentStatus: Payment_Status;
	deadLine: Date;
	createdAt: Date;
	updatedAt: Date;
}

export enum Task_Progress_Status {
	PENDING = 'PENDING',
	IN_PROGRESS = 'IN_PROGRESS',
	WORK_DONE = 'WORK_DONE',
	REVISION = 'REVISION',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED',
	ARCHIVED = 'ARCHIVED',
}

export enum Payment_Status {
	REFUNDED = 'REFUNDED',
	PARTIALLY_PAID = 'PARTIALLY_PAID',
	PAID = 'PAID',
	DUE = 'DUE',
	CANCELLED = 'CANCELLED',
}

export interface TaskManagementWithPagination {
	nodes: [Task];
	meta: IPaginationMeta;
}

export enum USER_ROLE {
	ADMIN = 'ADMIN',
	MODERATOR = 'MODERATOR',
	EMPLOYEE = 'EMPLOYEE',
	CUSTOMER = 'CUSTOMER',
}
