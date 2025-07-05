"use client";

import { useMutation } from "@tanstack/react-query";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import UploadFile from "@/components/form/UploadFile";
import api from "@/lib/api";
import type { ApiError } from "@/types/api";

export default function FormSandbox() {
	const methods = useForm();

	const { handleSubmit } = methods;

	const { mutate: handleImageUpload } = useMutation<any, ApiError, FormData>({
		mutationFn: async (data) => {
			await api
				.post("/users/file", data, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					// const data = res.data.data;
					toast.success("File uploaded!");
					return res;
				});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const onSubmit: SubmitHandler<any> = (data) => {
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
