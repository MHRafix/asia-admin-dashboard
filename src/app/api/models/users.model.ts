import { USER_ROLE } from '@/app/config/gql-types';

export interface IUser {
	_id: string;
	name: string;
	email: string;
	avatar: string;
	phone: string;
	accessToken: string;
	role: USER_ROLE;
}
