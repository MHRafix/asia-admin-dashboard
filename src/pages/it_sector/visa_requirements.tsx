import { useGetRequirements } from '@/app/api/gql-api-hooks/requirements.api';
import { IVisaReq } from '@/app/api/models/visaRequirements.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import { useGetSession } from '@/app/config/logic/getSession';
import { CREATE_REQUIREMENT } from '@/app/config/queries/requirements.query';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import PageTitleArea from '@/components/common/PageTitleArea';
import RequirementCard from '@/components/custom/Requirements/RequirementCard';
import ServiceSkeleton from '@/components/custom/Services/Services.Skeleton';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useMutation } from '@apollo/client';
import { Button, Space } from '@mantine/core';
import Router from 'next/router';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const VisaRequirements: React.FC = () => {
	const { gettingRequirements, requirements, refetchRequirements } =
		useGetRequirements();

	const { user } = useGetSession();

	const onSuccess = (res: { createVisaReq: IVisaReq }) => {
		refetchRequirements();
		Router?.push(`/it_sector/visa_requirements/${res?.createVisaReq?._id}`);
	};
	const [createRequirement, { loading: creatingRequirement }] = useMutation(
		CREATE_REQUIREMENT,
		Notify({
			sucTitle: 'Visa requirements created successfully!',
			sucMessage: 'Edit requirements details.',
			errMessage: 'Try again to create requirements.',
			action: onSuccess,
		})
	);

	return (
		<AdminLayout title='Visa requirements'>
			<PageTitleArea
				title='Visa requirements'
				tagline='Requirements for applicants'
				actionComponent={
					<div className='flex items-center justify-end gap-2 mb-3'>
						<Button
							loading={creatingRequirement}
							leftIcon={<AiOutlinePlus size={25} />}
							variant='light'
							color={'violet'}
							onClick={() =>
								createRequirement({
									variables: {
										input: {
											title: `New requirements ${requirements?.length! + 1}`,
											description: 'This is description ... ... ...',
											author: user?._id,
										},
									},
								})
							}
						>
							New Requirements
						</Button>
					</div>
				}
				currentPathName='Visa requirements'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
			/>
			<Space h={'sm'} />

			<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
				<ServiceSkeleton show={gettingRequirements} />

				{requirements?.map((req: IVisaReq, idx: number) => (
					<RequirementCard
						key={idx}
						visaReq={req}
						refetchVisaReq={refetchRequirements}
					/>
				))}
			</div>
			<EmptyPanel
				isShow={!requirements?.length && !gettingRequirements}
				title='Oops sorry, No visa requirements article found!'
				imgPath='/req.png'
			/>
		</AdminLayout>
	);
};

export default protectWithSession(VisaRequirements);
