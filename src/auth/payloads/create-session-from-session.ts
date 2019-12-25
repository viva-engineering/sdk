
export type CreateSessionFromSessionRequest = void;

export interface CreateSessionFromSessionResponse {
	token: string;
	ttl: number;
}

export enum CreateSessionFromSessionErrorCodes {
	UnexpectedError = 'UNEXPECTED_ERROR'
}
