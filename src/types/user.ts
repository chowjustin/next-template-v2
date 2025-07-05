export type User = {
	id: string;
	name: string;
	username: string;
	email: string;
	role: string;
	created_at: string;
	updated_at: string;
};

export type CreateUserRequest = {
	id: string;
	name: string;
	email: string;
	username: string;
	password: string;
	role: string;
};

export type UpdateUserRequest = {
	id?: string;
	name?: string;
	email?: string;
	username?: string;
	password?: string;
	role?: string;
};

export type WithToken = {
	token: string;
};
