export enum IPACKAGE_IN {
	DOMESTIC = 'DOMESTIC',
	INTERNATIONAL = 'INTERNATIONAL',
}

export enum ISALE_STATUS {
	FIXED = 'FIXED',
	SALE = 'SALE',
}

export enum IPACKAGE_STATUS {
	UPCOMING = 'UPCOMING',
	FINISHED = 'FINISHED',
	ALWAYS = 'ALWAYS',
}

export enum ITOURBY {
	BY_AIR = 'BY_AIR',
	BY_ROAD = 'BY_ROAD',
	BY_RAIL = 'BY_RAIL',
}

export interface ITravelOutline {
	departureFrom: string;

	destinationTo: string;

	startAt: Date;

	endAt: Date;

	packageIn: IPACKAGE_IN;

	description: string;

	breakfast: string;

	lunch: string;

	normalSnacks: string;

	dinner: string;

	otherFeatures: string;
}

export interface IRatingsAndReviews {
	rating: number;

	email: string;

	message: string;
}

export interface ITravelers {
	travelerEmail: string;
}

export interface ITransportation {
	tourBy: ITOURBY;

	departureFrom: string;

	destination: string;

	startAt: Date;

	transportName: string;

	stops: number;

	journeyBreak: string;

	endAt: Date;
}

export interface ITravelPackage {
	_id: string;

	packageTitle: string;

	regularPrice: number;

	salePrice: number;

	saleStatus: ISALE_STATUS;

	isPublished: boolean;

	packageStatus: IPACKAGE_STATUS;

	bookingStart: Date;

	bookingEnd: Date;

	thumbnail: string;

	description: string;

	shortDescription: string;

	destination: string;

	carouselThumbnails: string[];

	travelOutline: ITravelOutline[];

	ratingsAndReviews: IRatingsAndReviews[];

	travelers: ITravelers[];

	transportation: ITransportation[];
}
