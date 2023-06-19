export interface IAppointment {
	_id: string;
	name: string;
	email: string;
	phone: string;
	serviceId: string;
	subService: string;
	profession: string;
	status: string;
	clientQuestions: ClientQuestion[];
}

export interface ClientQuestion {
	qTitle: string;
	qDesc: string;
}
