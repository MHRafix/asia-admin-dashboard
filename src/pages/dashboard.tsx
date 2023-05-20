import protectWithSession from '@/app/config/authProtection/protectWithSession';
import AdminLayout from '@/components/layouts/AdminLayout';
import React from 'react';

const Dashboard = () => {
	return <AdminLayout title='Dashboard'>Dashboard</AdminLayout>;
};

export default protectWithSession(Dashboard);
