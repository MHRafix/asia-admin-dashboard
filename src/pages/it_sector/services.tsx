import { useGetServices } from '@/app/api/gql-api-hooks/service.api';
import { IService } from '@/app/api/models/service.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import { CREATE_SERVICE } from '@/app/config/gql-queries/service.query';
import { useGetSession } from '@/app/config/logic/getSession';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import PageTitleArea from '@/components/common/PageTitleArea';
import ServiceCard from '@/components/custom/Services/ServiceCard';
import ServiceSkeleton from '@/components/custom/Services/Services.Skeleton';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useMutation } from '@apollo/client';
import { Button } from '@mantine/core';
import { NextPage } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const Services: NextPage = () => {
	const { user } = useGetSession(); // user session
	const { getingServices, services, refetchServices } = useGetServices();

	// when service creation success
	const onSuccess = (res: { createService: IService }) => {
		Router?.push(`/it_sector/services/${res?.createService?._id}`);
	};

	// create service API
	const [createService, { loading: creatingService }] = useMutation(
		CREATE_SERVICE,
		Notify({
			sucTitle: 'Service created successfully!',
			sucMessage: 'Edit service details.',
			errMessage: 'Try again to create service.',
			action: onSuccess,
		})
	);

	// refetch services
	useEffect(() => {
		refetchServices();
	}, []);

	return (
		<AdminLayout title='Services'>
			<PageTitleArea
				title='Services'
				tagline='Our provided services'
				currentPathName='Services'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
				actionComponent={
					<div className='flex items-center gap-2 mb-5'>
						<Button
							loading={creatingService}
							leftIcon={<AiOutlinePlus size={25} />}
							variant='light'
							color={'violet'}
							onClick={() =>
								createService({
									variables: {
										input: {
											title: `New service ${services?.length! + 1}`,
											shortDesc: 'This short description ... ... ...',
											desc: 'This is description ... ... ...',
											author: user?._id,
										},
									},
								})
							}
						>
							New Service
						</Button>
					</div>
				}
			/>

			<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
				<ServiceSkeleton show={getingServices} />
				{!getingServices && (
					<>
						{services?.map((service: IService, idx: number) => (
							<ServiceCard
								key={idx}
								service={service}
								refetchServices={refetchServices}
							/>
						))}
					</>
				)}
			</div>

			<EmptyPanel
				imgPath='/service.png'
				isShow={!services?.length && !getingServices}
				title='There is no service found!'
			/>
		</AdminLayout>
	);
};

export default protectWithSession(Services);
