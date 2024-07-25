import {
	Task_Progress_Status,
	TaskManagementWithPagination,
} from '@/app/config/gql';
import { Get_Task_List_Query } from '@/app/config/queries/task-management.query';
import { useQuery } from '@apollo/client';

export const useGetTasksByStatus = () => {
	const {
		data: tasks,
		loading: __LoadingTask,
		refetch: __refetchTaskList,
	} = useQuery<{
		taskList: TaskManagementWithPagination;
	}>(Get_Task_List_Query, {
		variables: {
			input: {
				page: 1,
			},
		},
	});

	const pendingTasks = tasks?.taskList?.nodes?.filter(
		(task) => task?.progressStatus === Task_Progress_Status.PENDING
	);
	const inProgressTask = tasks?.taskList?.nodes?.filter(
		(task) => task?.progressStatus === Task_Progress_Status.IN_PROGRESS
	);
	const doneTask = tasks?.taskList?.nodes?.filter(
		(task) => task?.progressStatus === Task_Progress_Status.WORK_DONE
	);
	const revisionTask = tasks?.taskList?.nodes?.filter(
		(task) => task?.progressStatus === Task_Progress_Status.REVISION
	);
	const completedTask = tasks?.taskList?.nodes?.filter(
		(task) => task?.progressStatus === Task_Progress_Status.COMPLETED
	);
	const cancelledTask = tasks?.taskList?.nodes?.filter(
		(task) => task?.progressStatus === Task_Progress_Status.CANCELLED
	);

	return {
		taskByStatus: {
			pendingTasks,
			inProgressTask,
			doneTask,
			revisionTask,
			completedTask,
			cancelledTask,
		},
		__LoadingTask,
		__refetchTaskList,
	};
};
