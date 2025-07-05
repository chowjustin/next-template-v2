import * as React from "react";
import { get, type RegisterOptions, useFormContext } from "react-hook-form";
import clsxm from "@/lib/clsxm";
import ErrorMessage from "./ErrorMessage";
import HelperText from "./HelperText";
import LabelText from "./LabelText";

export type TextAreaProps = {
	id: string;
	label?: string;
	helperText?: string;
	hideError?: boolean;
	validation?: RegisterOptions;
	containerClassName?: string;
} & React.ComponentPropsWithoutRef<"textarea">;

export default function TextArea({
	id,
	label,
	helperText,
	hideError = false,
	validation,
	className,
	containerClassName,
	maxLength = 1000,
	readOnly = false,
	...rest
}: TextAreaProps) {
	const [value, setValue] = React.useState("");

	const {
		register,
		formState: { errors },
	} = useFormContext();

	const error = get(errors, id);
	const textArea = register(id, validation);

	const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
		textArea.onChange(e);
		setValue(e.currentTarget.value);
	};

	return (
		<div className={clsxm("w-full space-y-1.5", containerClassName)}>
			{label && (
				<LabelText required={!!validation?.required}>{label}</LabelText>
			)}

			<div className="relative">
				<textarea
					{...textArea}
					id={id}
					name={id}
					readOnly={readOnly}
					disabled={readOnly}
					maxLength={maxLength}
					onChange={handleChange}
					className={clsxm(
						"h-full w-full rounded-[15px] border border-[#E2E8F0] px-[20px] py-[15px] caret-[#4FD1C5]",
						"focus:outline-1 focus:outline-[#4FD1C5] focus:ring-inset",
						"text-sm focus:bg-slate-50",
						"hover:ring-1 hover:ring-inset hover:ring-[#4FD1C5]",
						"placeholder:text-sm placeholder:text-gray-500",
						"text-gray-900",
						readOnly &&
							"cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
						error &&
							"border-none ring-2 ring-inset ring-red-500 placeholder:text-gray-500 focus:ring-red-500",
						className,
					)}
					aria-describedby={id}
					{...rest}
				/>
				<p className="absolute bottom-2.5 right-6 text-xs">
					{value.length}/{maxLength}
				</p>
			</div>
			{helperText && <HelperText>{helperText}</HelperText>}
			{!hideError && error && (
				<ErrorMessage>{error.message?.toString()}</ErrorMessage>
			)}
		</div>
	);
}
