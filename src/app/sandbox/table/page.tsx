"use client";
import type { ColumnDef } from "@tanstack/react-table";

import Table from "@/components/table/Table";

type Ttable = {
	id: string;
	nama_supplier: string;
	merk: string;
	discount: string;
	href: string;
};

export default function TableTest() {
	return (
		<div className="flex h-full min-h-screen w-full flex-col items-center bg-white justify-center overflow-hidden">
			<Table
				className="text-black w-3/4"
				data={data}
				columns={columns}
				withFilter
				withEntries
				withPaginationControl
				withLink
			/>
		</div>
	);
}

const columns: ColumnDef<Ttable>[] = [
	{
		accessorKey: "id",
		header: "No",
		cell: (props) => <span>{`${props.getValue()}`}</span>,
	},
	{
		accessorKey: "nama_supplier",
		header: "Nama Supplier",
		cell: (props) => <span>{`${props.getValue()}`}</span>,
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "merk",
		header: "Merk",
		cell: (props) => <span>{`${props.getValue()}`}</span>,
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "discount",
		header: "Diskon",
		cell: (props) => <span>{`${props.getValue()}`}</span>,
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
];

const data: Ttable[] = [
	{
		id: "1",
		nama_supplier: "PT. Sumber Makmur",
		merk: "IndoTools",
		discount: "10%",
		href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	},
	{
		id: "2",
		nama_supplier: "CV. Pangan Sejahtera",
		merk: "FreshGro",
		discount: "15%",
		href: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
	},
	{
		id: "3",
		nama_supplier: "UD. Elektronik Jaya",
		merk: "TechNova",
		discount: "20%",
		href: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
	},
	{
		id: "4",
		nama_supplier: "PT. Kimia Abadi",
		merk: "CleanPro",
		discount: "5%",
		href: "https://www.youtube.com/watch?v=l9nh1l8ZIJQ",
	},
	{
		id: "5",
		nama_supplier: "CV. Bangunan Sentosa",
		merk: "ConstructIt",
		discount: "12%",
		href: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
	},
	{
		id: "1",
		nama_supplier: "PT. Sumber Makmur",
		merk: "IndoTools",
		discount: "10%",
		href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	},
	{
		id: "2",
		nama_supplier: "CV. Pangan Sejahtera",
		merk: "FreshGro",
		discount: "15%",
		href: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
	},
	{
		id: "3",
		nama_supplier: "UD. Elektronik Jaya",
		merk: "TechNova",
		discount: "20%",
		href: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
	},
	{
		id: "4",
		nama_supplier: "PT. Kimia Abadi",
		merk: "CleanPro",
		discount: "5%",
		href: "https://www.youtube.com/watch?v=l9nh1l8ZIJQ",
	},
	{
		id: "5",
		nama_supplier: "CV. Bangunan Sentosa",
		merk: "ConstructIt",
		discount: "12%",
		href: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
	},
	{
		id: "1",
		nama_supplier: "PT. Sumber Makmur",
		merk: "IndoTools",
		discount: "10%",
		href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	},
	{
		id: "2",
		nama_supplier: "CV. Pangan Sejahtera",
		merk: "FreshGro",
		discount: "15%",
		href: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
	},
	{
		id: "3",
		nama_supplier: "UD. Elektronik Jaya",
		merk: "TechNova",
		discount: "20%",
		href: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
	},
	{
		id: "4",
		nama_supplier: "PT. Kimia Abadi",
		merk: "CleanPro",
		discount: "5%",
		href: "https://www.youtube.com/watch?v=l9nh1l8ZIJQ",
	},
	{
		id: "5",
		nama_supplier: "CV. Bangunan Sentosa",
		merk: "ConstructIt",
		discount: "12%",
		href: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
	},
];
