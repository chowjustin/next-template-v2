import Cookies from "universal-cookie";

// !CHANGETHIS

const cookies = new Cookies();

export const getToken = (): string => cookies.get("@example/token");

export const setToken = (token: string) => {
	cookies.set("@example/token", token, { path: "/" });
};

export const removeToken = () =>
	cookies.remove("@example/token", { path: "/" });
