import { IBlog } from '@/app/api/models/blog.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import { REMOVE_BLOG } from '@/app/config/gql-queries/blogs.query';
import { MatchOperator } from '@/app/config/gql-types';
import { getTimeDistance } from '@/app/config/logic/getTimeDistance';
import { useMutation } from '@apollo/client';
import { Avatar, Box, Button, Flex, Space, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconThumbUp } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

interface IBlogProps {
	blog: IBlog;
	refetchBlog?: () => void;
}

const BlogCard: React.FC<IBlogProps> = ({ blog, refetchBlog }) => {
	const onSuccess = () => {
		refetchBlog?.();
	};

	const [deleteBlog, { loading: deletingBlog }] = useMutation(
		REMOVE_BLOG,
		Notify({
			sucTitle: 'Blog deleted successfully!',
			errMessage: 'Try again to delete blog.',
			action: onSuccess,
		})
	);
	return (
		<Box
			style={{
				boxShadow: boxShadow,
			}}
			className='relative rounded-lg grid bg-[#212131]'
		>
			<img
				src={blog?.image ?? '/placeholderImage.jpg'}
				alt='blog img'
				height={200}
				className='w-full'
			/>

			<Space h={'sm'} />

			<Box px={10}>
				<Text weight={500} fz={18} ff={'Nunito sans, sans-serif'}>
					{blog?.title}
				</Text>
				<Space h={5} />
				<Text size='md' color='dimmed' ff={'Nunito sans, sans-serif'}>
					{blog?.description.slice(0, 120)}
				</Text>
			</Box>

			<Space h={'md'} />

			<Flex px={10} justify={'space-between'} align={'center'}>
				<Flex align={'center'} gap={10}>
					<Avatar src={blog?.author?.avatar} radius={100} />

					<div>
						<Text size={'sm'} fw={700} ff={'Nunito sans, sans-serif'}>
							{blog?.author?.name}{' '}
						</Text>
						<Text size={'xs'} fw={500} ff={'Nunito sans, sans-serif'} my={-2}>
							{getTimeDistance(blog?.createdAt)}
						</Text>
					</div>
				</Flex>

				<Button
					size='sm'
					leftIcon={<IconThumbUp />}
					color='red'
					variant='subtle'
				>
					<Text ff={'Nunito sans, sans-serif'}>{blog?.like ?? 0}</Text>
				</Button>
			</Flex>

			<Space h={'md'} />

			{refetchBlog && (
				<Flex color='teal' gap={10} px={10}>
					<Button
						fullWidth
						component={Link}
						href={`/it_sector/blogs/${blog?._id}`}
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
						loading={deletingBlog}
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
									deleteBlog({
										variables: {
											input: {
												key: '_id',
												operator: MatchOperator.Eq,
												value: blog?._id,
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

export default BlogCard;

export const boxShadow =
	'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
