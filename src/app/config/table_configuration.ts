import { SelectItem } from '@mantine/core';

// limits
export const TABLE_DATA_LIMITS: SelectItem[] = [
	{ value: '2', label: 'Show 2' },
	{ value: '5', label: 'Show 5' },
	{ value: '10', label: 'Show 10' },
	{ value: '15', label: 'Show 15' },
	{ value: '20', label: 'Show 20' },
	{ value: '30', label: 'Show 30' },
	{ value: '50', label: 'Show 50' },
];

export const TABLE_DEFAULT_LIMIT = '10';

// booking table sort
export const BOOKING_TABLE_DATA_SORTBY: SelectItem[] = [
	{ value: '_id', label: 'ID' },
	{ value: 'name', label: 'Name' },
	{ value: 'email', label: 'Email' },
	{ value: 'phone', label: 'Phone' },
	{ value: 'date', label: 'Date' },
	{ value: 'status', label: 'Status' },
];

export const BOOKING_TABLE_DEFAULT_SORTBY = '_id';

// customers table sort
export const CUSTOMERS_TABLE_DATA_SORTBY: SelectItem[] = [
	{ value: '_id', label: 'ID' },
	{ value: 'name', label: 'Name' },
	{ value: 'email', label: 'Email' },
	{ value: 'role', label: 'Role' },
];

export const CUSTOMERS_TABLE_DEFAULT_SORTBY = '_id';

// // appointments table data sort keywords
// export const APPOINTMENTS_TABLE_DATA_SORTBY: SelectItem[] = [
// 	{ value: '_id', label: 'ID' },
// 	{ value: 'name', label: 'Name' },
// 	{ value: 'email', label: 'Email' },
// 	{ value: 'phone', label: 'Phone' },
// 	{ value: 'subject', label: 'Subject' },
// ];

// export const APPOINTMENTS_TABLE_DEFAULT_SORTBY = '_id';

// employee table data sort keywords
export const EMPLOYEE_TABLE_DATA_SORTBY: SelectItem[] = [
	{ value: '_id', label: 'ID' },
	{ value: 'name', label: 'Name' },
	{ value: 'email', label: 'Email' },
	{ value: 'phone', label: 'Phone' },
	{ value: 'post', label: 'Post' },
];

export const EMPLOYEE_TABLE_DEFAULT_SORTBY = '_id';

export const SERVICES_TYPE = [
	{
		label: 'Upcoming',
		value: 'UPCOMING',
	},
	{
		label: 'On-Going',
		value: 'ON-GOING',
	},
	{
		label: 'Finished',
		value: 'FINISHED',
	},
];

export const SERVICES_DEFAULT_VALUE = 'UPCOMING';
