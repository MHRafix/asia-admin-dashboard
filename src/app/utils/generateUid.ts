import { nanoid } from 'nanoid';

export const generateUid = () => {
	const rawID = nanoid();
	const idWithToast =
		rawID.slice(0, 2) + Date.now().toString().slice(10, 13) + rawID.slice(4, 6);
	return idWithToast;
};
