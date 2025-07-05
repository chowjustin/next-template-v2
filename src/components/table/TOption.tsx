"use client";

import * as React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import SelectInput from "@/components/form/SelectInput";

type TOptionProps = {
	placeholder?: string;
	value: string | number;
	onChange: (value: string | number) => void;
	title: string;
	options: { value: number | string; label: string }[];
};

function TOptionInternal({
	value,
	onChange,
	...props
}: Omit<TOptionProps, "value"> & { value: unknown }) {
	const formValue = useWatch({ name: "select" });

	React.useEffect(() => {
		if (formValue !== undefined && formValue !== value) {
			onChange(formValue);
		}
	}, [formValue, onChange, value]);

	return (
		<SelectInput
			id="select"
			label={null}
			isSearchable={false}
			isClearable={false}
			className="z-50"
			{...props}
		/>
	);
}

export default function TOption({ value, onChange, ...props }: TOptionProps) {
	const methods = useForm({
		defaultValues: {
			select: value,
		},
	});

	React.useEffect(() => {
		methods.setValue("select", value);
	}, [value, methods]);

	return (
		<FormProvider {...methods}>
			<div className="w-full md:w-auto">
				<p className="font-bold">{props.title}</p>
				<TOptionInternal {...props} value={value} onChange={onChange} />
			</div>
		</FormProvider>
	);
}
