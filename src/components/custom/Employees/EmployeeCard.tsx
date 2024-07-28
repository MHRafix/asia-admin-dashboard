import { IEmployees } from '@/app/api/models/employees.model';
import { REMOVE_EMPLOYEE } from '@/app/config/queries/employees.query';
import { deleteConfirmModal } from '@/components/common/deleteConfirmModal';
import { useMutation } from '@apollo/client';
import { Badge, Button, Flex, Space, Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Image from 'next/image';
import React from 'react';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { getRoleBadgeColor } from '../Manage_Users/UsersTable';

interface IEmployeeCardProps {
	data: IEmployees;
	onRefetch: () => void;
	onEdit: () => void;
}

const EmployeeCard: React.FC<IEmployeeCardProps> = ({
	data,
	onRefetch,
	onEdit,
}) => {
	// REMOVE_EMPLOYEE
	const [deleteEmployee, { loading: deletingEmployee }] = useMutation(
		REMOVE_EMPLOYEE,
		{
			onCompleted: () => {
				onRefetch();
				showNotification({
					title: 'Employees successfully deleted!',
					color: 'red',
					icon: <FiTrash size={20} />,
					message: '',
				});
			},
		}
	);
	return (
		<div className='border-solid border-slate-700 border-[1px] rounded-md py-5 px-2 shadow-lg'>
			<div className='!text-center !mx-auto'>
				<Image
					src={data?.avatar}
					width={150}
					height={150}
					className='rounded-full object-cover shadow-md'
					alt='employee'
				/>
			</div>
			<Space h={10} />
			<Title order={4} ff={'Nunito, sans-serif'} fw={500}>
				{data?.name}
			</Title>
			<Text fw={400} ff={'Nunito, sans-serif'}>
				{data?.email}
			</Text>
			<Text fw={400} ff={'Nunito, sans-serif'}>
				{data?.phone}
			</Text>
			<Space h={10} />
			<Flex gap={5} align={'center'}>
				<Badge color='violet' size='lg' fw={400} ff={'Nunito, sans-serif'}>
					{data?.post}
				</Badge>
				<Badge
					color={getRoleBadgeColor(data?.role)}
					size='lg'
					fw={400}
					ff={'Nunito, sans-serif'}
				>
					{data?.role}
				</Badge>

				<Badge color='red' size='lg' fw={400} ff={'Nunito, sans-serif'}>
					TK {data?.salary ?? 0.0}
				</Badge>
			</Flex>
			<Space h={10} />

			<Flex gap={10} align={'center'}>
				<Button
					fullWidth
					// component={Link}
					// href={`/manage_employee/${data?._id}`}
					variant='filled'
					color='violet'
					size='sm'
					className='rounded-sm'
					leftIcon={<FiEdit size={16} />}
					onClick={onEdit}
				>
					Edit
				</Button>

				<Button
					fullWidth
					className='rounded-sm'
					loading={deletingEmployee}
					variant='filled'
					color='red'
					size='sm'
					onClick={() => deleteConfirmModal(deleteEmployee, data?._id!)}
					leftIcon={<FiTrash size={16} />}
				>
					Remove
				</Button>
			</Flex>
			<Space h={10} />
			<Button
				fullWidth
				className='rounded-sm'
				// loading={deletingEmployee}
				variant='filled'
				color='yellow'
				size='sm'
				disabled
				// onClick={() => deleteConfirmModal(deleteEmployee, data?._id!)}
				leftIcon={<FaHandHoldingUsd size={20} />}
			>
				Pay Salary
			</Button>
		</div>
	);
};

export default EmployeeCard;
