import React from 'react';

const TableHead: React.FC<{ headData: string }> = ({ headData }) => {
	return <th className='!py-3'>{headData}</th>;
};

export default TableHead;
