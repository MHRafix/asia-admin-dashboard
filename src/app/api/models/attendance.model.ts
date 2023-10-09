import { IUser } from './users.model';

export interface IAttendance {
	_id: string;
	verifyBy: IUser;
	attendee: IUser;
	status: string;
	date: Date;
	note: string;
	createdAt: Date;
	updatedAt: Date;
}
