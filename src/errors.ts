
import { HttpResponse } from '@viva-eng/http-client';

export interface ErrorPayload<T> {
	message: string;
	additionalInfo?: T;
}

export interface UnprocessableEntityInfo {
	expected?: {
		[key: string]: string;
	};
	errors?: {
		[key: string]: string[];
	}
}

export interface GenericErrorInfo<T extends string> {
	code: T;
}

export class ApiError<T extends string> extends Error {
	public additionalInfo: UnprocessableEntityInfo | GenericErrorInfo<T>;

	constructor(response: HttpResponse<ErrorPayload<any>>) {
		if (! response.body.json) {
			super('Received an unprocessable error response from the service');
		}

		else {
			super(response.body.json.message);

			this.additionalInfo = response.body.json.additionalInfo;
		}
	}
}
