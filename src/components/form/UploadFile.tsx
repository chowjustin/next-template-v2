"use client";

import { CircleArrowUp } from "lucide-react";
import * as React from "react";
import { type Accept, type FileRejection, useDropzone } from "react-dropzone";
import {
	Controller,
	get,
	type RegisterOptions,
	useFormContext,
} from "react-hook-form";
import ErrorMessage from "@/components/form/ErrorMessage";
import FilePreview from "@/components/form/FilePreview";
import HelperText from "@/components/form/HelperText";
import LabelText from "@/components/form/LabelText";
import { useUploadFileMutation } from "@/hooks/useUploadFileMutation";
import clsxm from "@/lib/clsxm";
import type { FileWithPreview } from "@/types/dropzone";

export type UploadFileProps = {
	id: string;
	label?: string;
	helperText?: string;
	hideError?: boolean;
	validation?: RegisterOptions;
	accept?: Accept;
	maxFiles?: number;
	disabled?: boolean;
	maxSize?: number;
	className?: string;
	uploadToApi?: boolean;
	onFileUpload?: (files: FileWithPreview[]) => void;
};

export default function UploadFile({
	id,
	label,
	helperText,
	hideError = false,
	validation,
	accept = {
		"image/*": [".jpg", ".jpeg", ".png"],
		"application/pdf": [".pdf"],
	},
	maxFiles = 1,
	maxSize = 600 * 1024,
	className,
	disabled = false,
	uploadToApi = false,
	onFileUpload,
}: UploadFileProps) {
	const {
		control,
		setValue,
		setError,
		clearErrors,
		formState: { errors },
	} = useFormContext();

	const error = get(errors, id);

	const dropzoneRef = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		if (error) {
			dropzoneRef.current?.focus();
		}
	}, [error]);

	const [files, setFiles] = React.useState<FileWithPreview[]>([]);

	const uploadMutation = useUploadFileMutation(id, label);
	const uploadFile = uploadMutation.mutate;
	const isPending = uploadToApi ? uploadMutation.isPending : false;

	React.useEffect(() => {
		if (!uploadToApi) return;

		const storageKey = `file_${id}`;
		const storedFileData = sessionStorage.getItem(storageKey);

		if (storedFileData) {
			try {
				const fileData = JSON.parse(storedFileData);

				const displayFile = {
					name: fileData.name,
					size: fileData.size,
					type: fileData.type,
					preview: fileData.preview,
				} as FileWithPreview;

				setFiles([displayFile]);
				setValue(id, [displayFile]);
			} catch (_error) {
				sessionStorage.removeItem(storageKey);
			}
		}
	}, [id, setValue, uploadToApi]);

	const onDrop = React.useCallback(
		<T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
			if (rejectedFiles.length > 0) {
				setError(id, {
					type: "manual",
					message:
						rejectedFiles[0].errors[0].code === "file-too-large"
							? `File cannot exceed ${maxSize / 1024} KB`
							: "Unsupported file type",
				});
				return;
			}

			const acceptedFilesPreview = acceptedFiles.map((file: T) =>
				Object.assign(file, { preview: URL.createObjectURL(file) }),
			);

			setFiles(acceptedFilesPreview.slice(0, maxFiles));
			setValue(id, acceptedFilesPreview.slice(0, maxFiles));
			clearErrors(id);

			if (uploadToApi && acceptedFiles.length > 0) {
				uploadFile(acceptedFiles[0]);
			}

			if (onFileUpload) {
				onFileUpload(
					acceptedFilesPreview.slice(0, maxFiles) as FileWithPreview[],
				);
			}
		},
		[
			clearErrors,
			id,
			maxFiles,
			maxSize,
			setError,
			setValue,
			uploadFile,
			uploadToApi,
			onFileUpload,
		],
	);

	const onDelete = (index: number) => {
		const fileToDelete = files[index];

		if (uploadToApi) {
			const storageKey = `file_${id}`;
			sessionStorage.removeItem(storageKey);
		}

		URL.revokeObjectURL(fileToDelete.preview);

		const updatedFiles = files.filter((_, i) => i !== index);
		setFiles(updatedFiles);
		setValue(id, updatedFiles);
	};

	React.useEffect(() => {
		return () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		};
	}, [files]);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept,
		maxFiles,
		maxSize,
		disabled,
	});
	return (
		<div className="w-full space-y-1.5 rounded-md" data-cy={`upload-${id}`}>
			{label && (
				<LabelText required={!!validation?.required}>{label}</LabelText>
			)}

			{files.length < maxFiles && (
				<Controller
					control={control}
					name={id}
					rules={validation}
					render={({ field: { onChange } }) => (
						<div
							ref={dropzoneRef}
							className="group focus:outline-none"
							{...getRootProps()}
						>
							<input
								{...getInputProps({
									onChange: (e) => {
										onChange(e.target.files);
									},
								})}
								data-cy={`upload-${id}-input`}
							/>
							<div
								className={clsxm(
									"w-full cursor-pointer rounded-md bg-typo-white border border-gray-500",
									"flex flex-col items-center space-y-[6px]",
									"border border-gray-900 text-gray-900 text-sm",
									"hover:ring-1 hover:ring-inset hover:ring-gray-900 transition duration-300",
									error
										? "border-none ring-2 ring-inset ring-red-500 placeholder:text-gray-500 focus:ring-red-500 bg-red-100"
										: "group-hover:border-typo-main group-focus:border-typo-main",
									disabled && "cursor-not-allowed opacity-50",
									className,
								)}
							>
								<div className="rounded-xl px-4 py-3">
									<p className="text-center font-semibold text-gray-900 flex items-center gap-2">
										<CircleArrowUp /> Unggah Berkas
									</p>
								</div>
							</div>
						</div>
					)}
				/>
			)}

			{files.length > 0 &&
				files.map((file, index) => (
					<FilePreview
						key={file.name}
						file={file}
						isLoading={uploadToApi ? isPending : false}
						deleteFile={() => onDelete(index)}
					/>
				))}

			{!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
			{!error && helperText && files.length <= 0 && (
				<HelperText>{helperText}</HelperText>
			)}
		</div>
	);
}
