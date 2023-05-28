import protectWithSession from '@/app/config/authProtection/protectWithSession';
import PageTitleArea from '@/components/common/PageTitleArea';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Button } from '@mantine/core';
import { NextPage } from 'next';
import { AiOutlinePlus } from 'react-icons/ai';

const TourPackages: NextPage = () => {
	return (
		<AdminLayout title='Tour packages'>
			{' '}
			<PageTitleArea
				title='Tour packages'
				tagline='Our arranged packages'
				actionComponent={
					<div className='flex items-center gap-2 my-5'>
						<Button
							// loading={creatingService}
							leftIcon={<AiOutlinePlus size={25} />}
							variant='light'
							color={'violet'}
							// onClick={() =>
							// 	createService({
							// 		variables: {
							// 			title: `New service ${services?.length! + 1}`,
							// 			shortDesc: 'This short description ... ... ...',
							// 			desc: 'This is description ... ... ...',
							// 			price: 100,
							// 		},
							// 	})
							// }
						>
							New Package
						</Button>
					</div>
				}
			/>
		</AdminLayout>
	);
};

export default protectWithSession(TourPackages);
