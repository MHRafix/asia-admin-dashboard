import protectWithSession from '@/app/config/authProtection/protectWithSession';

const NewEmployee = () => {
	return <div>NewEmployee</div>;
};

export default protectWithSession(NewEmployee);
