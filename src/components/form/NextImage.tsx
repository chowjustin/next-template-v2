"use client";

import Image, { type ImageProps } from "next/image";
import * as React from "react";

import clsxm from "@/lib/clsxm";

type NextImageProps = {
	useSkeleton?: boolean;
	imgClassName?: string;
	serverStaticImg?: boolean;
	blurClassName?: string;
	alt: string;
	width: string | number;
} & (
	| { width: string | number; height: string | number }
	| { layout: "fill"; width?: string | number; height?: string | number }
) &
	ImageProps;

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function NextImage({
	useSkeleton = false,
	serverStaticImg = false,
	src,
	width,
	height,
	alt,
	className,
	imgClassName,
	blurClassName,
	...rest
}: NextImageProps) {
	const [status, setStatus] = React.useState(
		useSkeleton ? "loading" : "complete",
	);
	const widthIsSet = className?.includes("w-") ?? false;

	return (
		<figure
			style={!widthIsSet ? { width: `${width}px` } : undefined}
			className={className}
		>
			<Image
				className={clsxm(
					imgClassName,
					status === "loading" &&
						clsxm("animate-pulse bg-red-50", blurClassName),
				)}
				src={serverStaticImg ? src : `/images${src}`}
				width={width}
				height={height}
				alt={alt}
				onLoad={() => setStatus("complete")}
				{...rest}
			/>
		</figure>
	);
}
