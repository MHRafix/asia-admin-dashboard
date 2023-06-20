import { IService } from '@/app/api/models/service.model';

export const prefillUpdateServiceForm = (service: IService) => {
	return {
		title: service?.title,
		shortDesc: service?.shortDesc,
		desc: service?.desc,
		preRequirements: service?.preRequirements,
		price: service?.price,
	};
};
