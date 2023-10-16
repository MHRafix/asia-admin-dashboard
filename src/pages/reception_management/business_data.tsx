import protectWithSession from '@/app/config/authProtection/protectWithSession';
import AdminLayout from '@/components/layouts/AdminLayout';

const BusinessData = () => {
	return (
		<AdminLayout>
			<ol>
				<li>name</li>
				<li>email</li>
				<li>phone</li>
				<li>subject</li>
				<li>profession</li>
			</ol>
		</AdminLayout>
	);
};

export default protectWithSession(BusinessData);
