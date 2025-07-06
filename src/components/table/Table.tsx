"use client";

import {
	type ColumnDef,
	getCoreRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type RowData,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { parseAsInteger, useQueryStates } from "nuqs";
import * as React from "react";

import Filter from "@/components/table/Filter";
import PaginationControl from "@/components/table/PaginationControl";
import TBody from "@/components/table/TBody";
import THead from "@/components/table/THead";
import TOption from "@/components/table/TOption";
import clsxm from "@/lib/clsxm";

export type ColumnMetaType = {
	apiField?: string;
};

// Extend the ColumnMeta interface from @tanstack/react-table
declare module "@tanstack/react-table" {
	// biome-ignore lint/correctness/noUnusedVariables: All declarations of 'ColumnMeta' must have identical type parameters.
	interface ColumnMeta<TData extends RowData, TValue> extends ColumnMetaType {}
}

type ApiIntegrationProps = {
	enabled: boolean;
	currentPage?: number;
	pageSize?: number;
	orderBy?: string;
	isAsc?: boolean;
	totalPages?: number;
};

type TableProps<T extends object> = {
	data: T[];
	columns: ColumnDef<T, unknown>[];
	footers?: React.ReactNode;
	extras?: React.ReactNode;
	leftExtras?: React.ReactNode;
	isLoading?: boolean;
	omitSort?: boolean;
	withFilter?: boolean;
	withEntries?: boolean;
	withPaginationControl?: boolean;
	withLink?: boolean;
	tableClassName?: string;
	onColumnVisibilityChange?: (visibility: VisibilityState) => void;
	columnToggle?: {
		enabled: boolean;
		title?: string;
		defaultVisibility?: VisibilityState;
		className?: string;
	};
	apiIntegration?: ApiIntegrationProps;
	onTableParamsChange?: (
		page: number,
		pageSize: number,
		orderBy?: string,
		isAsc?: boolean,
	) => void;
} & React.ComponentPropsWithoutRef<"div">;

export default function Table<T extends object>({
	className,
	columns,
	data,
	footers,
	extras,
	leftExtras,
	isLoading,
	omitSort = false,
	withFilter = false,
	withEntries = false,
	withPaginationControl = false,
	withLink = false,
	tableClassName,
	onColumnVisibilityChange,
	columnToggle = { enabled: false },
	apiIntegration = { enabled: false },
	onTableParamsChange,
	...rest
}: TableProps<T>) {
	const [globalFilter, setGlobalFilter] = React.useState("");
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [apiSortState, setApiSortState] = React.useState({
		column: apiIntegration.orderBy || "",
		isAsc: apiIntegration.isAsc !== undefined ? apiIntegration.isAsc : true,
	});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>(
			columnToggle.defaultVisibility ??
				Object.fromEntries(columns.map((col) => [col.id, true])),
		);

	const [pages, setPage] = useQueryStates(
		{
			page: parseAsInteger.withDefault(apiIntegration.currentPage || 1),
			size: parseAsInteger.withDefault(apiIntegration.pageSize || 10),
		},
		{
			throttleMs: 1000,
			shallow: false,
		},
	);

	React.useEffect(() => {
		if (apiIntegration.enabled && apiIntegration.orderBy) {
			const columnId = columns.findIndex(
				(col) => col.meta?.apiField === apiIntegration.orderBy,
			);

			if (columnId !== -1) {
				setSorting([
					{
						id: columns[columnId].id as string,
						desc: !apiIntegration.isAsc,
					},
				]);
			}
		}
	}, [apiIntegration, columns]);

	const table = useReactTable({
		data,
		columns,
		state: {
			globalFilter,
			sorting,
			columnVisibility,
			pagination: {
				pageIndex: pages.page - 1,
				pageSize: pages.size,
			},
		},
		meta: {
			isApiSorting: apiIntegration.enabled,
			apiSortState: apiSortState,
		},
		onGlobalFilterChange: setGlobalFilter,
		onSortingChange: (updatedSorting) => {
			// Get new sorting state
			let newSorting: SortingState;
			if (typeof updatedSorting === "function") {
				newSorting = updatedSorting(sorting);
			} else {
				newSorting = updatedSorting;
			}

			// Update local sorting state
			setSorting(newSorting);

			// Handle API sorting if enabled
			if (apiIntegration.enabled && onTableParamsChange) {
				const sortedColumn = newSorting.length > 0 ? newSorting[0] : null;

				if (sortedColumn) {
					// Find the column definition to get the apiField
					const columnDef = columns.find((col) => col.id === sortedColumn.id);
					const apiField = columnDef?.meta?.apiField || sortedColumn.id;

					// If clicking the same column that was already sorted
					if (apiSortState.column === apiField) {
						// Just invert the previous sort direction
						const newIsAsc = !apiSortState.isAsc;
						setApiSortState({ column: apiField, isAsc: newIsAsc });
						onTableParamsChange(pages.page, pages.size, apiField, newIsAsc);
					} else {
						// New column, start with ascending sort
						setApiSortState({ column: apiField, isAsc: true });
						onTableParamsChange(pages.page, pages.size, apiField, true);
					}
				} else {
					// No sort column, reset to default
					setApiSortState({ column: "", isAsc: true });
					onTableParamsChange(pages.page, pages.size);
				}
			}
		},
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: (updatedPagination) => {
			if (typeof updatedPagination === "function") {
				const newPagination = updatedPagination(table.getState().pagination);
				setPage({
					page: newPagination.pageIndex + 1,
					size: newPagination.pageSize,
				});

				// Handle API pagination if enabled
				if (apiIntegration.enabled && onTableParamsChange) {
					const sortedColumn = sorting[0];
					if (sortedColumn) {
						const columnDef = columns.find((col) => col.id === sortedColumn.id);
						const apiField = columnDef?.meta?.apiField || sortedColumn.id;
						onTableParamsChange(
							newPagination.pageIndex + 1,
							newPagination.pageSize,
							apiField,
							!sortedColumn.desc,
						);
					} else {
						onTableParamsChange(
							newPagination.pageIndex + 1,
							newPagination.pageSize,
						);
					}
				}
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: apiIntegration.enabled,
		manualSorting: apiIntegration.enabled,
	});

	React.useEffect(() => {
		if (!apiIntegration.enabled) {
			table.setPageIndex(pages.page - 1);
			table.setPageSize(pages.size);
		}
	}, [pages.page, pages.size, table, apiIntegration.enabled]);

	React.useEffect(() => {
		if (onColumnVisibilityChange) {
			onColumnVisibilityChange(columnVisibility);
		}
	}, [columnVisibility, onColumnVisibilityChange]);

	return (
		<div className={clsxm("flex flex-col", className)} {...rest}>
			<div className={`flex items-end justify-between gap-5 mb-2`}>
				<div className="flex items-start gap-2">
					{withFilter && <Filter table={table} />}
					{leftExtras && <>{leftExtras}</>}
				</div>

				<div className="flex items-end gap-4">
					{extras && <>{extras}</>}
					{withEntries && (
						<TOption
							value={table.getState().pagination.pageSize}
							onChange={(e) => {
								const newSize = Number(e);
								setPage({ page: 1, size: newSize });

								if (apiIntegration.enabled && onTableParamsChange) {
									const sortedColumn = sorting[0];
									if (sortedColumn) {
										const columnDef = columns.find(
											(col) => col.id === sortedColumn.id,
										);
										const apiField =
											columnDef?.meta?.apiField || sortedColumn.id;
										onTableParamsChange(
											1,
											newSize,
											apiField,
											!sortedColumn.desc,
										);
									} else {
										onTableParamsChange(pages.page, newSize);
									}
								} else {
									table.setPageSize(newSize);
								}
							}}
							title="Show"
							options={[
								{ value: 10, label: "10 entries" },
								{ value: 25, label: "25 entries" },
								{ value: 50, label: "50 entries" },
								{ value: 100, label: "100 entries" },
							]}
						/>
					)}
				</div>
			</div>
			<div className="-my-2 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8 px-2">
				<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div className="overflow-hidden shadow ring-8 ring-[#EBEBEB] rounded-md md:rounded-lg">
						<div
							className={`relative overflow-y-auto custom-scrollbar ${tableClassName}`}
						>
							<table className="min-w-full">
								<THead
									table={table}
									omitSort={omitSort}
									className="sticky top-0 z-10"
								/>
								<TBody
									table={table}
									isLoading={isLoading}
									withLink={withLink}
								/>
								{footers && (
									<tfoot className="bg-[#EBEBEB] sticky bottom-0 z-10">
										<tr>
											<td
												colSpan={columns.length}
												className="text-S2 pt-2 pl-2"
											>
												{footers}
											</td>
										</tr>
									</tfoot>
								)}
							</table>
						</div>
					</div>
				</div>
			</div>
			{withPaginationControl && (
				<PaginationControl
					table={table}
					data={data}
					setParams={setPage}
					className="mt-5"
					apiIntegration={{
						...apiIntegration,
						totalPages: apiIntegration.totalPages,
					}}
					onPageChange={(newPage) => {
						if (apiIntegration.enabled && onTableParamsChange) {
							const sortedColumn = sorting[0];
							if (sortedColumn) {
								const columnDef = columns.find(
									(col) => col.id === sortedColumn.id,
								);
								const apiField = columnDef?.meta?.apiField || sortedColumn.id;
								onTableParamsChange(
									newPage,
									pages.size,
									apiField,
									!sortedColumn.desc,
								);
							} else {
								onTableParamsChange(newPage, pages.size);
							}
						}
					}}
				/>
			)}
		</div>
	);
}
