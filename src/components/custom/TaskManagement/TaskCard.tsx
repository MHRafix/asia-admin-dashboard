import { Task } from '@/app/config/gql';
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

interface ITaskCardProps {
	_task: Task;
	color: string;
}
const TaskCard: React.FC<ITaskCardProps> = ({ _task, color }) => {
	return (
		<Paper p={10} my={5} withBorder>
			<Text fz={18} fw={500} color='blue'>
				#{_task?.taskId}
			</Text>

			<Text fz={18} fw={500}>
				{_task?.taskDetails?.taskName}
			</Text>
			<Space h={'md'} />
			<Flex justify={'space-between'} align={'center'}>
				<Tooltip label={_task?.taskDetails?.taskAssignTo?.name}>
					<Avatar
						color='blue'
						size={'md'}
						radius={100}
						src={_task?.taskDetails?.taskAssignTo?.avatar}
					>
						{_task?.taskDetails?.taskAssignTo?.name?.slice(0, 1).toUpperCase()}
					</Avatar>
				</Tooltip>

				<Group>
					<Button color={color} radius={5} variant='outline'>
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
								color={getTaskBadgeColors(_task?.progressStatus)}
							>
								{_task?.progressStatus}
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
