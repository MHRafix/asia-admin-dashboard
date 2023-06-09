import {
	ActionIcon,
	Box,
	Flex,
	Rating,
	Text,
	Title,
	Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { MdLocationPin } from 'react-icons/md';
import { TbMapSearch } from 'react-icons/tb';
import ImageSlider from './ImageSlider';

interface IPackageDetailsProps {
	details: { sliderImages: string[]; packageTitle: string };
}
const PackageDetails: React.FC<IPackageDetailsProps> = ({ details }) => {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<ImageSlider carouselImages={details?.sliderImages!} />
			<Flex justify='space-between' align='center' my={10} px={10}>
				{/* {' '}
				<DrawerWrapper
					close={close}
					opened={opened}
					size='xl'
					title='Departure to destination map direction'
				>
					<div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
						accusamus placeat atque ad odio quos distinctio unde officia?
						Commodi optio perspiciatis suscipit distinctio dolor debitis sunt
						numquam libero minus. Perferendis?
					</div>
				</DrawerWrapper> */}
				<Box>
					<Title order={3} ff='Nunito Sans, sans-serif' fw={700}>
						{details?.packageTitle}
					</Title>
					<Flex gap={5} align='center' mt={3}>
						<>
							<MdLocationPin size={16} color='#FF597B' />
							<span className='text-xs text-slate-400'>Canada.</span>
						</>
						<Text color='cyan' size='xs' my={5}>
							<Rating
								size='xs'
								color='teal'
								value={4.5}
								fractions={2}
								readOnly
							/>
						</Text>
					</Flex>
				</Box>
				<Box>
					<Tooltip label='Map direction'>
						<ActionIcon
							color='violet'
							size='xl'
							radius='lg'
							variant='filled'
							onClick={open}
						>
							<TbMapSearch size={25} />
						</ActionIcon>
					</Tooltip>
				</Box>
			</Flex>
		</>
	);
};

export default PackageDetails;
