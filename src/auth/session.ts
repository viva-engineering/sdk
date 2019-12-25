
import { AuthClient } from './client';

// We refresh sessions three minutes before they expire
const refreshBuffer = 1000 * 60 * 3;

/**
 * 
 */
export class Session {
	private activeToken: string;
	private refreshTimer: any;

	constructor(private readonly authClient: AuthClient, token: string, ttl: number, public readonly autoRefresh: boolean) {
		this.activeToken = token;

		if (autoRefresh) {
			this.setRefreshTimer(ttl);
		}
	}

	/**
	 * 
	 */
	get token() {
		return this.activeToken;
	}

	/**
	 * 
	 */
	public introspect() {
		return this.authClient.introspectSession(this.activeToken);
	}

	/**
	 * 
	 */
	public refresh = async () => {
		this.clearRefreshTimer();

		const res = await this.authClient.createSessionFromSession(this.activeToken);

		this.activeToken = res.token;

		if (this.autoRefresh) {
			this.setRefreshTimer(res.ttl);
		}
	}

	/**
	 * 
	 */
	public async destroy() {
		// 
	}

	/**
	 * 
	 */
	private clearRefreshTimer() {
		if (this.refreshTimer) {
			clearTimeout(this.refreshTimer);
			this.refreshTimer = null;
		}
	}

	/**
	 * 
	 */
	private setRefreshTimer(ttl: number) {
		this.refreshTimer = setTimeout(this.refresh, (ttl * 1000) - refreshBuffer);
	}

	/**
	 * Creates a new user session, authenticated by username and password
	 *
	 * @param authClient The backing auth service client to use when making API calls
	 * @param username The username to authenticate with
	 * @param password The password to authenticate with
	 * @param autoRefresh Should the session automatically refresh before expiration?
	 */
	static async fromPassword(authClient: AuthClient, username: string, password: string, autoRefresh: boolean = false) {
		const res = await authClient.createSessionFromPassword(username, password);

		return new Session(authClient, res.token, res.ttl, autoRefresh);
	}

	/**
	 * 
	 */
	static async fromTemporaryCredential(authClient: AuthClient, requestId: string, verificationKey: string, autoRefresh: boolean = false) {
		const res = await authClient.createSessionFromTempCredential(requestId, verificationKey);
		
		return new Session(authClient, res.token, res.ttl, autoRefresh);
	}

	/**
	 * 
	 */
	static async fromApplicationCredential(authClient: AuthClient, username: string, applicationId: string, applicationSecret: string, userSecret: string, autoRefresh: boolean = false) {
		const res = await authClient.createSessionFromApplicationCredential(username, applicationId, applicationSecret, userSecret);
		
		return new Session(authClient, res.token, res.ttl, autoRefresh);
	}
}
