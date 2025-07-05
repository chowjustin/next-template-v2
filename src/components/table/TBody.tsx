"use client";

import {
	flexRender,
	type Row,
	type RowData,
	type Table,
} from "@tanstack/react-table";
import type * as React from "react";

import clsxm from "@/lib/clsxm";

interface Linkable {
	href?: string;
}

type TBodyProps<T extends RowData> = {
	table: Table<T>;
	isLoading?: boolean;
	withLink?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

export default function TBody<T extends RowData & Linkable>({
	className,
	isLoading,
	table,
	withLink = false,
	...rest
}: TBodyProps<T>) {
	const renderRow = (row: Row<T>) => {
		const rowContent = (
			<>
				{row.getVisibleCells().map((cell) => (
					<td
						key={cell.id}
						className="px-3 py-3 text-center"
						style={{
							maxWidth: cell.column.getSize(),
						}}
					>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</td>
				))}
			</>
		);

		if (withLink && "href" in row.original) {
			return (
				<tr
					key={row.id}
					className="rounded-lg hover:bg-gray-50 cursor-pointer"
					onClick={() => {
						const href = (row.original as { href: string }).href;
						window.location.href = href;
					}}
				>
					{rowContent}
				</tr>
			);
		}

		return (
			<tr key={row.id} className="rounded-lg">
				{rowContent}
			</tr>
		);
	};

	return (
		<tbody
			className={clsxm("divide-y-8 divide-[#EBEBEB] bg-white", className)}
			{...rest}
		>
			{isLoading ? (
				<tr>
					<td
						className="col-span-full truncate whitespace-nowrap px-3 py-3 text-center text-typo-main"
						colSpan={table.getAllColumns().length}
					>
						Loading...
					</td>
				</tr>
			) : table.getRowModel().rows.length === 0 ? (
				<tr>
					<td
						className="col-span-full truncate whitespace-nowrap px-3 py-3 text-center text-typo-main"
						colSpan={table.getAllColumns().length}
					>
						No Data
					</td>
				</tr>
			) : (
				table.getRowModel().rows.map((row) => renderRow(row))
			)}
		</tbody>
	);
}
