import protectWithSession from '@/app/config/authProtection/protectWithSession';
import PageTitleArea from '@/components/common/PageTitleArea';
import AdminLayout from '@/components/layouts/AdminLayout';

const Settings = () => {
	return (
		<AdminLayout title='Settings'>
			<PageTitleArea
				title='Company web settings'
				tagline='Our company profile information'
			/>
		</AdminLayout>
	);
};

export default protectWithSession(Settings);
