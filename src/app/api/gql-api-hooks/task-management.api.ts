import { Get_Task_List_Query } from "@/app/config/gql-queries/task-management.query";
import {
  MatchOperator,
  SortType,
  Task_Progress_Status,
  TaskManagementWithPagination,
  USER_ROLE,
} from "@/app/config/gql-types";
import { useQuery } from "@apollo/client";
import { IUser } from "../models/users.model";

export const useGetTasksByStatus = (user: IUser, filterQuery: any) => {
  const variableForModerator = {
    input: {
      page: 1,
      sort: SortType.Desc,
      sortBy: "_id",
      whereOperator: filterQuery?.value ? "and" : "or",
      where: [
        {
          key: "taskCreatedBy",
          operator: MatchOperator?.Eq,
          value: user?._id,
        },

        {
          key: "taskDetails.taskAssignTo",
          operator: MatchOperator?.Eq,
          value: filterQuery?.value ? filterQuery?.value : user?._id,
        },
      ],
    },
  };

  const variableForAdmin = {
    input: {
      page: 1,
      sort: SortType.Desc,
      sortBy: "_id",
      where: filterQuery,
    },
  };

  const variableForEmployee = {
    input: {
      page: 1,
      sort: SortType.Desc,
      sortBy: "_id",
      where: {
        key: "taskDetails.taskAssignTo",
        operator: MatchOperator?.Eq,
        value: user?._id,
      },
    },
  };

  // handle variable switch
  const handleVariableForQuery = (role: USER_ROLE) => {
    switch (role) {
      case USER_ROLE.ADMIN:
        return variableForAdmin;

      case USER_ROLE.MODERATOR:
        return variableForModerator;

      case USER_ROLE.EMPLOYEE:
        return variableForEmployee;

      default:
        return variableForEmployee;
    }
  };

  // get tasks
  const {
    data: tasks,
    loading: __LoadingTask,
    refetch: __refetchTaskList,
  } = useQuery<{
    taskList: TaskManagementWithPagination;
  }>(Get_Task_List_Query, {
    variables: handleVariableForQuery(user?.role),
    skip: !user?._id,
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
