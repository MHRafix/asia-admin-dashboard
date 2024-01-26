import protectWithSession from '@/app/config/authProtection/protectWithSession';
import AdminLayout from '@/components/layouts/AdminLayout';
import { NextPage } from 'next';

const EditTourPackage: NextPage = () => {
	return <AdminLayout title='Edit Package'>Edit Tour Package</AdminLayout>;
};

export default protectWithSession(EditTourPackage);
