import { atom } from 'jotai';

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
export const packageInfoInfoAtom = atom<IPackageBasicInfo | null>(null);

// export enum PAYMENT_STATUS {
//   DUE = "DUE",
//   IN_REVIEW_PAID = "IN_REVIEW_PAID",
//   PAID = "PAID",
// }
