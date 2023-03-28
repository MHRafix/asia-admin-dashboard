import { useGetServices } from '@/app/api/api-hooks/service.api';
import { IService } from '@/app/api/models/service.model';
import {
	SERVICES_DEFAULT_VALUE,
	SERVICES_TYPE,
} from '@/app/config/configuration';
import PageTitleArea from '@/components/common/PageTitleArea';
import ServiceCard from '@/components/custom/Services/ServiceCard';
import ServiceSkeleton from '@/components/custom/Services/Services.Skeleton';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Select } from '@mantine/core';
import { NextPage } from 'next';

const Services: NextPage = () => {
	const { getingServices, services } = useGetServices();

	return (
		<AdminLayout title='Services'>
			<PageTitleArea
				title='Services'
				tagline='Our provided services'
				actionComponent={
					<div className='flex items-center gap-2'>
						{/* <Button
							loading={bulkDeleting}
							disabled={!customerIds?.length}
							color='red'
							leftIcon={<FiTrash size={16} />}
							onClick={() => bulkDeleteCustomer()}
						>
							Bulk Remove
						</Button>
						<Select
							w={120}
							placeholder='Pick one'
							onChange={(value) => handleLimitChange(value!)}
							data={TABLE_DATA_LIMITS}
							defaultValue={TABLE_DEFAULT_LIMIT}
						/> */}
						<Select
							variant='filled'
							color='red'
							w={200}
							placeholder='Pick one'
							// onChange={(value) => handleSortChange(value!)}
							nothingFound='No options'
							data={SERVICES_TYPE}
							defaultValue={SERVICES_DEFAULT_VALUE}
						/>
					</div>
				}
			/>

			<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 '>
				<ServiceSkeleton show={!services?.length} />
				{services?.map((service: IService, idx: number) => (
					<ServiceCard key={idx} service={service} />
				))}
			</div>
		</AdminLayout>
	);
};

export default Services;
