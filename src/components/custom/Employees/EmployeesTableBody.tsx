import { IEmployees } from '@/app/api/models/employees.model';
import { REMOVE_EMPLOYEE } from '@/app/config/queries/employees.query';
import { deleteConfirmModal } from '@/components/common/deleteConfirmModal';
import { handleSetUid } from '@/logic/handleSetUid';
import { useMutation } from '@apollo/client';
import { Button, Checkbox, Flex } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

interface IEmployeeTableBodyProps {
	employee: IEmployees;
	refetchEmployee: () => void;
	onStoreId: any;
}

const EmployeesTableBody: React.FC<IEmployeeTableBodyProps> = ({
	employee,
	refetchEmployee,
	onStoreId,
}) => {
	// REMOVE_EMPLOYEE
	const [deleteEmployee, { loading: deletingEmployee }] = useMutation(
		REMOVE_EMPLOYEE,
		{
			onCompleted: () => {
				refetchEmployee();
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
		<tr>
			<td className='text-dimmed !py-2'>
				<Flex gap={8} align='center'>
					<Checkbox
						color='red'
						onClick={() => handleSetUid(onStoreId, employee?._id!)}
					/>
					{employee.name}
				</Flex>
			</td>
			<td className='text-dimmed'>{employee.email}</td>
			<td className='text-dimmed'>{employee.phone}</td>
			<td className='text-dimmed'>{employee?.post}</td>
			<td className='text-dimmed'>
				<Button size='xs' color='violet' variant='filled' compact>
					Connect
				</Button>
			</td>

			<td className='flex gap-2 items-center'>
				<Button variant='filled' color='teal' size='xs' compact>
					<FiEdit size={16} />
				</Button>
				<Button
					loading={deletingEmployee}
					variant='filled'
					color='red'
					size='xs'
					compact
					onClick={() => deleteConfirmModal(deleteEmployee, employee?._id!)}
				>
					<FiTrash size={16} />
				</Button>
			</td>
		</tr>
	);
};

export default EmployeesTableBody;
