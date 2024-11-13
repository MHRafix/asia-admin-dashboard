import { IEmployees } from "@/app/api/models/employees.model";
import { IUser } from "@/app/api/models/users.model";
import { Notify } from "@/app/config/alertNotification/Notification";
import {
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "@/app/config/gql-queries/employees.query";
import { USERS_QUERY_FOR_DROPDOWN } from "@/app/config/gql-queries/users.query";
import { MatchOperator, SortType, USER_ROLE } from "@/app/config/gql-types";
import { useMutation, useQuery } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Badge,
  Button,
  Group,
  Input,
  NumberInput,
  Select,
  Space,
  Text,
} from "@mantine/core";
import React, { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { getRoleBadgeColor } from "../../Manage_Users/UsersTable";

const EmployeeForm: React.FC<{
  onSuccess: () => void;
  employee?: IEmployees;
}> = ({ onSuccess, employee }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Employee_Form_Type>({
    resolver: yupResolver(EmployeeFormValidator),
  });

  // get users
  const { data: usersData, loading: __usersLoading } = useQuery<{
    users: { nodes: IUser[] };
  }>(USERS_QUERY_FOR_DROPDOWN, {
    variables: {
      input: {
        limit: 10000000,
        page: 1,
        sort: SortType.Desc,
        sortBy: "_id",
        where: {
          key: "role",
          operator: MatchOperator.Ne,
          value: USER_ROLE.CUSTOMER,
        },
      },
    },
  });

  // create a new employee
  const [createEmployee, { loading: __creatingEmployee }] = useMutation(
    CREATE_EMPLOYEE,
    Notify({
      sucTitle: "Employee created successfully",
      action: () => {
        onSuccess();
      },
    })
  );

  // update a employee
  const [updateEmployee, { loading: __updatingEmployee }] = useMutation(
    UPDATE_EMPLOYEE,
    Notify({
      sucTitle: "Employee updated successfully",
      action: () => {
        onSuccess();
      },
    })
  );

  // prefill form with employee data
  useEffect(() => {
    setValue("post", employee?.post!);
    setValue("employee", employee?.email!);
    setValue("salary", employee?.salary!);
  }, [employee]);

  const onSubmit = (input: Employee_Form_Type) => {
    if (employee) {
      updateEmployee({
        variables: {
          input: {
            post: input.post,
            salary: input.salary,
            ...findUserByIdMakeEmployeeRestData(
              usersData?.users?.nodes as IUser[],
              watch("employee")
            ),
            _id: employee?._id,
          },
        },
      });
    } else {
      createEmployee({
        variables: {
          input: {
            post: input.post,
            salary: input.salary,
            ...findUserByIdMakeEmployeeRestData(
              usersData?.users?.nodes as IUser[],
              watch("employee")
            ),
          },
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input.Wrapper
        size="md"
        label="Employee"
        error={<ErrorMessage name="employee" errors={errors} />}
      >
        <Select
          size="lg"
          data={getUserSelectInputData(usersData?.users?.nodes)}
          value={watch("employee")}
          itemComponent={UserSelectItem}
          searchable
          disabled={__usersLoading}
          onChange={(e) => setValue("employee", e as string)}
          placeholder="Pick a user"
        />{" "}
      </Input.Wrapper>

      <Space h={5} />

      <Input.Wrapper
        size="md"
        label="Post"
        error={<ErrorMessage name="post" errors={errors} />}
      >
        <Input size="lg" placeholder="Enter post" {...register("post")} />
      </Input.Wrapper>

      <Space h={5} />

      <Input.Wrapper
        size="md"
        label="Salary"
        error={<ErrorMessage name="salary" errors={errors} />}
      >
        <NumberInput
          size="lg"
          value={watch("salary")}
          placeholder="Enter salary"
          onChange={(e) => setValue("salary", parseInt(e as string))}
        />
      </Input.Wrapper>

      <Space h={10} />

      <Button
        color="teal"
        loading={__creatingEmployee || __updatingEmployee}
        type="submit"
        size="lg"
        fullWidth
      >
        Save
      </Button>
    </form>
  );
};

export default EmployeeForm;

const EmployeeFormValidator = Yup.object().shape({
  employee: Yup.string().required().label("Employee"),
  post: Yup.string().required().label("Post"),
  salary: Yup.number().required().label("Salary"),
});

export type Employee_Form_Type = Yup.InferType<typeof EmployeeFormValidator>;

// input item type
interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  value: string;
  avatar: string;
  email: string;
  role: string;
}

// custom select input style
export const UserSelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ avatar, label, value, role, email, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar color="teal" radius={100} src={avatar}>
          {label?.slice(0, 1).toUpperCase()}
        </Avatar>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {email}
          </Text>
          <Badge color={getRoleBadgeColor(role as USER_ROLE)} size="sm">
            {role}
          </Badge>
        </div>
      </Group>
    </div>
  )
);

// find selected user
const findUserByIdMakeEmployeeRestData = (
  users: IUser[],
  __selectedUserEmail: string
) => {
  const __selectedUser = users.find(
    (user: IUser) => user?.email === __selectedUserEmail
  );
  return {
    name: __selectedUser?.name,
    email: __selectedUser?.email,
    avatar: __selectedUser?.avatar,
    phone: __selectedUser?.phone,
    role: __selectedUser?.role,
  };
};

// make select input data from api response
export const getUserSelectInputData = (data: any) => {
  let result: any = [];
  data?.map((d: any) =>
    result.push({
      label: d.name,
      value: d.email,
      role: d.role,
      email: d.email ?? "N/A",
      avatar: d?.avatar ?? "N/A",
    })
  );

  return result;
};
