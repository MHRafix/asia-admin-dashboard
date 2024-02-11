export const getSelectInputData = (input: any) => {
	let dataArray: any = [];

	input?.map((value: any) =>
		dataArray.push({
			label: value?.title,
			value: value?._id,
		})
	);

	return dataArray;
};
