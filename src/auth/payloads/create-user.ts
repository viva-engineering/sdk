
export interface CreateUserRequest {
	username: string;
	password: string;
}

export type CreateUserResponse = void;

export enum CreateUserErrorCodes {
	UnexpectedError = 'UNEXPECTED_ERROR',
	UsernameAlreadyInUse = 'USERNAME_ALREADY_IN_USE'
}
