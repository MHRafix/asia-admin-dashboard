import PageTitleArea from '@/components/common/PageTitleArea';
import AdminLayout from '@/components/layouts/AdminLayout';
import { NextPage } from 'next';

const CreatePackage: NextPage = () => {
	return (
		<AdminLayout title='Create package'>
			<PageTitleArea
				title='New tour package'
				tagline='Create a package'
				currentPathName='Create package'
			/>
		</AdminLayout>
	);
};

export default CreatePackage;
