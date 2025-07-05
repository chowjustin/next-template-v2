export type LoginRequest = {
	username: string;
	password: string;
};

export type LoginResponse = {
	token: string;
	role: string;
};

export type LoginError = {
	error: string;
};
