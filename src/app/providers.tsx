"use client";

import {
	QueryClient,
	QueryClientProvider,
	type QueryOptions,
} from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";

import api from "@/lib/api";

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
	const { data } = await api.get(`${queryKey?.[0]}`);
	return data;
};
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: defaultQueryFn,
		},
	},
});

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		// biome-ignore lint/complexity/noUselessFragments: Prevent unvalid react child if modules are removed
		<>
			<QueryClientProvider client={queryClient}>
				<Toaster position="top-center" />
				<NuqsAdapter>{children}</NuqsAdapter>
			</QueryClientProvider>
		</>
	);
}
