import { gql } from "@apollo/client";

export const Task_Revinew_Query = gql`
  query Task_Revinew_Calculator($employeeId: String!) {
    taskRevinew(employeeId: $employeeId)
  }
`;

export const All_Employee_ID = gql`
  query {
    allEmployeeIds
  }
`;
