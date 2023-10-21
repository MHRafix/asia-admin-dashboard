import {
	IBooking,
	PAYMENT_STATUS,
	STATUS_ARR,
} from '@/app/api/models/bookings.model';
import {
	getBadgeColors,
	getPaymentBadgeColors,
} from '@/app/config/logic/getColors';
import {
	DELETE_BOOKING_MUTATION,
	UPDATE_BOOKING_STATUS,
} from '@/app/config/queries/bookings.query';
import { deleteConfirmModal } from '@/components/common/deleteConfirmModal';
import { handleSetUid } from '@/logic/handleSetUid';
import { useMutation } from '@apollo/client';
import {
	ActionIcon,
	Badge,
	Button,
	Checkbox,
	CopyButton,
	Flex,
	Menu,
	Text,
	Tooltip,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import TrackPackagePopover from './TrackPackagePopover';

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
	const [status, setStatus] = useState<string>(booking?.status!);

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

	// update booking
	const [updateBooking, { loading: updatingBooking }] = useMutation(
		UPDATE_BOOKING_STATUS,
		{
			onCompleted: () => {
				refetchBooking();
				showNotification({
					title: 'Booking successfully updated!',
					color: 'teal',
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
			<td className='text-dimmed'>{booking?.customerDetails?.phone}</td>
			<td className='text-dimmed'>
				<div className='flex gap-2 items-center'>
					{booking?.transactionId}
					<CopyButton value={booking?.transactionId!} timeout={2000}>
						{({ copied, copy }) => (
							<Tooltip
								label={copied ? 'Copied' : 'Copy'}
								withArrow
								position='right'
							>
								<ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
									{copied ? <FaCheck size='1rem' /> : <BiCopy size='1rem' />}
								</ActionIcon>
							</Tooltip>
						)}
					</CopyButton>
				</div> 
			</td>
			<td className='text-dimmed'>
				<Badge
					color={getPaymentBadgeColors(booking?.paymentDetails?.paymentStatus!)}
					size='lg'
					fw={500}
					variant='dot'
					radius='sm'
				>
					{booking?.paymentDetails?.paymentStatus}
				</Badge>
			</td>

			<td className='text-dimmed'>
				<TrackPackagePopover packageId={booking?.packageId!} />
			</td>

			<td className='text-dimmed'>
				<Menu>
					<Menu.Target>
						<Badge
							color={getBadgeColors(booking?.status!)}
							size='lg'
							fw={500}
							variant='filled'
							radius='sm'
						>
							{booking?.status}
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
									updateBooking({
										variables: {
											id: booking._id,
											status: STATUS,
											paymentDetails: {
												paymentStatus: PAYMENT_STATUS[idx],
												totalAmount: booking?.paymentDetails?.totalAmount,
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

			<td className='flex gap-2 items-center'>
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
