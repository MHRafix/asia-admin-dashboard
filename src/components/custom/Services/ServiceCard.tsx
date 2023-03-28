import { IService } from '@/app/api/models/service.model';
import {
	Badge,
	Box,
	Button,
	Flex,
	Group,
	Text,
	ThemeIcon,
} from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { TiPlaneOutline } from 'react-icons/ti';

interface IServiceCardProp {
	service: IService;
}
const ServiceCard: React.FC<IServiceCardProp> = ({ service }) => {
	return (
		<Box className='relative rounded-lg grid p-3 shadow-xl my-5'>
			<Flex justify='space-between' align='center'>
				<ThemeIcon variant='light' radius='xl' size={50} color='pink'>
					${service?.price}
				</ThemeIcon>
				<Badge color='teal'>Expandable</Badge>
			</Flex>
			<Flex justify='center'>
				<ThemeIcon size={60} color='teal' radius='xl' mb={8}>
					<TiPlaneOutline size={25} />
				</ThemeIcon>
			</Flex>
			<Group position='apart' mb='xs'>
				<Text weight={500}>{service?.title}</Text>
			</Group>

			<Text size='sm' color='dimmed'>
				{service?.shortDesc}
			</Text>

			<Flex justify='flex-end'>
				<Button
					component={Link}
					href={`/service/${service?._id}`}
					sx={{
						letterSpacing: '1px',
					}}
					className='absolute -bottom-7'
					fw={400}
					radius='md'
					size='sm'
					color='pink'
					rightIcon={<FiArrowUpRight size={20} />}
				>
					Learn more...
				</Button>
			</Flex>
		</Box>
	);
};

export default ServiceCard;
