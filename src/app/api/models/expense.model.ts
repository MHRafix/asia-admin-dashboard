import { IMeta } from './common.model';

export interface IExpensesType {
	_id: string;
	title: string;
	description: string;
	amount: string;
}

export interface IExpensesWithPagination {
	nodes: IExpensesType[];
	meta: IMeta;
}
