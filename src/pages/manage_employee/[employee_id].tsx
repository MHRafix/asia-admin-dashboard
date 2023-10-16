import protectWithSession from "@/app/config/authProtection/protectWithSession";
import AdminLayout from "@/components/layouts/AdminLayout";

const EmployeeId = () => {
	return <AdminLayout>EmployeeId</AdminLayout>;
};

export default protectWithSession(EmployeeId);
