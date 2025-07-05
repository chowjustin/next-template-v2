import { X } from "lucide-react";
import * as React from "react";
import Button from "@/components/button/Button";
import HelperText from "@/components/form/HelperText";
import LightboxModal from "@/components/LightboxModal";
import clsxm from "@/lib/clsxm";
import type { FileWithPreview } from "@/types/dropzone";

type FilePreviewProps = {
	file: FileWithPreview;
	deleteFile?: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		file: FileWithPreview,
	) => void;
	readOnly?: boolean;
	isLoading?: boolean;
};

export default function FilePreview({
	file,
	deleteFile,
	readOnly,
	isLoading,
}: FilePreviewProps) {
	const [isLightboxOpen, setIsLightboxOpen] = React.useState<boolean>(false);

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		deleteFile?.(e, file);
	};

	const fileSizeInBytes = file.size;
	const fileSizeInKB = fileSizeInBytes / 1024;
	const fileSizeInMB = fileSizeInKB / 1024;

	const isImage = file.type.startsWith("image/");
	const canShowPreview = isImage && file.preview;

	return (
		<>
			<li
				key={file.name}
				className={clsxm(
					"w-full rounded-md bg-typo-white border border-gray-500",
					"flex items-center justify-between gap-2 px-3 py-2 ",
					"border border-gray-900 text-gray-900 text-sm",
					canShowPreview && "cursor-pointer",
				)}
				onClick={canShowPreview ? () => setIsLightboxOpen(true) : undefined}
				data-testid="file-preview"
				data-cy="file-preview"
			>
				{isLoading ? (
					<p className="py-2">Mengunggah Data ...</p>
				) : (
					<>
						<div className="flex items-center gap-3">
							{canShowPreview && (
								<div className="h-10 w-10 rounded overflow-hidden flex-shrink-0 cursor-pointer">
									{/** biome-ignore lint/performance/noImgElement: exception for this one */}
									<img
										src={file.preview}
										alt={file.name}
										className="h-full w-full object-cover"
									/>
								</div>
							)}

							{!canShowPreview && (
								<div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
									<span className="text-xs font-medium">
										{file.type.split("/")[1]?.toUpperCase().substring(0, 4) ||
											"FILE"}
									</span>
								</div>
							)}

							<div className="flex flex-row gap-1 ">
								{file.name.length > 29
									? `${file.name.slice(0, 29)}...`
									: file.name}
								{"("}
								{fileSizeInMB.toFixed(2)}mb{")"}
							</div>
						</div>

						{!readOnly && (
							<Button onClick={handleDelete} size="sm" variant="ghost">
								<X />
							</Button>
						)}
					</>
				)}
			</li>
			{canShowPreview && (
				<LightboxModal
					images={[file.preview]}
					open={isLightboxOpen}
					onClose={() => setIsLightboxOpen(false)}
				/>
			)}
			{!readOnly && <HelperText>File {file.name} berhasil diunggah</HelperText>}
		</>
	);
}
