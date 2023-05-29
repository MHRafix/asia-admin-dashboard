import { DatePickerInput } from '@mantine/dates';
import React, { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';

const DateRangePicker: React.FC<{}> = () => {
	const [value, setValue] = useState<[Date | null, Date | null]>([
		new Date('05-01-2023'),
		new Date('05-31-2023'),
	]);
	return (
		<>
			<DatePickerInput
				valueFormat='DD MMM YYYY'
				type='range'
				value={value}
				onChange={setValue}
				mx='auto'
				dropdownType='modal'
				icon={<FiCalendar size='1.1rem' />}
				variant='unstyled'
				maw={300}
				className='!bg-[#282a3f] p-2 mt-2 rounded-md'
				renderDay={(date) => {
					const getDate = date.getDate();
					const getDay = date.getDay();
					return (
						<div className='!mx-10'>
							<div
								className={
									(getDate === value[0]?.getDate()! &&
										getDay === value[0]?.getDay()!) ||
									(getDate === value[1]?.getDate()! &&
										getDay === value[1]?.getDay()!)
										? 'bg-[#7048E8]  md:w-[36px] md:h-[36px] flex items-center justify-center rounded-sm'
										: ''
								}
							>
								{getDate}
							</div>
						</div>
					);
				}}
			/>
		</>
	);
};

export default DateRangePicker;
