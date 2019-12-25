
export interface CreateSessionFromPasswordRequest {
	username: string;
	password: string;
	elevated?: boolean;
}

export interface CreateSessionFromPasswordResponse {
	token: string;
	ttl: number;
}

export enum CreateSessionFromPasswordErrorCodes {
	AuthenticationFailed = 'AUTHENTICATION_FAILED',
	CredentialLocked = 'CREDENTIAL_LOCKED_FOR_RECENT_FAILURES',
	UnexpectedError = 'UNEXPECTED_ERROR'
}
