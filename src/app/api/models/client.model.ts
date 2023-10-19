import { IMeta } from './common.model';

export interface ClientWithPagination {
	nodes: IClient[];
	meta: IMeta;
}

export interface IClient {
	_id: string;
	name: string;
	address: string;
	email: string;
	facebook: string;
	phone: string;
}
