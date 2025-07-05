import { Loader, type LucideIcon } from "lucide-react";
import * as React from "react";

import clsxm from "@/lib/clsxm";

const ButtonVariant = [
	"primary",
	"blue",
	"green",
	"yellow",
	"red",
	"outline",
	"ghost",
] as const;
const ButtonSize = ["sm", "base", "lg"] as const;

type ButtonProps = {
	isLoading?: boolean;
	variant?: (typeof ButtonVariant)[number];
	size?: (typeof ButtonSize)[number];
	leftIcon?: LucideIcon;
	rightIcon?: LucideIcon;
	leftIconClassName?: string;
	rightIconClassName?: string;
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			disabled: buttonDisabled,
			isLoading,
			variant = "primary",
			size = "base",
			leftIcon: LeftIcon,
			rightIcon: RightIcon,
			leftIconClassName,
			rightIconClassName,
			...rest
		},
		ref,
	) => {
		const disabled = isLoading || buttonDisabled;

		return (
			<button
				ref={ref}
				type="button"
				disabled={disabled}
				className={clsxm(
					"inline-flex items-center cursor-pointer justify-center rounded-lg font-medium",
					"focus:outline-none focus-visible:ring",
					"shadow-sm",
					"transition-colors duration-75",
					//#region  //*=========== Size ===========
					[
						size === "lg" && [
							"min-h-[2.5rem] px-3.5 md:min-h-[2.75rem]",
							"text-base",
						],
						size === "base" && [
							"min-h-[2rem] px-3 md:min-h-[2.25rem]",
							"text-sm md:text-base",
						],
						size === "sm" && [
							"min-h-[1.5rem] px-2 md:min-h-[1.75rem]",
							"text-xs md:text-sm",
						],
					],
					//#endregion  //*======== Size ===========
					//#region  //*=========== Variants ===========
					[
						variant === "primary" && [
							"bg-primary-500 text-white",
							"border border-primary-600",
							"hover:bg-primary-600 hover:text-white",
							"active:bg-primary-700",
							"focus-visible:ring-primary-400",
						],
						variant === "blue" && [
							"bg-blue-500 text-white",
							"border border-blue-600",
							"hover:bg-blue-600 hover:text-white",
							"active:bg-blue-700",
							"focus-visible:ring-blue-400",
						],
						variant === "green" && [
							"bg-green-500 text-white",
							"border border-green-600",
							"hover:bg-green-600 hover:text-white",
							"active:bg-green-700",
							"focus-visible:ring-green-400",
						],
						variant === "red" && [
							"bg-red-500 text-white",
							"border border-red-600",
							"hover:bg-red-600 hover:text-white",
							"active:bg-red-700",
							"focus-visible:ring-red-400",
						],
						variant === "yellow" && [
							"bg-yellow-500 text-white",
							"border border-yellow-500",
							"hover:bg-yellow-600 hover:text-white",
							"active:bg-yellow-700",
							"focus-visible:ring-yellow-400",
						],
						variant === "outline" && [
							"text-black",
							"border border-gray-300",
							"hover:bg-slate-200 focus-visible:ring-gray-400 active:bg-slate-500 disabled:bg-slate-500",
						],
						variant === "ghost" && [
							"text-neutral-500",
							"shadow-none",
							"hover:bg-neutral-50 focus-visible:ring-neutral-400 active:bg-neutral-100 disabled:bg-neutral-100",
						],
					],
					//#endregion  //*======== Variants ===========
					"disabled:cursor-not-allowed disabled:opacity-60",
					isLoading &&
						"relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
					className,
				)}
				{...rest}
			>
				{isLoading && (
					<div
						className={clsxm(
							"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
							{
								"text-white": [
									"primary",
									"blue",
									"green",
									"red",
									"yellow",
								].includes(variant),
								"text-gray-900": ["outline", "ghost"].includes(variant),
							},
						)}
					>
						<Loader size={18} className="animate-spin" />
					</div>
				)}
				{LeftIcon && (
					<div
						className={clsxm([
							size === "lg" && "mr-3",
							size === "base" && "mr-2",
							size === "sm" && "mr-1",
						])}
					>
						<LeftIcon
							size="1em"
							className={clsxm("text-base", leftIconClassName)}
						/>
					</div>
				)}
				{children}
				{RightIcon && (
					<div
						className={clsxm([
							size === "lg" && "ml-3",
							size === "base" && "ml-2",
							size === "sm" && "ml-1",
						])}
					>
						<RightIcon
							size="1em"
							className={clsxm("text-base", rightIconClassName)}
						/>
					</div>
				)}
			</button>
		);
	},
);

export default Button;
