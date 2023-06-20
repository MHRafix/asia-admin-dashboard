import { IService } from '@/app/api/models/service.model';
import { GET_SINGLE_SERVICE } from '@/app/config/queries/service.query';
import { useQuery } from '@apollo/client';
import { Button, Popover } from '@mantine/core';
import React from 'react';
import ServiceCard from '../Services/ServiceCard';

const TrackServicePopover: React.FC<{ serviceId: string }> = ({
	serviceId,
}) => {
	const { data } = useQuery<{
		service: IService;
	}>(GET_SINGLE_SERVICE, {
		variables: {
			id: serviceId,
		},
	});

	return (
		<div>
			<Popover width={320} withArrow shadow='xl'>
				<Popover.Target>
					<Button
						ff={'Nunito sans, sans-serif'}
						size='sm'
						color='violet'
						variant='filled'
						compact
					>
						Track service
					</Button>
				</Popover.Target>
				<Popover.Dropdown p={0}>
					<ServiceCard service={data?.service!} />
				</Popover.Dropdown>
			</Popover>
		</div>
	);
};

export default TrackServicePopover;
