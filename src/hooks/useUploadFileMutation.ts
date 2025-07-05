import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "@/lib/api";

export const useUploadFileMutation = (id: string, label?: string) => {
	const saveFileToSessionStorage = (file: File) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			const dataUrl = e.target?.result as string;

			const fileData = {
				name: file.name,
				size: file.size,
				type: file.type,
				preview: dataUrl,
				label: label || id,
			};

			sessionStorage.setItem(`file_${id}`, JSON.stringify(fileData));
		};

		reader.readAsDataURL(file);
	};

	return useMutation({
		mutationFn: async (file: File) => {
			const formData = new FormData();
			formData.append("file_type", id);
			formData.append("file", file);

			return await api.post("/api/upload_file", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
		},
		onSuccess: (_response, uploadedFile) => {
			saveFileToSessionStorage(uploadedFile);
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};
