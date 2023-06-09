import { useGetSession } from '@/app/config/logic/getSession';
import { signOut } from '@/app/config/logic/signOut';
import {
	Avatar,
	Box,
	Button,
	Flex,
	Group,
	Indicator,
	Input,
	Text,
	Title,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import React from 'react';
import { FaEnvelope, FaMobile, FaUser } from 'react-icons/fa';
import 'react-phone-number-input/style.css';

const ProfileDetails: React.FC<{}> = () => {
	const { user } = useGetSession();

	return (
		<div className=' p-5 rounded-md shadow-2xl border-[1px] border-solid border-slate-700'>
			<Group position='center'>
				<Indicator inline size={15} offset={7} position='top-end' color='teal'>
					<Avatar
						className='cursor-pointer capitalize mx-auto'
						size='xl'
						color='teal'
						radius='xl'
						src={user?.avatar}
					>
						RA
					</Avatar>
				</Indicator>
			</Group>

			<Flex justify='space-between' align='center'>
				<Title
					order={4}
					color='white'
					mt={10}
					ff='Nunito sans, sans-serif'
					fw={600}
				>
					Profile Details
				</Title>
				<Button
					color='red'
					radius='md'
					size='sm'
					fz={18}
					ff='Nunito sans, sans-serif'
					onClick={() =>
						openConfirmModal({
							title: 'Confirm your logout action',
							centered: true,
							children: <Text size='sm'>Are you sure you want to logout.</Text>,
							labels: {
								confirm: 'Logout',
								cancel: 'No, Let me logged in',
							},
							confirmProps: { color: 'red' },
							onCancel: () => {},
							onConfirm: () => signOut(),
						})
					}
				>
					Logout
				</Button>
			</Flex>
			<Box>
				<Input
					ml={-7}
					mb={-5}
					size='md'
					readOnly
					icon={<FaUser color='#15AABF' size={25} opacity={1} />}
					variant='unstyled'
					value={user?.name}
					color={'#000'}
					ff='Nunito sans, sans-serif'
				/>
				<Input
					ml={-7}
					my={-5}
					size='md'
					ff='Nunito sans, sans-serif'
					readOnly
					icon={<FaEnvelope color='#D6336C' size={25} opacity={1} />}
					variant='unstyled'
					value={user?.email}
					color={'#000'}
				/>
				<Input
					ml={-7}
					my={-5}
					size='md'
					readOnly
					icon={<FaMobile color='#7950F2' size={25} opacity={1} />}
					variant='unstyled'
					value={user?.phone || '+880 1*** ******'}
					color={'#000'}
					ff='Nunito sans, sans-serif'
				/>
			</Box>
		</div>
	);
};

export default ProfileDetails;
