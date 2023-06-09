import protectWithSession from '@/app/config/authProtection/protectWithSession';
import PageTitleArea from '@/components/common/PageTitleArea';
import ProfileDetails from '@/components/custom/Settings/MyAccount/ProfileSettings/ProfileDetails';
import ProfileUpdateForm from '@/components/custom/Settings/MyAccount/ProfileSettings/ProfileUpdateForm';
import AdminLayout from '@/components/layouts/AdminLayout';

const MyProfileSettings = () => {
	return (
		<AdminLayout title='My profile'>
			<PageTitleArea
				title='My profile settings'
				tagline='Update my profile information'
			/>
			<div className='flex items-center '>
				<div className='sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto grid gap-5'>
					<ProfileDetails />
					<ProfileUpdateForm />
				</div>
			</div>
		</AdminLayout>
	);
};

export default protectWithSession(MyProfileSettings);
