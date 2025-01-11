import { IMeta } from './common.model';

export interface IExpensesType {
	_id: string;
	title: string;
	description: string;
	amount: string;
	createdAt: Date;
}

export interface IExpensesWithPagination {
	nodes: IExpensesType[];
	meta: IMeta;
}
