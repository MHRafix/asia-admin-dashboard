import {
	CommonFindDocumentDto,
	MatchOperator,
	SortType,
} from '@/app/config/gql';
import { ActionIcon, Button, Flex, Loader } from '@mantine/core';
import { IconDownload, IconRefresh } from '@tabler/icons-react';
import cls from 'classnames';
import { mkConfig } from 'export-to-csv';
import {
	MRT_ColumnDef,
	MRT_GlobalFilterTextInput,
	MRT_ShowHideColumnsButton,
	MantineReactTable,
	useMantineReactTable,
} from 'mantine-react-table';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

interface Prop {
	columns: MRT_ColumnDef<any>[];
	data: any[];
	where?: CommonFindDocumentDto[];
	refetch: (v: any) => void;
	totalCount: number;
	loading: boolean;
	isExportPDF?: boolean;
	ActionArea?: React.ReactNode;
	RowActionMenu?: (row: any) => React.ReactNode;
}

const csvConfig = mkConfig({
	fieldSeparator: ',',
	decimalSeparator: '.',
	useKeysAsHeaders: true,
});

const DataTable: React.FC<Prop> = ({
	columns,
	loading,
	isExportPDF = false,
	data,
	where = [],
	refetch,
	ActionArea,
	RowActionMenu,
	totalCount,
}) => {
	const { pathname } = useRouter();
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 100,
	});
	const [sorting, setSorting] = useState<any[]>([]);
	const [columnFilters, setColumnFilters] = useState<any[]>([]);
	const input = {
		page: pagination.pageIndex + 1,
		limit: pagination.pageSize,
		sortBy: sorting[0]?.id ? 'id' : '_id',
		sort: sorting[0]?.desc ? SortType.Asc : SortType.Desc,
		where: [
			...where,
			...columnFilters.map((f: any) => ({
				key: f.id,
				operator: MatchOperator.Contains,
				value: f.value,
			})),
		],
	};

	useEffect(() => {
		refetch({ input });
	}, [pagination.pageIndex, pagination.pageSize, sorting, columnFilters]);

	// const exportCSV = () => {
	// 	const csv = generateCsv(csvConfig)(data);
	// 	downloadCsvFile(csvConfig)(csv);
	// };

	// const handleExportRows = (rows: MRT_Row<IAttendance>[]) => {
	// 	const doc = new jsPDF();
	// 	const tableData = rows.map((row) => Object.values(row.original));
	// 	const tableHeaders = columns.map((c) => c.header);

	// 	autoTable(doc, {
	// 		head: [tableHeaders],
	// 		body: tableData,
	// 	});

	// 	doc.save('mrt-pdf-example.pdf');
	// };

	const table = useMantineReactTable({
		columns,
		data,
		columnFilterDisplayMode: 'popover',

		state: {
			// showProgressBars: loading,
			pagination,
			sorting,
		},
		rowCount: totalCount,

		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,

		enableRowSelection: false,
		enableColumnOrdering: false,
		enableGlobalFilter: true,
		enableRowNumbers: true,

		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,

		paginationDisplayMode: 'pages',
		initialState: {
			showGlobalFilter: true,
			showColumnFilters: true,
			density: 'xs',
		},
		enableRowActions: RowActionMenu ? true : false,
		positionActionsColumn: 'last',
		renderRowActionMenuItems: (_row) => RowActionMenu?.(_row?.row?.original),
		renderTopToolbar: () => {
			return (
				<div className='flex justify-between p-2'>
					<div className='flex items-center gap-1'>
						<MRT_GlobalFilterTextInput table={table} />
						<MRT_ShowHideColumnsButton table={table} />
						{/* <MRT_ToggleFullScreenButton table={table} /> */}
					</div>

					<Flex gap={'md'} align={'center'}>
						{loading ? (
							<Loader size={'md'} color='teal' />
						) : (
							<ActionIcon
								onClick={() => refetch({ where })}
								variant='outline'
								radius={100}
								size={'lg'}
							>
								<IconRefresh
									className={cls({ 'animate-reverse-spin': loading })}
								/>
							</ActionIcon>
						)}
						{isExportPDF && (
							<ReactToPrint
								content={reactToPrintContent}
								documentTitle={pathname}
								// onAfterPrint={handleAfterPrint}
								removeAfterPrint
								trigger={reactToPrintTrigger}
							/>
						)}
						{ActionArea}
					</Flex>
				</div>
			);
		},
	});
	const componentRef = useRef(null);

	const reactToPrintContent = React.useCallback(() => {
		return componentRef.current;
	}, [componentRef.current]);

	const reactToPrintTrigger = React.useCallback(() => {
		return (
			<Button color='teal' leftIcon={<IconDownload />}>
				Print or Save PDF
			</Button>
		);
	}, []);

	return (
		<>
			<div ref={componentRef}>
				<MantineReactTable table={table} />
			</div>
		</>
	);
};

export default DataTable;
