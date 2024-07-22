import { getTaskBadgeColors } from '@/app/config/logic/getColors';
import {
	Avatar,
	Badge,
	Button,
	Flex,
	Group,
	Menu,
	Paper,
	Space,
	Text,
	Tooltip,
} from '@mantine/core';

const TaskCard: React.FC = () => {
	return (
		<Paper p={10} my={5} withBorder>
			<Text fz={18} fw={500} color='blue'>
				#123
			</Text>

			<Text fz={18} fw={500}>
				Booked Air Ticket DHK - KBL
			</Text>
			<Space h={'md'} />
			<Flex justify={'space-between'} align={'center'}>
				<Tooltip label='Mehedi Hasan Rafiz'>
					<Avatar color='blue' size={'md'} radius={100} src={''}>
						MH
					</Avatar>
				</Tooltip>

				<Group>
					<Button color='blue' radius={5} variant='outline'>
						View
					</Button>
					<Menu>
						<Menu.Target>
							<Badge
								className='cursor-pointer'
								radius={5}
								size='lg'
								py={18}
								px={20}
								variant='filled'
							>
								PENDING
							</Badge>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item color={getTaskBadgeColors('PENDING')}>
								PENDING
							</Menu.Item>
							<Menu.Item color={getTaskBadgeColors('IN-PROGRESS')}>
								IN-PROGRESS
							</Menu.Item>
							<Menu.Item color={getTaskBadgeColors('DONE')}>DONE</Menu.Item>
							<Menu.Item color={getTaskBadgeColors('REVISION')}>
								REVISION
							</Menu.Item>
							<Menu.Item color={getTaskBadgeColors('COMPLETED')}>
								COMPLETED
							</Menu.Item>
							<Menu.Item color={getTaskBadgeColors('CANCELLED')}>
								CANCELLED
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Flex>
		</Paper>
	);
};

export default TaskCard;
