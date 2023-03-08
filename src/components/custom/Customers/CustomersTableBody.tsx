import { REMOVE_USER } from '@/app/config/gql-query';
import { IUser } from '@/app/models/users.model';
import { deleteConfirmModal } from '@/components/common/deleteConfirmModal';
import { handleSetUid } from '@/logic/handleSetUid';
import { useMutation } from '@apollo/client';
import { Badge, Button, Checkbox, Flex } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Image from 'next/image';
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

interface ICustomerTableProps {
	customer: IUser;
	refetchUser: () => void;
	onStoreId: any;
}
const CustomersTableBody: React.FC<ICustomerTableProps> = ({
	customer,
	refetchUser,
	onStoreId,
}) => {
	// delete booking
	const [deleteCustomer, { loading: deletingCustomer }] = useMutation(
		REMOVE_USER,
		{
			onCompleted: () => {
				refetchUser();
				showNotification({
					title: 'Customer successfully deleted!',
					color: 'red',
					icon: <FiTrash size={20} />,
					message: '',
				});
			},
		}
	);
	return (
		<tr>
			<td className='text-dimmed !py-2'>
				<Flex gap={8} align='center'>
					<Checkbox
						color='red'
						onClick={() => handleSetUid(onStoreId, customer?._id!)}
					/>{' '}
					{customer.name}
				</Flex>
			</td>
			<td className='text-dimmed !py-2'>{customer.email}</td>
			<td className='text-dimmed !py-2'>
				<Badge color='yellow' size='md' variant='filled' radius='sm'>
					{customer?.role}
				</Badge>
			</td>
			<td className='text-dimmed !py-2 '>
				<Image
					src={customer.avatar}
					alt='avatar'
					width={30}
					height={30}
					className='rounded-full'
				/>
			</td>
			<td className='flex gap-2 items-center'>
				<Button variant='filled' color='teal' size='xs' compact mt={5}>
					<FiEdit size={16} />
				</Button>
				<Button
					loading={deletingCustomer}
					variant='filled'
					color='red'
					size='xs'
					compact
					onClick={() => {
						deleteConfirmModal(deleteCustomer, customer?._id!);
					}}
					mt={5}
				>
					<FiTrash size={16} />
				</Button>
			</td>
		</tr>
	);
};

export default CustomersTableBody;
