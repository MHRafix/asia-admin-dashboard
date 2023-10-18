import protectWithSession from '@/app/config/authProtection/protectWithSession';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import PageTitleArea from '@/components/common/PageTitleArea';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Space } from '@mantine/core';

const BusinessData = () => {
	return (
		<AdminLayout>
			<PageTitleArea
				title='Clients contact list'
				tagline='Track contact details of clients'
				currentPathName='Clients list'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
			/>

			<Space h={30} />

			<EmptyPanel
				imgPath='/clientsData.png'
				isShow={true}
				title='There is no clients data found!'
			/>
		</AdminLayout>
	);
};

export default protectWithSession(BusinessData);
