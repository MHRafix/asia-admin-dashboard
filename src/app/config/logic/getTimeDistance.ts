import { formatDistanceToNow } from 'date-fns';

export const getTimeDistance = (date: Date) => {
	const result = formatDistanceToNow(new Date(date), {
		addSuffix: true,
	});

	if (result.includes('less than a minute ago')) {
		return '1 minute ago';
	} else if (result.includes('about')) {
		return result.split('about')[1];
	} else {
		return result;
	}
};
