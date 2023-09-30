import AdminLayout from '@/components/layouts/AdminLayout';
import React from 'react';

const VisaRequirements: React.FC = () => {
	return (
		<AdminLayout>
			<ol>
				<li>title</li>
				<li>country</li>
				<li>visa type</li>
				<li>description</li>
				<li>image</li>
				<li>cover</li>
			</ol>
		</AdminLayout>
	);
};

export default VisaRequirements;
