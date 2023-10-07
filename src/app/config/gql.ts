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
