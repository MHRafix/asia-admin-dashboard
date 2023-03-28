import { IService } from '@/app/api/models/service.model';
import { Box, Button, Flex, Group, Text, ThemeIcon } from '@mantine/core';
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { TiPlaneOutline } from 'react-icons/ti';

interface IServiceCardProp {
	service: IService;
}
const ServiceCard: React.FC<IServiceCardProp> = ({ service }) => {
	return (
		<Box
			style={{
				boxShadow:
					'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
			}}
			className='relative rounded-lg grid p-4 my-2 '
		>
			<Flex justify='space-between' align='center'>
				<ThemeIcon fw={500} variant='light' radius='xl' size={50} color='pink'>
					${service?.price}
				</ThemeIcon>
				<Flex color='teal' gap={5}>
					<Button
						variant='filled'
						color='violet'
						size='sm'
						className='rounded-xl'
					>
						<FiEdit size={16} />
					</Button>
					<Button
						className='rounded-xl'
						// loading={deletingBooking}
						variant='filled'
						color='red'
						size='sm'
						// onClick={() => deleteConfirmModal(deleteBooking, booking?._id!)}
					>
						<FiTrash size={16} />
					</Button>
				</Flex>
			</Flex>
			<Flex justify='center'>
				<ThemeIcon size={60} color='pink' radius='xl' mb={8}>
					<TiPlaneOutline size={25} />
				</ThemeIcon>
			</Flex>
			<Group position='apart' mb='xs'>
				<Text weight={500} fz={18}>
					{service?.title}
				</Text>
			</Group>

			<Text size='md' color='dimmed'>
				{service?.shortDesc}
			</Text>
		</Box>
	);
};

export default ServiceCard;
