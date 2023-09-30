import AdminLayout from '@/components/layouts/AdminLayout';
import React from 'react';

const Blogs: React.FC = () => {
	return (
		<AdminLayout>
			<ol>
				<li>title</li>
				<li>description</li>
				<li>cover</li>
				<li>files</li>
				<li>author</li>
			</ol>
		</AdminLayout>
	);
};

export default Blogs;
