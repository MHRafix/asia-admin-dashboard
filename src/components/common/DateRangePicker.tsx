import { DatePickerInput } from '@mantine/dates';
import React from 'react';
import { FiCalendar } from 'react-icons/fi';

const DateRangePicker: React.FC<{
	dateRange: [Date, Date];
	onChangeDate: (range: [Date, Date]) => void;
}> = ({ dateRange, onChangeDate }) => {
	return (
		<>
			<DatePickerInput
				valueFormat='DD MMM YYYY'
				type='range'
				value={dateRange}
				onChange={onChangeDate}
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
									(getDate === dateRange[0]?.getDate()! &&
										getDay === dateRange[0]?.getDay()!) ||
									(getDate === dateRange[1]?.getDate()! &&
										getDay === dateRange[1]?.getDay()!)
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
