import { IAppointment } from '@/app/api/models/appointment.model';
import { DELETE_APPOINTMENT_MUTATION } from '@/app/config/queries/appointments.query';
import { deleteConfirmModal } from '@/components/common/deleteConfirmModal';
import { handleSetUid } from '@/logic/handleSetUid';
import { useMutation } from '@apollo/client';
import { Button, Checkbox, Flex } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

interface IAppointmentTableBodyProps {
	appointment: IAppointment;
	refetchAppointment: () => void;
	onStoreId: any;
}

const AppointmentsTableBody: React.FC<IAppointmentTableBodyProps> = ({
	appointment,
	refetchAppointment,
	onStoreId,
}) => {
	// delete appointment
	const [deleteAppointment, { loading: deletingAppointment }] = useMutation(
		DELETE_APPOINTMENT_MUTATION,
		{
			onCompleted: () => {
				refetchAppointment();
				showNotification({
					title: 'Appointment successfully deleted!',
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
						onClick={() => handleSetUid(onStoreId, appointment?._id!)}
					/>
					{appointment.name}
				</Flex>
			</td>
			<td className='text-dimmed'>{appointment.email}</td>
			<td className='text-dimmed'>{appointment.phone}</td>
			<td className='text-dimmed'>{appointment?.subject}</td>

			<td className='text-dimmed'>
				<Button size='xs' color='violet' variant='filled' compact>
					Track Service
				</Button>
			</td>

			<td className='flex gap-2 items-center'>
				<Button variant='filled' color='teal' size='xs' compact>
					<FiEdit size={16} />
				</Button>
				<Button
					loading={deletingAppointment}
					variant='filled'
					color='red'
					size='xs'
					compact
					onClick={() =>
						deleteConfirmModal(deleteAppointment, appointment?._id!)
					}
				>
					<FiTrash size={16} />
				</Button>
			</td>
		</tr>
	);
};

export default AppointmentsTableBody;
