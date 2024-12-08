import { IVisaReq } from '@/app/api/models/visaRequirements.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import { REMOVE_REQUIREMENT } from '@/app/config/gql-queries/requirements.query';
import { MatchOperator } from '@/app/config/gql-types';
import { getTimeDistance } from '@/app/config/logic/getTimeDistance';
import { useMutation } from '@apollo/client';
import { Avatar, Box, Button, Flex, Space, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import Link from 'next/link';
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

interface IVisaReqProps {
	visaReq: IVisaReq;
	refetchVisaReq?: () => void;
}

const RequirementCard: React.FC<IVisaReqProps> = ({
	visaReq,
	refetchVisaReq,
}) => {
	const onSuccess = () => {
		refetchVisaReq?.();
	};

	const [deleteReq, { loading: deletingReq }] = useMutation(
		REMOVE_REQUIREMENT,
		Notify({
			sucTitle: 'Visa requirements deleted successfully!',
			errMessage: 'Try again to delete visa requirements.',
			action: onSuccess,
		})
	);
	return (
		<Box
			style={{
				boxShadow: boxShadow,
			}}
			className='relative grid rounded-lg bg-[#212131]'
		>
			<img
				src={visaReq?.image ?? '/placeholderImage.jpg'}
				alt='visa req img'
				height={250}
				className='w-full object-cover rounded-t-md'
			/>

			<Space h={'sm'} />

			<Box px={10}>
				<Text weight={500} fz={18} ff={'Nunito sans, sans-serif'}>
					{visaReq?.title}
				</Text>
			</Box>

			<Space h={'md'} />

			<Flex px={10} justify={'space-between'} align={'center'}>
				<Flex align={'center'} gap={10}>
					<Avatar src={visaReq?.author?.avatar} radius={100} />

					<div>
						<Text size={'sm'} fw={700} ff={'Nunito sans, sans-serif'}>
							{visaReq?.author?.name}{' '}
						</Text>
						<Text size={'xs'} fw={500} ff={'Nunito sans, sans-serif'} my={-2}>
							{getTimeDistance(visaReq?.createdAt)}
						</Text>
					</div>
				</Flex>
			</Flex>

			<Space h={'md'} />

			{refetchVisaReq && (
				<Flex color='teal' gap={10} px={10}>
					<Button
						fullWidth
						component={Link}
						href={`/it_sector/visa_requirements/${visaReq?._id}`}
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
						loading={deletingReq}
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
								labels: { confirm: 'Confirm Delete', cancel: 'Cancel' },
								confirmProps: { color: 'red' },
								onCancel: () => {},
								onConfirm: () =>
									deleteReq({
										variables: {
											input: {
												key: '_id',
												operator: MatchOperator.Eq,
												value: visaReq?._id,
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
			<Space h={'sm'} />
		</Box>
	);
};

export default RequirementCard;

export const boxShadow =
	'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
