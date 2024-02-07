import { IService } from './service.model';

export interface IAppointment {
	_id: string;
	name: string;
	email: string;
	phone: string;
	service: IService;
	subService: string;
	profession: string;
	status: string;
	clientQuestions: IClientQuestion[];
	createdAt: Date;
}

export interface IClientQuestion {
	qTitle: string;
	qDesc: string;
}
