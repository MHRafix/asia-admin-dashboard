import { Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';

export const deleteConfirmModal = (
	deleteFunc: (state: any) => void,
	id: string
) => {
	openConfirmModal({
		title: 'Please confirm your action',
		children: (
			<Text size='sm'>
				Are you really want to delete this? Please click one of these buttons to
				proceed.
			</Text>
		),
		labels: { confirm: 'Confirm Delete', cancel: 'Cancel' },
		confirmProps: { color: 'red' },
		onCancel: () => {},
		onConfirm: () => {
			deleteFunc({
				variables: {
					id,
				},
			});
		},
	});
};
