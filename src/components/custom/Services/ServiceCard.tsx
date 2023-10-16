import { IService } from '@/app/api/models/service.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import { DELETE_SERVICE } from '@/app/config/queries/service.query';
import { deleteConfirmModal } from '@/components/common/deleteConfirmModal';
import { useMutation } from '@apollo/client';
import { Box, Button, Flex, Group, Space, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

interface IServiceCardProp {
	service: IService;
	refetchServices?: () => void;
}
const ServiceCard: React.FC<IServiceCardProp> = ({
	service,
	refetchServices,
}) => {
	const onSuccess = () => {
		refetchServices?.();
	};

	const [deleteService, { loading: deletingService }] = useMutation(
		DELETE_SERVICE,
		Notify({
			sucTitle: 'Service deleted successfully!',
			sucMessage: 'Refetch services again.',
			errMessage: 'Try again to delete service.',
			action: onSuccess,
		})
	);

	return (
		<Box
			style={{
				boxShadow:
					'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
			}}
			className='relative rounded-lg grid bg-[#212131]'
		>
			<img
				src={service?.thumbnail ?? '/placeholderImage.jpg'}
				alt='service img'
				height={200}
				className='w-full'
			/>
			<Group position='apart' mb='xs' px={10} mt={10}>
				<Text weight={500} fz={18} ff={'Nunito sans, sans-serif'}>
					{service?.title}
				</Text>
			</Group>

			<Text size='md' color='dimmed' ff={'Nunito sans, sans-serif'} px={10}>
				{service?.shortDesc}
			</Text>
			<Space h={'sm'} />
			{refetchServices && (
				<Flex color='teal' gap={10} px={10}>
					<Button
						fullWidth
						component={Link}
						href={`/it_sector/services/${service?._id}`}
						variant='filled'
						color='violet'
						size='sm'
						className='rounded-sm'
						leftIcon={<FiEdit size={16} />}
					>
						Edit
					</Button>
					<Button
						fullWidth
						className='rounded-sm'
						loading={deletingService}
						variant='filled'
						color='red'
						size='sm'
						onClick={() => deleteConfirmModal(deleteService, service?._id!)}
						leftIcon={<FiTrash size={16} />}
					>
						Remove
					</Button>
				</Flex>
			)}
			<Space h={'sm'} />
		</Box>
	);
};

export default ServiceCard;
