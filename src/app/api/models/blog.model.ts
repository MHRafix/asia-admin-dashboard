import { Visa_Types } from './common.model';
import { IUser } from './users.model';

export interface IBlog {
	_id: string;
	status: string;
	date: Date;
	title: string;
	description: string;
	country: string;
	like: number;
	image: string;
	cover: string;
	visaType: Visa_Types;
	createdAt: Date;
	updatedAt: Date;
	author: IUser;
}
