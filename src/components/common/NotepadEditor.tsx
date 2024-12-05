import { createStyles } from '@mantine/core';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill =
	typeof window === 'object'
		? dynamic(import('react-quill'), { ssr: false })
		: null;

const NotepadEditor = ({ value, setValue }: Props) => {
	const { classes } = useStyles();

	return (
		<div>
			{ReactQuill ? (
				<ReactQuill
					className={classes.quillBody}
					theme='snow'
					value={value}
					onChange={setValue}
				/>
			) : null}
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
			height: '300px',
		},
	};
});

// component props
type Props = {
	value: string;
	setValue: (state: string) => void;
};
