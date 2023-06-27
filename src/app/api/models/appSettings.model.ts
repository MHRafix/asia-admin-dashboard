export interface IAppSettings {
	_id?: string;
	logo?: string;
	visaCategories: string[];
	countriesVisa: ICountriesVisa[];
	branches: IBranch[];
}

export interface IBranch {
	branchName: string;
	email: string;
	phone: string;
	address: IAddressLocation;
}

export interface IAddressLocation {
	name: string;
	lat: string;
	lng: string;
}

export interface ICountriesVisa {
	country: string;
	visaCategory: string;
}
