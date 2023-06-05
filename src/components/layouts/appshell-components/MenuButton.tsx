import { useGetSession } from '@/app/config/logic/getSession';
import { Group, Menu, Text, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import React, { useRef } from 'react';
import { BsGear } from 'react-icons/bs';
import { MdChevronRight, MdOutlineLockClock } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { VscSettings } from 'react-icons/vsc';

export const MenuButton: React.FC = () => {
	const { loading, user } = useGetSession();
	const ref = useRef();
	return (
		<Group position='center'>
			<Menu withArrow>
				<Menu.Target>
					<UnstyledButton
						// @ts-ignore
						ref={ref}
						sx={(theme) => ({
							display: 'block',
							width: '100%',
							padding: '10px',
							color:
								theme.colorScheme === 'dark'
									? theme.colors.dark[0]
									: theme.black,

							'&:hover': {
								backgroundColor: '#25262B',
							},
						})}
						// {...others}
					>
						<Group>
							{/* <Avatar src={user?.avatar} radius='xl' /> */}

							<VscSettings size={20} />
							<Text size='md' weight={500} ff={'Nunito sans, sans-serif'}>
								Settings
							</Text>

							{<MdChevronRight size='1rem' />}
						</Group>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown py={10} bg={'#262736'}>
					<Link
						href={'/settings/app_info/basic_info'}
						className='!no-underline'
					>
						<Menu.Item
							icon={<TbListDetails size={18} />}
							// color='violet'
							fz={16}
							ff={'Nunito sans, sans-serif'}
						>
							Basic information
						</Menu.Item>
					</Link>
					<Link
						href={'/settings/app_info/opening_hours'}
						className='!no-underline'
					>
						<Menu.Item
							icon={<MdOutlineLockClock size={18} />}
							// color='violet'
							fz={16}
							ff={'Nunito sans, sans-serif'}
						>
							Opening hours
						</Menu.Item>
					</Link>
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
};
