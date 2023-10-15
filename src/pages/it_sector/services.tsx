import { useGetServices } from '@/app/api/gql-api-hooks/service.api';
import { IService } from '@/app/api/models/service.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import { useGetSession } from '@/app/config/logic/getSession';
import { CREATE_SERVICE } from '@/app/config/queries/service.query';
import PageTitleArea from '@/components/common/PageTitleArea';
import ServiceCard from '@/components/custom/Services/ServiceCard';
import ServiceSkeleton from '@/components/custom/Services/Services.Skeleton';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useMutation } from '@apollo/client';
import { Button } from '@mantine/core';
import { NextPage } from 'next';
import Router from 'next/router';
import { AiOutlinePlus } from 'react-icons/ai';

const Services: NextPage = () => {
	const { getingServices, services, refetchServices } = useGetServices();
	const { user } = useGetSession();

	const onSuccess = (res: { createService: IService }) => {
		refetchServices();
		Router?.push(`/it_sector/services/${res?.createService?._id}`);
	};

	const [createService, { loading: creatingService }] = useMutation(
		CREATE_SERVICE,
		Notify({
			sucTitle: 'Service created successfully!',
			sucMessage: 'Edit service details.',
			errMessage: 'Try again to create service.',
			action: onSuccess,
		})
	);

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
											price: 100,
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
				{services?.map((service: IService, idx: number) => (
					<ServiceCard
						key={idx}
						service={service}
						refetchServices={refetchServices}
					/>
				))}
			</div>
		</AdminLayout>
	);
};

export default protectWithSession(Services);
