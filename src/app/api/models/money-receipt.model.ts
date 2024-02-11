import { IMeta } from './common.model';
import { IService } from './service.model';
import { IUser } from './users.model';

export interface MoneyReceiptsWithPagination {
	nodes: MoneyReceipt[];
	meta: IMeta;
}

export interface MoneyReceipt {
	_id: string;
	clientName: string;
	address: string;
	email: string;
	contactNumber: string;
	passportNo: string;
	paymentType: string;
	amountInWords: string;
	amountInNumber: number;
	service: IService;
	serialNo: number;
	mrNo: number;
	quantity: number;
	issueDate: Date;
	deliveryDate: Date;
	authorizeBy: IUser;
	createdAt: Date;
	updatedAt: Date;
}
