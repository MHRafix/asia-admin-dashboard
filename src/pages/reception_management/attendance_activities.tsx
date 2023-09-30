import AdminLayout from '@/components/layouts/AdminLayout';
import React from 'react';

const AttendanceActivities: React.FC = () => {
	return (
		<AdminLayout>
			<ol>
				<li>_id</li>
				<li>date</li>
				<li>status</li>
				<li>user</li>
				<li>verify by</li>
			</ol>
		</AdminLayout>
	);
};

export default AttendanceActivities;
