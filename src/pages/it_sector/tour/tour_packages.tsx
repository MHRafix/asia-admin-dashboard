import protectWithSession from '@/app/config/authProtection/protectWithSession';
import PageTitleArea from '@/components/common/PageTitleArea';
import TravelPackages from '@/components/custom/TravelPackage/TravelPackages';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Button } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import { AiOutlinePlus } from 'react-icons/ai';

const TourPackages: NextPage = () => {
	return (
		<AdminLayout title='Tour packages'>
			<PageTitleArea
				title='Tour packages'
				tagline='Our arranged packages'
				currentPathName='Tour packages'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
				actionComponent={
					<div className='flex items-center gap-2 my-5'>
						<Link href='/it_sector/tour/tour_packages/createPackage'>
							<Button
								leftIcon={<AiOutlinePlus size={25} />}
								variant='light'
								color={'violet'}
							>
								New Package
							</Button>
						</Link>
					</div>
				}
			/>
			<TravelPackages skeletonCount={20} />
		</AdminLayout>
	);
};

export default protectWithSession(TourPackages);
