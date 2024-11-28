import {
	IExpensesType,
	IExpensesWithPagination,
} from '@/app/api/models/expense.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import {
	Create_Expense_Mutation,
	Expense_Remove_Mutation,
	Expenses_List_Query,
	Update_Expense_Mutation,
} from '@/app/config/gql-queries/expense.query';
import { MatchOperator, USER_ROLE } from '@/app/config/gql-types';
import { useGetSession } from '@/app/config/logic/getSession';
import DrawerWrapper from '@/components/common/Drawer/DrawerWrapper';
import PageTitleArea from '@/components/common/PageTitleArea';
import DataTable from '@/components/common/Table/DataTable';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useMutation, useQuery } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Menu, NumberInput, Space, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { NextPage } from 'next';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { IState } from './reception_management/attendance_activities';

const ExpenseList: NextPage = () => {
	const { user } = useGetSession(); // user session

	// states
	const [state, setState] = useSetState<IState>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
		refetching: false,
	});

	// expense form
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<IExpenseType>({
		resolver: yupResolver(
			Yup.object().shape({
				title: Yup.string().required().label('Title'),
				description: Yup.string().optional().nullable().label('description'),
				amount: Yup.number().required().label('Amount'),
			})
		),
	});

	// expenses list api
	const {
		data: expenses,
		loading: fetching__expenses,
		refetch: refetchExpense,
	} = useQuery<{
		expenseCalculationList: IExpensesWithPagination;
	}>(Expenses_List_Query);

	// create expense mutation
	const [createExpense, { loading: expenseCreating }] = useMutation(
		Create_Expense_Mutation,
		Notify({
			sucTitle: 'Expense created successfully!',
			errMessage: 'Failed to create expense.',
			action: () => {
				refetchExpense();
				setState({
					modalOpened: false,
					operationType: null,
				});
			},
		})
	);

	// create expense mutation
	const [updateExpense, { loading: expenseUpdating }] = useMutation(
		Update_Expense_Mutation,
		Notify({
			sucTitle: 'Expense updated successfully!',
			errMessage: 'Failed to update expense.',
			action: () => {
				refetchExpense();
				setState({
					modalOpened: false,
					operationType: null,
				});
			},
		})
	);

	// handle refetch
	const handleRefetch = (variables: any) => {
		setState({ refetching: true, operationId: '', modalOpened: false });
		refetchExpense(variables).finally(() => {
			setState({ refetching: false });
		});
	};

	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => [
			{
				accessorKey: 'title',
				header: 'Expense',
			},
			{
				accessorKey: 'description',
				header: 'Description',
			},
			{
				accessorKey: 'amount',
				header: 'Amount',
				accessorFn: (expense: IExpensesType) => {
					return (
						<Text className='!text-red-500 font-bold'>
							{expense?.amount || 0} BDT
						</Text>
					);
				},
			},
		],
		[]
	);

	// remove client data mutation
	const [removeExpense, { loading: removing }] = useMutation(
		Expense_Remove_Mutation,
		Notify({
			sucTitle: 'Expense removed successfully',
			errMessage: 'Failed to remove expense.',
			action: () => refetchExpense(),
		})
	);

	// on submit expense form
	const onSubmit = (payload: IExpenseType) => {
		if (state?.operationType === 'create') {
			createExpense({
				variables: {
					input: payload,
				},
			});
		} else {
			updateExpense({
				variables: {
					input: { ...payload, _id: state?.operationPayload?._id },
				},
			});
		}
	};

	// prefill form with exist data
	useEffect(() => {
		setValue('title', state?.operationPayload?.title);
		setValue('description', state?.operationPayload?.description);
		setValue('amount', state?.operationPayload?.amount);
	}, [state.operationPayload]);

	return (
		<AdminLayout title='Expense list'>
			<PageTitleArea
				title='Expenses Management'
				tagline='Organization expenses management'
				currentPathName='Expenses Management'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
			/>

			<DataTable
				columns={columns}
				data={expenses?.expenseCalculationList?.nodes ?? []}
				refetch={handleRefetch}
				totalCount={expenses?.expenseCalculationList?.meta?.totalCount ?? 100}
				RowActionMenu={(row: IExpensesType) => (
					<>
						<Menu.Item
							icon={<IconPencil size={18} />}
							color='orange'
							onClick={() => {
								console.log(row);
								setState({
									modalOpened: true,
									operationType: 'update',
									operationPayload: row,
								});
							}}
							disabled={user?.role !== USER_ROLE.ADMIN}
						>
							Edit
						</Menu.Item>
						<Menu.Item
							icon={<IconTrash size={18} />}
							color='red'
							onClick={() =>
								modals.openConfirmModal({
									title: 'Proceed to remove',
									children: (
										<Text size='sm'>
											Are you sure you want to delete your data?
										</Text>
									),
									labels: {
										cancel: 'Cencel',
										confirm: 'Yes',
									},
									onCancel: () => {},
									onConfirm: () =>
										removeExpense({
											variables: {
												input: {
													key: '_id',
													operator: MatchOperator.Eq,
													value: row?._id,
												},
											},
										}),
								})
							}
							disabled={user?.role !== USER_ROLE.ADMIN}
						>
							Remove
						</Menu.Item>
					</>
				)}
				ActionArea={
					<>
						<Button
							color='violet'
							variant='light'
							leftIcon={<IconPlus size={16} />}
							onClick={() =>
								setState({
									modalOpened: true,
									operationType: 'create',
									operationPayload: {},
								})
							}
							size='sm'
						>
							Add new
						</Button>
					</>
				}
				loading={state.refetching || removing || fetching__expenses}
			/>

			<Space h={30} />

			<DrawerWrapper
				title='Add expenses'
				close={() =>
					setState({
						modalOpened: false,
						operationType: 'create',
					})
				}
				opened={state.modalOpened}
				size='md'
			>
				<div className='pr-4'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input.Wrapper
							label='Title'
							error={<ErrorMessage name='title' errors={errors} />}
						>
							<Input {...register('title')} placeholder='Expense title' />
						</Input.Wrapper>

						<Space h={'sm'} />

						<Input.Wrapper
							label='Description'
							error={<ErrorMessage name='description' errors={errors} />}
						>
							<Input
								{...register('description')}
								placeholder='Expense description'
							/>
						</Input.Wrapper>

						<Space h={'sm'} />

						<Input.Wrapper
							label='Amount'
							error={<ErrorMessage name='amount' errors={errors} />}
						>
							<NumberInput
								onChange={(e) => setValue('amount', parseInt(e as string))}
								placeholder='Expense amount'
								value={watch('amount')}
							/>
						</Input.Wrapper>

						<Space h={'sm'} />

						<Button
							type='submit'
							loading={expenseCreating || expenseUpdating}
							fullWidth
						>
							Save
						</Button>
					</form>
				</div>
			</DrawerWrapper>
		</AdminLayout>
	);
};

export default protectWithSession(ExpenseList);

export interface IExpenseType {
	title: string;
	description?: string;
	amount: number;
}
