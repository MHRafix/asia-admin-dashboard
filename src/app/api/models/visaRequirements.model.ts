import { Visa_Types } from './common.model';
import { IUser } from './users.model';

export interface IVisaReq {
	_id: string;
	status: string;
	title: string;
	description: string;
	country: string;
	image: string;
	cover: string;
	visaType: Visa_Types;
	createdAt: Date;
	updatedAt: Date;
	author: IUser;
}
