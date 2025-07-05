import axios, { type AxiosError } from "axios";
import type { GetServerSidePropsContext } from "next/types";
import Cookies from "universal-cookie";

import { getToken } from "@/lib/cookies";
import type { UninterceptedApiError } from "@/types/api";

const context = <GetServerSidePropsContext>{};

export const baseURL =
	process.env.NEXT_PUBLIC_RUN_MODE === "development"
		? process.env.NEXT_PUBLIC_API_URL_DEV
		: process.env.NEXT_PUBLIC_API_URL_PROD;

export const api = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},

	withCredentials: true,
});

api.defaults.withCredentials = true;
const isBrowser = typeof window !== "undefined";

api.interceptors.request.use((config) => {
	if (config.headers) {
		let token: string | undefined;

		if (!isBrowser) {
			if (!context)
				throw "Api Context not found. You must call `setApiContext(context)` before calling api on server-side";

			const cookies = new Cookies(context.req?.headers.cookie);
			token = cookies.get("@sch/token");
		} else {
			token = getToken();
		}

		config.headers.Authorization = token ? `Bearer ${token}` : "";
	}

	return config;
});

api.interceptors.response.use(
	(config) => {
		return config;
	},
	(error: AxiosError<UninterceptedApiError>) => {
		// parse error
		if (error.response?.data.message) {
			return Promise.reject({
				...error,
				response: {
					...error.response,
					data: {
						...error.response.data,
						message:
							typeof error.response.data.message === "string"
								? error.response.data.message
								: Object.values(error.response.data.message)[0][0],
					},
				},
			});
		}
		return Promise.reject(error);
	},
);
export default api;
