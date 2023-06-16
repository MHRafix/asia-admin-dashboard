import { IAppointment } from '@/app/api/models/appointment.model';
import { getBadgeColors } from '@/app/config/logic/getColors';
import { DELETE_APPOINTMENT_MUTATION } from '@/app/config/queries/appointments.query';
import { deleteConfirmModal } from '@/components/common/deleteConfirmModal';
import { handleSetUid } from '@/logic/handleSetUid';
import { useMutation } from '@apollo/client';
import { Badge, Button, Checkbox, Flex, Menu, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';

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
	const [status, setStatus] = useState('');

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
							{appointment?.status}
						</Badge>
					</Menu.Target>

					<Menu.Dropdown className='!bg-[#1D1E2B]'>
						<Menu.Item
							disabled={status === 'PENDING'}
							color='orange'
							onClick={() => {
								setStatus('PENDING');
								// updateBooking({
								// 	variables: {
								// 		id: appointment._id,
								// 		status: BOOKING_STATUS.PENDING,
								// 		paymentDetails: {
								// 			paymentStatus: PAYMENT_STATUS.DUE,
								// 			totalAmount: booking?.paymentDetails?.totalAmount,
								// 		},
								// 	},
								// });
							}}
						>
							<Text ml={15} size={'md'} fw={500}>
								PENDING
							</Text>
						</Menu.Item>
						<Menu.Item
							disabled={status === 'APPROVED'}
							color='violet'
							onClick={() => {
								setStatus('APPROVED');
								// updateBooking({
								// 	variables: {
								// 		id: booking._id,
								// 		status: BOOKING_STATUS.APPROVED,
								// 		paymentDetails: {
								// 			paymentStatus: PAYMENT_STATUS.PAID,
								// 			totalAmount: booking?.paymentDetails?.totalAmount,
								// 		},
								// 	},
								// });
							}}
						>
							<Text ml={15} size={'md'} fw={500}>
								APPROVED
							</Text>
						</Menu.Item>
						<Menu.Item
							disabled={status === 'COMPLETED'}
							color='teal'
							onClick={() => {
								setStatus('COMPLETED');
								// updateBooking({
								// 	variables: {
								// 		id: booking._id,
								// 		status: BOOKING_STATUS.COMPLETED,
								// 		paymentDetails: {
								// 			paymentStatus: PAYMENT_STATUS.PAID,
								// 			totalAmount: booking?.paymentDetails?.totalAmount,
								// 		},
								// 	},
								// });
							}}
						>
							<Text ml={15} size={'md'} fw={500}>
								COMPLETED
							</Text>
						</Menu.Item>
						<Menu.Item
							disabled={status === 'CANCELED'}
							color='red'
							onClick={() => {
								setStatus('CANCELED');
								// updateBooking({
								// 	variables: {
								// 		id: booking._id,
								// 		status: BOOKING_STATUS.CANCELED,
								// 		paymentDetails: {
								// 			paymentStatus: PAYMENT_STATUS.DUE,
								// 			totalAmount: booking?.paymentDetails?.totalAmount,
								// 		},
								// 	},
								// });
							}}
						>
							<Text ml={15} size={'md'} fw={500}>
								CANCELLED
							</Text>
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</td>
			<td className='text-dimmed'>{appointment?.profession}</td>

			<td className='text-dimmed'>
				<Button size='xs' color='violet' variant='filled' compact>
					Track Service
				</Button>
			</td>

			<td className='flex gap-2 items-center'>
				{/* <Button variant='filled' color='teal' size='xs' compact>
					<FiEdit size={16} />
				</Button> */}
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
