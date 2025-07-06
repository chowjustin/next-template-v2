"use client";

import { useMutation } from "@tanstack/react-query";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";
import UploadFile from "@/components/form/UploadFile";
import api from "@/lib/api";
import type { ApiError, ApiResponse } from "@/types/api";

type SandboxForm = {
	Test: string;
	image: File[];
};

type FileUploadResponse = {
	url: string;
	fileName: string;
};

export default function FormSandbox() {
	const methods = useForm<SandboxForm>();

	const { handleSubmit } = methods;

	const { mutate: handleImageUpload } = useMutation<
		ApiResponse<FileUploadResponse>,
		ApiError,
		globalThis.FormData
	>({
		mutationFn: async (data) => {
			const res = await api.post("/users/file", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("File uploaded!");
			return res.data;
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const onSubmit: SubmitHandler<SandboxForm> = (data) => {
		const formData = new FormData();

		if (data.image?.[0]) {
			formData.append("file", data.image[0]);
		}

		handleImageUpload(formData);
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-white">
			<div className="flex flex-col">
				<FormProvider {...methods}>
					<form
						className="w-[600px] flex flex-col gap-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Input id="Test" label="Username Tujuan" placeholder="Username" />
						<Input
							id="Test"
							label="Username Tujuan"
							placeholder="Username"
							readOnly
						/>
						<SelectInput
							id="sandbox1"
							label="Required SelectInput"
							options={options}
							placeholder="Pilih opsi"
							isSearchable={false}
							validation={{ required: "SelectInput wajib diisi!" }}
						/>
						<SelectInput
							id="sandbox2"
							label="Searchable SelectInput"
							options={options}
							placeholder="Pilih opsi"
						/>
						<div>
							<UploadFile
								label="Upload File"
								id="image"
								maxSize={2000000}
								accept={{
									"image/*": [".jpg", ".jpeg", ".png"],
									"application/pdf": [".pdf"],
								}}
								maxFiles={1}
								helperText="Format file .jpeg .jpg .png .pdf, maksimum 2 MB"
								validation={{ required: "This field is required" }}
							/>
						</div>
						<Button type="submit">Submit</Button>
					</form>
				</FormProvider>
			</div>
		</main>
	);
}

const options = [
	{ value: "1", label: "Satu" },
	{ value: "2", label: "Dua" },
	{ value: "3", label: "Tiga" },
	{ value: "4", label: "Empat" },
	{ value: "5", label: "Lima" },
];
