import NotepadEditor from '@/components/common/NotepadEditor';
import { Input, Textarea } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import React, { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';

const PackageBasicInfoForm: React.FC = () => {
	const [value, setValue] = useState<Date | null>(new Date());
	const [desc, setDesc] = useState<string>();
	return (
		<div>
			<form>
				<div className='grid lg:grid-cols-2 lg:gap-5  gap-2'>
					<Input.Wrapper label='Package Title' size='md'>
						<Input
							variant='unstyled'
							placeholder='@Kashmir trip'
							size={'md'}
							className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
						/>
					</Input.Wrapper>
					<div className='grid lg:grid-cols-2 lg:gap-5 gap-2'>
						<Input.Wrapper label='Regular price' size='md'>
							<Input
								variant='unstyled'
								placeholder='12000'
								size={'md'}
								className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
								type='number'
							/>
						</Input.Wrapper>
						<Input.Wrapper label='Sale price' size='md'>
							<Input
								variant='unstyled'
								placeholder='11000'
								size={'md'}
								className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
								type='number'
							/>
						</Input.Wrapper>
					</div>
					<Input.Wrapper label='Destination' size='md'>
						<Input
							variant='unstyled'
							placeholder='Short description'
							size={'md'}
							className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
						/>
					</Input.Wrapper>

					<div className='grid lg:grid-cols-2 lg:gap-5 gap-2'>
						<Input.Wrapper label='Registration start' size='md'>
							<DatePickerInput
								valueFormat='DD MMM YYYY'
								type='default'
								value={value}
								onChange={setValue}
								size={'md'}
								icon={<FiCalendar size='1.1rem' />}
								variant='unstyled'
								className='!border-[1px] !border-[#32344b] border-solid px-1 py-[7px] rounded-md'
								renderDay={(date) => {
									const getDate = date.getDate();
									const getDay = date.getDay();
									return (
										<div className='!mx-10'>
											<div
												className={
													getDate === value?.getDate()! &&
													getDay === value?.getDay()!
														? 'bg-[#7048E8]  md:w-[42px] md:h-[42px] flex items-center justify-center rounded-sm'
														: ''
												}
											>
												{getDate}
											</div>
										</div>
									);
								}}
							/>
						</Input.Wrapper>
						<Input.Wrapper label='Registration close' size='md'>
							<DatePickerInput
								valueFormat='DD MMM YYYY'
								type='default'
								value={value}
								onChange={setValue}
								size={'md'}
								icon={<FiCalendar size='1.1rem' />}
								variant='unstyled'
								className='!border-[1px] !border-[#32344b] border-solid px-1 py-[7px] rounded-md'
								renderDay={(date) => {
									const getDate = date.getDate();
									const getDay = date.getDay();
									return (
										<div className='!mx-10'>
											<div
												className={
													getDate === value?.getDate()! &&
													getDay === value?.getDay()!
														? 'bg-[#7048E8]  md:w-[42px] md:h-[42px] flex items-center justify-center rounded-sm'
														: ''
												}
											>
												{getDate}
											</div>
										</div>
									);
								}}
							/>
						</Input.Wrapper>
					</div>

					<Input.Wrapper label='Short description' size='md'>
						<Textarea
							variant='unstyled'
							placeholder='Short description'
							size={'md'}
							className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
						/>
					</Input.Wrapper>
					<Input.Wrapper label='Description' size='md'>
						<NotepadEditor setValue={setDesc} value={desc!} />
					</Input.Wrapper>
				</div>
			</form>
		</div>
	);
};

export default PackageBasicInfoForm;
