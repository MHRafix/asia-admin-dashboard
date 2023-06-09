import { IBooking } from '@/app/api/models/bookings.model';
import { DELETE_BOOKING_MUTATION } from '@/app/config/queries/bookings.query';
import { deleteConfirmModal } from '@/components/common/deleteConfirmModal';
import { handleSetUid } from '@/logic/handleSetUid';
import { useMutation } from '@apollo/client';
import { Badge, Button, Checkbox, Flex } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { FiTrash } from 'react-icons/fi';

interface IBookingTableBodyProps {
	booking: IBooking;
	refetchBooking: () => void;
	onStoreId: any;
}
const BookingTableBody: React.FC<IBookingTableBodyProps> = ({
	booking,
	refetchBooking,
	onStoreId,
}) => {
	// delete booking
	const [deleteBooking, { loading: deletingBooking }] = useMutation(
		DELETE_BOOKING_MUTATION,
		{
			onCompleted: () => {
				refetchBooking();
				showNotification({
					title: 'Booking successfully deleted!',
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
						onClick={() => handleSetUid(onStoreId, booking?._id!)}
					/>
					{booking?.customerDetails?.name}
				</Flex>
			</td>
			<td className='text-dimmed'>{booking?.customerDetails?.email}</td>
			<td className='text-dimmed'>{booking?.customerDetails?.phone}</td>
			<td className='text-dimmed'>{new Date().toDateString()}</td>

			<td className='text-dimmed'>
				<Badge
					color={getColors(booking?.status!)}
					size='lg'
					fw={500}
					variant='light'
					radius='sm'
				>
					{booking?.status}
				</Badge>
			</td>
			<td className='text-dimmed'>
				<Button size='xs' color='violet' variant='filled' compact>
					Track Pack
				</Button>
			</td>

			<td className='flex gap-2 items-center'>
				{/* <Button variant='filled' color='teal' size='xs' compact>
					<FiEdit size={16} />
				</Button> */}
				<Button
					loading={deletingBooking}
					variant='filled'
					color='red'
					size='xs'
					compact
					onClick={() => deleteConfirmModal(deleteBooking, booking?._id!)}
				>
					<FiTrash size={16} />
				</Button>
			</td>
		</tr>
	);
};

export default BookingTableBody;

const getColors = (status: string) => {
	switch (status) {
		case 'PENDING':
			return 'yellow';
		case 'APPROVED':
			return 'violet';
		case 'COMPLETED':
			return 'teal';

		default:
			return 'red';
	}
};
