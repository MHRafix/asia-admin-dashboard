import protectWithSession from '@/app/config/authProtection/protectWithSession';
import AdminLayout from '@/components/layouts/AdminLayout';

const Settings = () => {
	return <AdminLayout title='Settings'>Settings</AdminLayout>;
};

export default protectWithSession(Settings);
