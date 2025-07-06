"use client";
import { flexRender, type RowData, type Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import type * as React from "react";
import type { ColumnMetaType } from "@/components/table/Table";
import clsxm from "@/lib/clsxm";

type THeadProps<T extends RowData> = {
	omitSort: boolean;
	table: Table<T>;
} & React.ComponentPropsWithoutRef<"thead">;

// Extend the TableMeta interface from @tanstack/react-table
declare module "@tanstack/react-table" {
	// biome-ignore lint/correctness/noUnusedVariables: All declarations of 'TableMeta' must have identical type parameters.
	interface TableMeta<TData extends RowData> {
		isApiSorting?: boolean;
		apiSortState?: {
			column: string;
			isAsc: boolean;
		};
	}
}

export default function THead<T extends RowData>({
	className,
	omitSort,
	table,
	...rest
}: THeadProps<T>) {
	const isApiIntegrated = table.options.meta?.isApiSorting === true;
	const apiSortState = table.options.meta?.apiSortState;

	return (
		<thead
			className={clsxm("bg-[#EBEBEB] text-[#000000]", className)}
			{...rest}
		>
			{table.getHeaderGroups().map((headerGroup) => (
				<tr key={headerGroup.id}>
					{headerGroup.headers.map((header) => {
						// Get the current sorting state from the column
						const isSorted = header.column.getIsSorted();

						// Check if this column is sorted in API mode
						const apiField =
							(header.column.columnDef.meta as ColumnMetaType)?.apiField ||
							header.id;
						const isApiSorted =
							isApiIntegrated &&
							apiSortState &&
							apiField === apiSortState.column;

						// Determine the effective sort direction to display
						const effectiveSortDirection = isApiSorted
							? apiSortState.isAsc
								? "asc"
								: "desc"
							: isSorted || undefined;

						return (
							<th
								key={header.id}
								scope="col"
								className={clsxm(
									"group py-1 pr-3 text-center text-sm font-semibold sm:text-base",
									!omitSort && header.column.getCanSort()
										? "pl-0"
										: "pl-[30px]",
								)}
							>
								{header.isPlaceholder ? null : (
									<button
										type="button"
										className={clsxm(
											"relative mx-auto flex items-center justify-center gap-2 pb-1",
											!omitSort && header.column.getCanSort()
												? "cursor-pointer select-none"
												: "",
										)}
										onClick={
											omitSort
												? () => null
												: (e) => {
														// Ensure event is passed and not stopped
														header.column.getToggleSortingHandler()?.(e);
													}
										}
									>
										{!omitSort &&
											header.column.getCanSort() &&
											(!effectiveSortDirection ? (
												<ChevronDown className="w-3 rotate-180 fill-transparent group-hover:fill-black" />
											) : effectiveSortDirection === "asc" ? (
												<ChevronDown className="w-3 rotate-180 fill-black" />
											) : (
												<ChevronDown className="w-3 fill-black" />
											))}
										<p className="text-[#000000]">
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</p>
									</button>
								)}
							</th>
						);
					})}
				</tr>
			))}
		</thead>
	);
}
