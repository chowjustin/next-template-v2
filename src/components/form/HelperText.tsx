import type { ReactNode } from "react";

import Typography from "@/components/Typography";
import clsxm from "@/lib/clsxm";

export default function HelperText({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className="flex space-x-1">
			<Typography
				as="p"
				font="Inter"
				weight="regular"
				className={clsxm("text-xs !leading-tight text-gray-900", className)}
			>
				{children}
			</Typography>
		</div>
	);
}
