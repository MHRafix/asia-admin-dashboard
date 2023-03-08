export const handleSetUid = (
	onStoreId: (state: any) => void,
	bookingId: string
) => {
	onStoreId((prev: string[]) => {
		const isExist = prev?.find((id: string) => id === bookingId);
		if (isExist) {
			const restId = prev.filter((id: string) => id !== bookingId);
			return restId;
		} else {
			return [...prev, bookingId];
		}
	});
};
