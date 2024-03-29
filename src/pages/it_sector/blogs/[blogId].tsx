import { useGetBlog, useUpdateBlog } from '@/app/api/gql-api-hooks/blog.api';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import {
	UPDATE_BLOG_DEFAULT_VALUES,
	updateBlogSchema,
} from '@/app/config/form.validation/service-form/service.form.validation';
import { fileUploader } from '@/app/config/logic/fileUploader';
import CircularLoader from '@/components/common/Loader';
import NotepadEditor from '@/components/common/NotepadEditor';
import PageTitleArea from '@/components/common/PageTitleArea';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Button, FileButton, Input, Space, Text } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';

const EditBlog: React.FC<{ blogId: string }> = ({ blogId }) => {
	const [uploading, setUploading] = useState('');
	const [thumbnail, setThumbnail] = useState('');
	const [banner, setBanner] = useState('');

	const { gettingBlog, blog, refetchBlog } = useGetBlog(blogId);
	console.log(blog);

	const [description, setDescription] = useState(blog?.description);

	const form = useForm({
		initialValues: UPDATE_BLOG_DEFAULT_VALUES,
		validate: yupResolver(updateBlogSchema),
	});

	// update initial info with service data
	useEffect(() => {
		setDescription(blog?.description);
		form.setValues({
			title: blog?.title,
			description: blog?.description,
		});
		setBanner(blog?.cover!);
		setThumbnail(blog?.image!);
	}, [blog]);

	const { updateBlog, updatingBlog } = useUpdateBlog(refetchBlog);

	const handleUploadPackageThumbnail = async (
		file: File,
		actionName: string,
		onChangeThumbnail: any
	) => {
		try {
			setUploading(actionName);
			const { file_upload_cloudinary } = fileUploader(
				file,
				'BLOG_THUMBNAIL_AND_BANNER'
			);

			const uploaded = await file_upload_cloudinary();
			if (uploaded) {
				showNotification({
					title: 'File uploaded successfully!',
					message: 'Save file to database.',
					color: 'teal',
				});
				onChangeThumbnail(uploaded);
				setUploading('');
			}
		} catch (err: any) {
			setUploading('');
			showNotification({
				title: 'Failed to upload file!',
				message: err.message,
				color: 'red',
			});
		}
	};

	const handleUpdateForm = (values: any) => {
		// if (form.isDirty()) return;
		updateBlog({
			variables: {
				input: {
					...values,
					_id: blogId,
					image: thumbnail,
					cover: banner,
				},
			},
		});
	};

	return (
		<AdminLayout title='Single service'>
			{gettingBlog && (
				<div className='flex items-center h-[80vh]'>
					<CircularLoader isShow={gettingBlog} />
				</div>
			)}

			{!gettingBlog && (
				<form onSubmit={form.onSubmit(handleUpdateForm)}>
					<PageTitleArea
						title='Edit blog details'
						tagline='Update blog details'
						currentPathName='Create blog'
						othersPath={[
							{
								pathName: 'Home',
								href: '/',
							},
							{
								pathName: 'Blogs',
								href: '/it_sector/blogs',
							},
						]}
						actionComponent={
							<Button color='teal' type='submit' loading={updatingBlog} mb={20}>
								Save Details
							</Button>
						}
					/>

					<Input.Wrapper
						label={
							<Text fz={18} my={5}>
								Title
							</Text>
						}
						my={10}
						error={form.errors.title}
					>
						<Input
							variant='unstyled'
							size={'md'}
							className='!border-[1px] !border-[#32344b] border-solid px-2'
							{...form.getInputProps('title')}
						/>
					</Input.Wrapper>
					<div className='block h-[200px]'>
						<Input.Wrapper
							label={
								<Text fz={18} my={5}>
									Description
								</Text>
							}
						>
							<NotepadEditor value={description!} setValue={setDescription} />
						</Input.Wrapper>
					</div>
					<Space h={10} />
					<div className='grid grid-cols-2 gap-5'>
						<Input.Wrapper
							label={`Upload blog thumbnail (size 300/250 px)`}
							size='md'
							className='relative'
						>
							<div className='h-[250px] bg-[#212231] flex items-center justify-center'>
								{thumbnail ? (
									<Image
										src={thumbnail}
										alt='Thumbnail'
										width={200}
										className='!w-full'
										height={250}
									/>
								) : (
									<HiOutlinePhotograph color='#5F3DC4' size={50} />
								)}
							</div>
							<div className='absolute bottom-3 right-3 gap-1 flex items-center'>
								<div>
									<FileButton
										onChange={(file: File) =>
											handleUploadPackageThumbnail(
												file,
												`BLOG_THUMBNAIL`,
												setThumbnail
											)
										}
										accept='image/png,image/jpeg'
									>
										{(props) => (
											<Button
												loading={uploading === `BLOG_THUMBNAIL`}
												color='violet'
												{...props}
											>
												<FiUpload size={16} />
											</Button>
										)}
									</FileButton>
								</div>
							</div>
						</Input.Wrapper>
						<Input.Wrapper
							label={`Upload blog banner (size 750/300 px)`}
							size='md'
							className='relative'
						>
							<div className='h-[250px] bg-[#212231] flex items-center justify-center'>
								{banner ? (
									<Image
										src={banner}
										alt='Thumbnail'
										width={200}
										className='!w-full'
										height={250}
									/>
								) : (
									<HiOutlinePhotograph color='#5F3DC4' size={50} />
								)}
							</div>
							<div className='absolute bottom-3 right-3 gap-1 flex items-center'>
								<div>
									<FileButton
										onChange={(file: File) =>
											handleUploadPackageThumbnail(
												file,
												`BLOG_BANNER`,
												setBanner
											)
										}
										accept='image/png,image/jpeg'
									>
										{(props) => (
											<Button
												loading={uploading === `BLOG_BANNER`}
												color='violet'
												{...props}
											>
												<FiUpload size={16} />
											</Button>
										)}
									</FileButton>
								</div>
							</div>
						</Input.Wrapper>
					</div>
				</form>
			)}
		</AdminLayout>
	);
};

export default protectWithSession(EditBlog);

export async function getServerSideProps({
	params,
}: {
	params: { blogId: string };
}) {
	return {
		props: { blogId: params?.blogId },
	};
}
