import { Montserrat, Poppins } from "next/font/google";
import type * as React from "react";
import clsxm from "@/lib/clsxm";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	style: ["normal", "italic"],
	variable: "--font-poppins",
});
const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	variable: "--font-montserrat",
});

enum FontVariant {
	Inter,
	Poppins,
	Montserrat,
}

enum FontWeight {
	thin,
	extralight,
	light,
	regular,
	medium,
	semibold,
	bold,
	extrabold,
	black,
}

type TypographyProps<T extends React.ElementType> = {
	as?: T;
	className?: string;
	weight?: keyof typeof FontWeight;
	font?: keyof typeof FontVariant;
	children: React.ReactNode;
	variant?: string;
};

export default function Typography<T extends React.ElementType>({
	as,
	children,
	weight = "regular",
	className,
	font = "Inter",
	...props
}: TypographyProps<T> &
	Omit<React.ComponentProps<T>, keyof TypographyProps<T>>) {
	const Component = as || "p";
	return (
		<Component
			className={clsxm(
				// *=============== Font Type ==================
				"text-black",
				[
					font === "Inter" && [
						"font-inter",
						[
							weight === "regular" && "font-normal",
							weight === "medium" && "font-medium",
							weight === "semibold" && "font-semibold",
							weight === "bold" && "font-bold",
						],
					],
				],
				[
					font === "Poppins" && [
						`${poppins.className}`,
						[
							weight === "extralight" && "font-extralight",
							weight === "light" && "font-light",
							weight === "medium" && "font-medium",
							weight === "semibold" && "font-semibold",
							weight === "bold" && "font-bold",
							weight === "extrabold" && "font-extrabold",
						],
					],
				],
				[
					font === "Montserrat" && [
						`${montserrat.className}`,
						[
							weight === "extralight" && "font-extralight",
							weight === "light" && "font-light",
							weight === "medium" && "font-medium",
							weight === "semibold" && "font-semibold",
							weight === "bold" && "font-bold",
							weight === "extrabold" && "font-extrabold",
						],
					],
				],
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	);
}
