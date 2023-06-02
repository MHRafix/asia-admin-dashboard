export function fileUploader(userpic: File, preset: string) {
	// avatar uploaded to cloudinary cloud service
	const file_upload_cloudinary = async () => {
		if (userpic) {
			const data = new FormData();
			data.append('file', userpic);
			data.append('upload_preset', preset);
			data.append('cloud_name', 'CoderXone');
			const upload_req = await fetch(
				'https://api.cloudinary.com/v1_1/CoderXone/image/upload',
				{
					method: 'POST',
					body: data,
				}
			);
			const file_uploaded = await upload_req.json();
			return file_uploaded.url;
		} else {
			return;
		}
	};

	return { file_upload_cloudinary };
}
