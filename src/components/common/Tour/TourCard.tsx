import { ITravelPackage } from '@/app/api/models/travelPackage.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import { MatchOperator } from '@/app/config/gql';
import { Delete_Tour_Package } from '@/app/config/queries/travelPackage.query';
import { useMutation } from '@apollo/client';
import {
	Badge,
	Box,
	Button,
	Flex,
	Rating,
	Skeleton,
	Text,
	Title,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import Link from 'next/link';
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { MdLocationPin } from 'react-icons/md';

interface ITourCardProp {
	TPackage: ITravelPackage;
	onRefetch?: () => void;
	actionBtn?: boolean;
}

const TourCard: React.FC<ITourCardProp> = ({
	TPackage,
	onRefetch,
	actionBtn = true,
}) => {
	const [deletePackage, { loading: deletingPackage }] = useMutation(
		Delete_Tour_Package,
		Notify({
			sucTitle: 'Package deleted successfully',
			action: () => onRefetch?.(),
		})
	);
	return (
		<Box className=' bg-[#212231] hover:bg-[#212237] relative rounded-lg grid shadow-xl pb-3'>
			<Link
				href={
					TPackage?.isPublished
						? `/it_sector/tour/tour_packages/${TPackage?._id}`
						: '/it_sector/tour/tour_packages/'
				}
				className='no-underline text-white'
			>
				{!TPackage?.isPublished && (
					<Badge
						className='absolute top-2 left-0'
						variant='filled'
						w={180}
						size='xl'
						color='red'
						radius={0}
					>
						Not Published
					</Badge>
				)}
				<div className='mx-3 mt-3'>
					<img
						src={TPackage?.thumbnail ?? '/placeholderImage.jpg'}
						alt='card image'
						className='w-full rounded-lg mx-auto text-center'
						// width={100}
						height={180}
					/>
				</div>

				<div className='p-3'>
					<Flex justify='space-between' align='center'>
						<Title order={4} mt={4} mb={6} ff='Nunito Sans, sans-serif'>
							{TPackage?.packageTitle}
						</Title>

						<div className='text-sm font-semibold'>$ {TPackage?.salePrice}</div>
					</Flex>
					<Flex justify='space-between' align='center'>
						{TPackage?.destination?.name ? (
							<Flex gap={2} align='center'>
								<MdLocationPin size={16} color='#FF597B' />
								<Text
									ff='Nunito Sans, sans-serif'
									className='text-sm text-slate-400'
								>
									{TPackage?.destination?.name}
								</Text>
							</Flex>
						) : (
							<Skeleton h={20} w={90} animate={false} radius={3} />
						)}
						<Flex>
							<Text color='cyan' size='xs'>
								<Rating
									size='xs'
									color='teal'
									value={4.5}
									fractions={2}
									readOnly
								/>
							</Text>
						</Flex>
					</Flex>
				</div>
			</Link>

			{actionBtn && (
				<Flex color='teal' gap={10} className='p-3'>
					<Button
						fullWidth
						component={Link}
						href={`/it_sector/tour/tour_packages/createPackage?packageId=${TPackage?._id}`}
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
						loading={deletingPackage}
						variant='filled'
						color='red'
						size='sm'
						onClick={() =>
							openConfirmModal({
								title: 'Please confirm your action',
								children: (
									<Text size='sm'>
										Are you really want to delete this? Please click one of
										these buttons to proceed.
									</Text>
								),
								labels: { confirm: 'Yes', cancel: 'Cancel' },
								confirmProps: { color: 'red' },
								onCancel: () => {},
								onConfirm: () =>
									deletePackage({
										variables: {
											payload: {
												key: '_id',
												operator: MatchOperator.Eq,
												value: TPackage?._id,
											},
										},
									}),
							})
						}
						leftIcon={<FiTrash size={16} />}
					>
						Remove
					</Button>
				</Flex>
			)}
		</Box>
	);
};

export default TourCard;
