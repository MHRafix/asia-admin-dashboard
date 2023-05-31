import { Input } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

const UploadThumbnails: React.FC = () => {
	const [carouselThumbnails, setCarouselThumbnails] = useState([1, 5, 4, 5]);
	return (
		<div>
			<div className='flex justify-center items-center gap-8 mt-5'>
				<Input.Wrapper label='Upload thumbnail' size='md' className='w-4/12'>
					<Dropzone
						h={200}
						bg={'#212231'}
						className='flex items-center justify-center'
						loading={false}
						onDrop={() => console.log('first')}
					>
						<FiUpload size={50} />
					</Dropzone>
				</Input.Wrapper>
			</div>

			<div className='grid lg:grid-cols-2 gap-5 mt-8'>
				{carouselThumbnails?.map((thumbnail, idx: number) => (
					<Input.Wrapper
						key={idx}
						label={`Upload carousel thumbnail ${idx + 1}`}
						size='md'
					>
						<Dropzone
							h={200}
							bg={'#212231'}
							className='flex items-center justify-center'
							loading={false}
							onDrop={() => console.log('first')}
						>
							<FiUpload size={50} />
						</Dropzone>
					</Input.Wrapper>
				))}
			</div>
		</div>
	);
};

export default UploadThumbnails;
