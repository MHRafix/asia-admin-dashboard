import { createStyles } from '@mantine/core';
import dynamic from 'next/dynamic';
import { ReactNode, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
const ReactQuill =
	typeof window === 'object'
		? dynamic(import('react-quill'), { ssr: false })
		: null;

const NotepadEditor = ({ title, icon }: Props) => {
	const { classes } = useStyles();
	const [value, setValue] = useState('');
	// console.log(value);

	return (
		<div>
			{/* drawer body */}
			{/* <ScrollArea className={classes.drawerBody}> */}
			{ReactQuill ? (
				<ReactQuill
					className={classes.quillBody}
					theme='snow'
					value={value}
					onChange={setValue}
				/>
			) : null}
			{/* </ScrollArea> */}
		</div>
	);
};

export default NotepadEditor;

// styles
const useStyles = createStyles((theme, _params, getRef) => {
	return {
		drawerHeader: {
			backgroundColor: 'transparent',
			color: 'white',
		},
		drawerBody: {
			height: '60%',
		},
		quillBody: {
			height: '100px',
		},
	};
});

// component props
type Props = {
	title: string;
	icon: ReactNode;
};
