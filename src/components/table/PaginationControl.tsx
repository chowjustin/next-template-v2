import type { RowData, Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";
import Button from "@/components/button/Button";
import clsxm from "@/lib/clsxm";
import { buildPaginationControl } from "@/lib/pagination";

type PaginationState = {
	page: number;
	size: number;
};

type ApiIntegrationProps = {
	enabled: boolean;
	currentPage?: number;
	pageSize?: number;
	orderBy?: string;
	isAsc?: boolean;
	totalPages?: number; // Add this field for API total pages
};

type PaginationControlProps<T extends RowData> = {
	data: T[];
	table: Table<T>;
	setParams: React.Dispatch<React.SetStateAction<PaginationState>>;
	apiIntegration?: ApiIntegrationProps;
	onPageChange?: (page: number) => void;
} & React.ComponentPropsWithoutRef<"div">;

export default function PaginationControl<T extends RowData>({
	className,
	data,
	table,
	setParams,
	apiIntegration = { enabled: false },
	onPageChange,
	...rest
}: PaginationControlProps<T>) {
	// Get current page with fallback
	const currentPage =
		apiIntegration.enabled && apiIntegration.currentPage
			? apiIntegration.currentPage
			: (table?.getState()?.pagination?.pageIndex ?? 0) + 1;

	// Get page count based on API metadata or table data
	let pageCount = 1; // Default to 1

	if (apiIntegration.enabled && apiIntegration.totalPages !== undefined) {
		// Use API's total pages when available
		pageCount = apiIntegration.totalPages;
	} else {
		// For client-side pagination, use the table's page count
		pageCount = table?.getPageCount?.() || 1;
	}

	const paginationControl = buildPaginationControl(currentPage, pageCount);

	const handlePageControlClick = (page: string | number) => {
		if (page !== "...") {
			const pageNumber = page as number;

			if (apiIntegration.enabled && onPageChange) {
				onPageChange(pageNumber);
			} else if (table?.setPageIndex) {
				table.setPageIndex(pageNumber - 1);
			}
		}
	};

	return (
		<div
			className={clsxm(
				"flex items-center justify-between gap-x-2 md:justify-end",
				className,
			)}
			{...rest}
		>
			<div className="flex items-center gap-1">
				<Button
					className={clsxm(
						"flex min-w-[30px] justify-center rounded-md !border-none !p-2 !font-semibold",
					)}
					disabled={currentPage <= 1}
					onClick={() => {
						const newPage = currentPage - 1;
						setParams((params) => ({
							...params,
							page: newPage,
						}));

						if (apiIntegration.enabled && onPageChange) {
							onPageChange(newPage);
						} else if (table?.previousPage) {
							table.previousPage();
						}
					}}
				>
					<ChevronLeft size={20} />
				</Button>
				{paginationControl.map((pageIndex) => (
					<Button
						key={pageIndex}
						className={clsxm(
							"flex min-w-[38px] justify-center rounded-md border-2 border-primary-500 bg-white !p-2 !font-semibold text-primary-500 drop-shadow-sm hover:bg-primary-600",
							currentPage === pageIndex && "bg-primary-500 text-white",
						)}
						onClick={() => {
							const pageNumber = pageIndex as number;
							setParams((params) => ({
								...params,
								page: pageNumber,
							}));
							handlePageControlClick(pageIndex);
						}}
					>
						{pageIndex}
					</Button>
				))}
				<Button
					className={clsxm(
						"flex min-w-[30px] justify-center rounded-md !border-none !p-2 !font-semibold white drop-shadow-sm",
					)}
					disabled={currentPage >= pageCount}
					onClick={() => {
						const newPage = currentPage + 1;
						setParams((params) => ({
							...params,
							page: newPage,
						}));

						if (apiIntegration.enabled && onPageChange) {
							onPageChange(newPage);
						} else if (table?.nextPage) {
							table.nextPage();
						}
					}}
				>
					<ChevronRight size={20} />
				</Button>
			</div>
		</div>
	);
}
