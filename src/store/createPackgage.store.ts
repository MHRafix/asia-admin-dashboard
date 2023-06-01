import { getDateRange } from '@/app/config/logic/getDateRanges';
import { atom } from 'jotai';

const dateRange = getDateRange();

export interface IPackageBasicInfo {
	packageTitle?: string;
	regularPrice?: number;
	salePrice?: number;
	destination?: string;
	countDown?: { bookingStart: Date; bookingEnd: Date };
	shortDescription?: string;
	description?: string;
}
export const activeStep = atom<number>(0);
export const packageBasicInfoAtom = atom<IPackageBasicInfo | null>({
	countDown: {
		bookingStart: dateRange[0],
		bookingEnd: dateRange[1],
	},
});

// export enum PAYMENT_STATUS {
//   DUE = "DUE",
//   IN_REVIEW_PAID = "IN_REVIEW_PAID",
//   PAID = "PAID",
// }
