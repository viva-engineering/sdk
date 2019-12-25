
import { logger } from './logger';
import { HttpClient, HttpResponse, HttpRequestOptions } from '@viva-eng/http-client';

export interface ServiceParams {
	hostname: string;
	ssl?: boolean;
	basePath: string;
}

export class Service extends HttpClient {
	public readonly basePath: string;

	constructor(params: ServiceParams) {
		super({
			hostname: params.hostname,
			port: params.ssl ? 443 : 80,
			ssl: params.ssl,
			logger: logger
		});

		this.basePath = params.basePath;
	}

	public request<T>(method: string, path: string, params: HttpRequestOptions) : Promise<HttpResponse<T>> {
		return this.makeRequest(method, this.basePath + path, params);
	}
}
