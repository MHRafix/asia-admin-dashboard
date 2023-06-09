import { getDateRange } from '@/app/config/logic/getDateRanges';
import { atom } from 'jotai';

const dateRange = getDateRange();

export interface IPackageBasicInfo {
	packageTitle?: string;
	regularPrice?: number;
	salePrice?: number;
	countDown?: { bookingStart: Date; bookingEnd: Date };
	shortDescription?: string;
	description?: string;
	thumbnail?: string;
	departureFrom?: ILocation;
	destination?: ILocation;
	transportation?: ITransportation[];
	packageStatus?: PACKAGE_STATUS.UPCOMING;
	isPublished?: boolean;
}

export interface ILocation {
	name: string;
	lat: string;
	lng: string;
}

export interface ITransportation {
	departureStation: string;
	destinationStation: string;
	tourBy: string;
	departureDate: Date;
	departureTime: string;
	arrivalDate: Date;
	arrivalTime: string;
	transportName: string;
	journeyBreak: string;
	stops: string;
}
export const activeStep = atom<number>(0);
export const carouselThumbnailsAtom = atom<string[] | null>(null);
export const packageBasicInfoAtom = atom<IPackageBasicInfo | null>({
	countDown: {
		bookingStart: dateRange[0],
		bookingEnd: dateRange[1],
	},
});

export enum SALE_STATUS {
	FIXED = 'FIXED',
	SALE = 'SALE',
}

export enum PACKAGE_STATUS {
	UPCOMING = 'UPCOMING',
	FINISHED = 'FINISHED',
	ALWAYS = 'ALWAYS',
}
