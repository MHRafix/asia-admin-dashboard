import { useGetBlogs } from '@/app/api/gql-api-hooks/blog.api';
import { IBlog } from '@/app/api/models/blog.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import { CREATE_BLOG } from '@/app/config/gql-queries/blogs.query';
import { useGetSession } from '@/app/config/logic/getSession';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import PageTitleArea from '@/components/common/PageTitleArea';
import BlogCard from '@/components/custom/Blog/BlogCard';
import ServiceSkeleton from '@/components/custom/Services/Services.Skeleton';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useMutation } from '@apollo/client';
import { Button, Space } from '@mantine/core';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const Blogs: React.FC = () => {
	// user session
	const { user } = useGetSession();

	// blogs API
	const { blogsLoading, blogs, onRefetch } = useGetBlogs();

	// when blog update success
	const onSuccess = (res: { createBlog: IBlog }) => {
		Router?.push(`/it_sector/blogs/${res?.createBlog?._id}`);
	};

	// create blog API
	const [createBlog, { loading: creatingBlog }] = useMutation(
		CREATE_BLOG,
		Notify({
			sucTitle: 'Blog created successfully!',
			sucMessage: 'Edit blog details.',
			errMessage: 'Try again to create blog.',
			action: onSuccess,
		})
	);

	// refetch blogs API
	useEffect(() => {
		onRefetch();
	}, []);

	return (
		<AdminLayout title='Blog posts'>
			<PageTitleArea
				title='Blog posts'
				tagline='Reach out more clients'
				actionComponent={
					<div className='flex items-center gap-2 mb-5'>
						<Button
							loading={creatingBlog}
							leftIcon={<AiOutlinePlus size={25} />}
							variant='light'
							color={'violet'}
							onClick={() =>
								createBlog({
									variables: {
										input: {
											title: `New blog ${blogs?.length! + 1}`,
											description: 'This is description ... ... ...',
											author: user?._id,
										},
									},
								})
							}
						>
							New Blog
						</Button>
					</div>
				}
				currentPathName='Blogs'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
			/>
			<Space h={'sm'} />

			<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
				<ServiceSkeleton show={blogsLoading} />

				{!blogsLoading && (
					<>
						{blogs?.map((blog: IBlog, idx: number) => (
							<BlogCard key={idx} blog={blog} refetchBlog={onRefetch} />
						))}
					</>
				)}
			</div>

			<EmptyPanel
				imgPath='/emptyBlog.png'
				isShow={!blogs?.length && !blogsLoading}
				title='There is no blogs found!'
			/>
		</AdminLayout>
	);
};

export default protectWithSession(Blogs);
