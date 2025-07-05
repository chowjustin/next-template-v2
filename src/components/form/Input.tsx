import { Eye, EyeOff, type LucideProps } from "lucide-react";
import * as React from "react";
import { get, type RegisterOptions, useFormContext } from "react-hook-form";
import ErrorMessage from "@/components/form/ErrorMessage";
import HelperText from "@/components/form/HelperText";
import LabelText from "@/components/form/LabelText";
import clsxm from "@/lib/clsxm";

type LucideIconType = React.ComponentType<LucideProps>;

export type InputProps = {
	id: string;
	label?: string;
	helperText?: React.ReactNode;
	helperTextClassName?: string;
	hideError?: boolean;
	validation?: RegisterOptions;
	prefix?: string;
	suffix?: string;
	rightIcon?: LucideIconType;
	leftIcon?: LucideIconType;
	rightIconClassName?: string;
	leftIconClassName?: string;
	labelTextClasname?: string;
	errorMessageClassName?: string;
	"data-cy"?: string;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input({
	id,
	label,
	helperText,
	hideError = false,
	validation,
	prefix,
	suffix,
	className,
	type = "text",
	readOnly = false,
	rightIcon: RightIcon,
	leftIcon: LeftIcon,
	rightIconClassName,
	leftIconClassName,
	helperTextClassName,
	labelTextClasname,
	errorMessageClassName,
	"data-cy": dataCy,
	...rest
}: InputProps) {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const [showPassword, setShowPassword] = React.useState(false);
	const error = get(errors, id);

	return (
		<div className="w-full space-y-2">
			{label && (
				<LabelText
					required={!!validation?.required}
					labelTextClasname={labelTextClasname}
				>
					{label}
				</LabelText>
			)}

			<div className="relative flex w-full gap-0">
				<div
					className={clsxm(
						"pointer-events-none absolute h-full w-full rounded-md border-gray-300 ring-1 ring-inset ring-gray-500",
					)}
				/>

				{prefix && (
					<p className="flex w-min items-center rounded-l-md border-r bg-slate-50 px-3 text-sm text-gray-600">
						{prefix}
					</p>
				)}

				<div
					className={clsxm(
						"relative w-full rounded-md",
						prefix && "rounded-l-md",
						suffix && "rounded-r-md",
					)}
				>
					{LeftIcon && (
						<div
							className={clsxm(
								"absolute left-0 top-0 h-full",
								"flex items-center justify-center pl-2.5",
								"text-lg text-gray-900 md:text-xl",
								leftIconClassName,
							)}
						>
							<LeftIcon />
						</div>
					)}

					<input
						{...register(id, validation)}
						type={
							type === "password" ? (showPassword ? "text" : "password") : type
						}
						id={id}
						name={id}
						readOnly={readOnly}
						disabled={readOnly}
						className={clsxm(
							"h-full w-full rounded-md border border-gray-500 px-3 py-2.5 caret-gray-900",
							[LeftIcon && "pl-9", RightIcon && "pr-9"],
							"focus:outline-1 focus:outline-gray-900 focus:ring-inset",
							"text-sm",
							"hover:ring-1 hover:ring-inset hover:ring-gray-900 transition duration-300",
							"placeholder:text-sm placeholder:text-gray-500",
							"text-gray-900",
							readOnly && "cursor-not-allowed",
							error &&
								"border-none ring-2 ring-inset ring-red-500 placeholder:text-gray-500 focus:ring-red-500 bg-red-100",
							prefix && "rounded-l-none rounded-r-md ",
							suffix && "rounded-l-md rounded-r-none",
							prefix && suffix && "rounded-none",
							className,
						)}
						aria-describedby={id}
						data-cy={dataCy}
						{...rest}
					/>

					{RightIcon && type !== "password" && (
						<div
							className={clsxm(
								"absolute bottom-0 right-0 h-full",
								"flex items-center justify-center pr-2.5",
								"text-lg text-gray-900 md:text-xl",
								rightIconClassName,
							)}
						>
							<RightIcon />
						</div>
					)}

					{type === "password" && (
						<button
							type="button"
							className={clsxm(
								"absolute bottom-0 right-0 h-full",
								"flex items-center justify-center pr-3",
								"text-lg text-gray-900 md:text-xl cursor-pointer",
								rightIconClassName,
							)}
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <Eye /> : <EyeOff />}
						</button>
					)}
				</div>

				{suffix && (
					<p className="flex w-min items-center rounded-r-md border-l bg-slate-50 px-3 text-sm text-gray-600">
						{suffix}
					</p>
				)}
			</div>

			{!hideError && error && (
				<ErrorMessage className={errorMessageClassName}>
					{error.message}
				</ErrorMessage>
			)}
			{helperText && (
				<HelperText className={helperTextClassName}>{helperText}</HelperText>
			)}
		</div>
	);
}
