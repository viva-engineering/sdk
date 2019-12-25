
import { logger } from '../logger';
import { Service } from '../service';
import { ApiError } from '../errors';
import { defaultHostname } from '../constants';
import { HttpResponse } from '@viva-eng/http-client';
import { CreateUserRequest, CreateUserResponse, CreateUserErrorCodes } from './payloads/create-user';
import { CreateSessionFromPasswordRequest, CreateSessionFromPasswordResponse, CreateSessionFromPasswordErrorCodes } from './payloads/create-session-from-password';
import { CreateSessionFromSessionResponse, CreateSessionFromSessionErrorCodes } from './payloads/create-session-from-session';

export interface AuthClientParams {
	hostname?: string;
	ssl?: boolean;
}

/**
 * Client for connecting to the Viva auth APIs.
 */
export class AuthClient extends Service {
	constructor(params?: AuthClientParams) {
		super({
			hostname: params?.hostname ?? defaultHostname,
			ssl: params?.ssl ?? true,
			basePath: '/auth-service'
		});
	}

	/**
	 * Creates a new user account, identified by the given username and password
	 *
	 * @param username The username to assign to the new account
	 * @param password The password to assign to the new account
	 */
	public async createUser(username: string, password: string) {
		const payload: CreateUserRequest = {
			username,
			password
		};

		const response = await this.post<CreateUserResponse>('/user', {
			body: JSON.stringify(payload)
		});

		if (response.status !== 201) {
			throw new ApiError<CreateUserErrorCodes>(response as any);
		}
	}

	/**
	 * Creates a new session, using username / password credentials
	 *
	 * @param username The username to authenticate with
	 * @param password The password to authenticate with
	 * @param elevated Should the session be created with elevated permissions?
	 */
	public async createSessionFromPassword(username: string, password: string, elevated?: boolean) {
		const payload: CreateSessionFromPasswordRequest = {
			username,
			password,
			elevated
		};

		const response = await this.post<CreateSessionFromPasswordResponse>('/session/from-password', {
			body: JSON.stringify(payload)
		});

		if (response.status !== 201) {
			throw new ApiError<CreateSessionFromPasswordErrorCodes>(response as any);
		}

		return response.body.json;
	}

	/**
	 * Creates a new session, using an existing, active session as credentials (ie. refreshes an
	 * existing session, generating a new token). Elevated permissions on the existing session
	 * will not be carried over to the new session.
	 *
	 * @param sessionToken The existing session token to use when creating the new session
	 */
	public async createSessionFromSession(sessionToken: string) {
		const response = await this.post<CreateSessionFromSessionResponse>('/session/from-session', {
			headers: {
				authorization: `Bearer ${sessionToken}`
			}
		});

		if (response.status !== 201) {
			throw new ApiError<CreateSessionFromSessionErrorCodes>(response as any);
		}

		return response.body.json;
	}

	/**
	 * Creates a new session, using a set of temporary credentials
	 *
	 * @param requestId The request ID associated to the temporary credentials
	 * @param verificationKey The verification key associated to the temporary credentials
	 * @param elevated Should the session be created with elevated permissions?
	 */
	public async createSessionFromTempCredential(requestId: string, verificationKey: string, elevated?: boolean) {
		// TODO
	}

	/**
	 * Creates a new session, using a set of application credentials to authenticate on behalf of a user
	 *
	 * @param username The username of the user to authenticate for
	 * @param applicationId The application ID of the application performing the authentication
	 * @param applicationSecret The application secret key  of the application performing the authentication
	 * @param userSecret The user secret key generated for the application to use for this user
	 */
	public async createSessionFromApplicationCredential(username: string, applicationId: string, applicationSecret: string, userSecret: string) {
		// TODO
	}

	/**
	 * Introspect the session identified by the given session token, and return the user / session
	 * details.
	 *
	 * @param sessionToken The session token to authenticate with
	 */
	public async introspectSession(sessionToken: string) {
		// TODO
	}

	/**
	 * Destroy the session indentified by the given session token.
	 *
	 * @param sessionToken The token for the session to be destroyed
	 */
	public async destroySession(sessionToken: string) {
		// TODO
	}

	/**
	 * Updates the password of the user identified by the given session token. Requires an elevated session.
	 *
	 * @param sessionToken The session token to authenticate with
	 * @param password The new password to assign to the account
	 */
	public async updatePassword(sessionToken: string, password: string) {
		// TODO
	}
}
