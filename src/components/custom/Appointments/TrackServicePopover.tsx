import { IService } from '@/app/api/models/service.model';
import { Button, Popover } from '@mantine/core';
import React from 'react';
import ServiceCard from '../Services/ServiceCard';

const TrackServicePopover: React.FC<{ service: IService }> = ({ service }) => {
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
					<ServiceCard service={service!} />
				</Popover.Dropdown>
			</Popover>
		</div>
	);
};

export default TrackServicePopover;
