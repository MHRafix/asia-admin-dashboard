import protectWithSession from '@/app/config/authProtection/protectWithSession';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Indicator, Space, Text, ThemeIcon } from '@mantine/core';
import React, { useState } from 'react';
import { BsBookmarkCheck, BsCheckCircleFill } from 'react-icons/bs';
import { SiGotomeeting } from 'react-icons/si';
import { BiHotel } from 'react-icons/bi';
import { TbPlaneInflight } from 'react-icons/tb';
import { Calendar, DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';

const Dashboard = () => {
	const [value, setValue] = useState<Date | null>(new Date());

	return (
		<AdminLayout title='Dashboard'>
			<div className='grid gap-10'>
				<div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-10'>
					<div className='lg:flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-md'>
						<ThemeIcon color='violet' size={60} variant='light' radius={8}>
							<SiGotomeeting size={30} />
						</ThemeIcon>
						<div>
							<Text fw={700} fz={25}>
								5353
							</Text>
							<Space h={0} />
							<Text fz={15} fw={400} color='#55587b'>
								New Appointments
							</Text>
						</div>
					</div>
					<div className='lg:flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-md'>
						<ThemeIcon color='violet' size={60} variant='light' radius={8}>
							<BsBookmarkCheck size={30} />
						</ThemeIcon>
						<div>
							<Text fw={700} fz={25}>
								5353
							</Text>
							<Space h={0} />
							<Text fz={15} fw={400} color='#55587b'>
								New Bookings
							</Text>
						</div>
					</div>
					<div className='lg:flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-md'>
						<ThemeIcon color='violet' size={60} variant='light' radius={8}>
							<TbPlaneInflight size={30} />
						</ThemeIcon>
						<div>
							<Text fw={700} fz={25}>
								5353
							</Text>
							<Space h={0} />
							<Text fz={15} fw={400} color='#55587b'>
								New Flight
							</Text>
						</div>
					</div>
					<div className='lg:flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-md'>
						<ThemeIcon color='violet' size={60} variant='light' radius={8}>
							<BiHotel size={30} />
						</ThemeIcon>
						<div>
							<Text fw={700} fz={25}>
								5353
							</Text>
							<Space h={0} />
							<Text fz={15} fw={400} color='#55587b'>
								New Hotel Booking
							</Text>
						</div>
					</div>
				</div>

				<div className='lg:flex grid justify-between gap-10'>
					<DatePicker
						className=' bg-[#212231] px-10 py-10 shadow-xl w-12/12 rounded-sm'
						value={value}
						onChange={setValue}
						size='xl'
						renderDay={(date) => {
							const getDate = date.getDate();
							const getDay = date.getDay();
							return (
								<div className='!mx-10'>
									<div
										className={
											getDate === value?.getDate() && getDay === value.getDay()
												? 'bg-red-500 text-xl p-2 w-[54px] h-[54px] flex items-center justify-center rounded-sm'
												: ''
										}
									>
										{getDate}
									</div>
								</div>
							);
						}}
					/>

					<div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
						enim animi aliquam et doloremque tenetur ratione quo? Veritatis
						pariatur odit soluta minima autem voluptatibus, placeat perspiciatis
						assumenda, illo dolore repudiandae eum doloremque accusantium! Nemo
						odit, labore corrupti dolore sunt autem, aut quas illo sint
						adipisci, nostrum facilis error minima perferendis? Fugiat
						accusamus, tempore unde aperiam aut deserunt sunt eum voluptatem
						voluptatum rem soluta maxime vero sit, dolore molestiae dolorem?
						Veritatis optio modi ipsam recusandae dignissimos et quos nihil
						adipisci, amet assumenda, corrupti vel ullam ad nesciunt officia
						omnis reiciendis fuga fugit asperiores architecto quisquam commodi?
						Consequatur quam pariatur omnis iure? Eius, deserunt. Omnis
						consectetur quo doloremque vitae ut ratione quae cupiditate
						provident distinctio odit totam qui quaerat nulla, nam accusantium
						quidem, corrupti in. Quos alias consectetur deserunt dicta enim?
						Laborum est dolorem hic deserunt, corrupti at voluptate a explicabo.
						Inventore voluptatem accusamus corporis provident, suscipit nam
						nesciunt ipsam soluta! Quaerat molestias fugiat totam obcaecati
						deserunt, maxime vel, voluptates explicabo tempore consequatur
						fugiat totam obcaecati deserunt, maxime vel, voluptates explicabo
						tempore consequatur veritatis?suscipit nam nesciunt ipsam soluta!
						Quaerat molestias fugiat totam obcaecati deserunt, maxime vel,
						voluptates explicabo tempore consequatur veritatis?suscipit nam
						nesciunt ipsam soluta! Quaerat molestias fugiat totam obcaecati
						deserunt, maxime vel, voluptates explicabo tempore consequatur
						veritatis?
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default protectWithSession(Dashboard);
