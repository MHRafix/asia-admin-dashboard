import { ApolloError } from '@apollo/client';
import { showNotification } from '@mantine/notifications';

interface INotification {
	sucTitle: string;
	sucMessage?: string;
	errMessage?: string;
	action?: any;
}

export const Notify = ({
	sucTitle,
	sucMessage,
	errMessage,
	action,
}: INotification) => {
	return {
		onCompleted: (res: any) => {
			action?.(res);
			showNotification({
				title: sucTitle,
				color: 'teal',
				message: sucMessage,
			});
		},
		onError: (err: ApolloError) => {
			showNotification({
				title: errMessage,
				color: 'red',
				message: err?.message,
			});
		},
	};
};
