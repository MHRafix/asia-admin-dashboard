import { IAppointment } from '@/app/api/models/appointment.model';
import { STATUS_ARR } from '@/app/api/models/bookings.model';
import { getBadgeColors } from '@/app/config/logic/getColors';
import {
	DELETE_APPOINTMENT_MUTATION,
	UPDATE_APPOINTMENT,
} from '@/app/config/queries/appointments.query';
import { deleteConfirmModal } from '@/components/common/deleteConfirmModal';
import { handleSetUid } from '@/logic/handleSetUid';
import { useMutation } from '@apollo/client';
import { Badge, Button, Checkbox, Flex, Menu, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import ReplyDrawer from './ReplyDrawer';
import TrackServicePopover from './TrackServicePopover';

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
	const [status, setStatus] = useState(appointment?.status);

	// delete appointment
	const [deleteAppointment, { loading: deletingAppointment }] = useMutation(
		DELETE_APPOINTMENT_MUTATION,
		{
			onCompleted: () => {
				refetchAppointment();
				showNotification({
					title: 'Appointment successfully deleted!',
					color: 'teal',
					message: '',
				});
			},
		}
	);

	// update appointment
	const [updateAppointment] = useMutation(UPDATE_APPOINTMENT, {
		onCompleted: () => {
			refetchAppointment();
			showNotification({
				title: 'Appointment successfully updated!',
				color: 'teal',
				message: '',
			});
		},
	});
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
			<td className='text-dimmed'>
				<Menu>
					<Menu.Target>
						<Badge
							color={getBadgeColors(status!)}
							size='lg'
							fw={500}
							variant='filled'
							radius='sm'
						>
							{status}
						</Badge>
					</Menu.Target>

					<Menu.Dropdown className='!bg-[#1D1E2B]'>
						{STATUS_ARR.map((STATUS: string, idx: number) => (
							<Menu.Item
								key={idx}
								disabled={status === STATUS}
								color={getBadgeColors(STATUS)}
								onClick={() => {
									setStatus(STATUS);
									updateAppointment({
										variables: {
											payload: {
												_id: appointment._id,
												status: STATUS,
											},
										},
									});
								}}
							>
								<Text ml={15} size={'md'} fw={500}>
									{STATUS}
								</Text>
							</Menu.Item>
						))}
					</Menu.Dropdown>
				</Menu>
			</td>
			<td className='text-dimmed'>{appointment?.profession}</td>

			<td className='text-dimmed'>
				<TrackServicePopover service={appointment?.service!} />
			</td>

			<td className='flex gap-2 items-center'>
				<ReplyDrawer clientQuestions={appointment?.clientQuestions} />
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
