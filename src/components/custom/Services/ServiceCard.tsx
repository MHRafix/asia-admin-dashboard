import { IService } from '@/app/api/models/service.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import { DELETE_SERVICE } from '@/app/config/gql-queries/service.query';
import { deleteConfirmModal } from '@/components/common/deleteConfirmModal';
import { useMutation } from '@apollo/client';
import { Box, Button, Flex, Space, Text, ThemeIcon } from '@mantine/core';
import Image from 'next/image';
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
			className='text-left bg-[#212131] relative !rounded-lg grid
 px-5 pb-8 pt-10 drop-shadow-lg hover:duration-300 hover:bg-slate-900'
		>
			<ThemeIcon variant='light' radius={200} size={80}>
				<Image
					src={service?.thumbnail || ''}
					alt='service_icon'
					width={40}
					height={40}
				/>
			</ThemeIcon>
			<Space h={'xl'} />
			<Text weight={500} ff='Nunito Sans, sans-serif' fz={20}>
				{service?.title}
			</Text>
			<Space h={5} />
			<Text color='dimmed' ff='Nunito Sans, sans-serif' fz={15}>
				{service?.shortDesc?.slice(0, 150)}
				{service?.shortDesc?.length > 150 ? '....' : null}
			</Text>{' '}
			<Space h={20} />
			{refetchServices && (
				<Flex color='teal' gap={10}>
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
		</Box>
	);
};

export default ServiceCard;
