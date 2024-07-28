import { USER_ROLE } from '@/app/config/gql';

export interface IEmployees {
	_id: string;
	name: string;
	email: string;
	phone: string;
	role: USER_ROLE;
	avatar: string;
	post: string;
	salary: number;
}
