import { ClientEndpoint } from '@dvcol/base-http-client';

import type {
  BaseOptions,
  BaseQuery,
  BaseRequest,
  BaseSettings,
  BaseTemplate,
  BaseTemplateOptions,
  ResponseOrTypedResponse,
} from '@dvcol/base-http-client';

import type { RecursiveRecord } from '~/utils/typescript.utils';

export type WithingsClientSettings = BaseSettings<{
  /** The app unique client ID */
  client_id: string;
  /** The app api key/secret  */
  client_secret: string;
}>;

export type WithingsClientAuthentication = {
  /** A random token used to prevent replay attacks (Cf. [Signature v2 - Getnonce]{@link https://developer.withings.com/api-reference#operation/signaturev2-getnonce}) */
  nonce?: string;
  /** Hash of params (Cf. [Signature hash protocol]{@link https://developer.withings.com/developer-guide/v3/get-access/sign-your-requests}). */
  signature?: string;
  /** User access token if there is an active session */
  access_token?: string;
};

export type WithingsApiParam = RecursiveRecord;

export type WithingsApiResponse<T = unknown> = ResponseOrTypedResponse<{
  status: number;
  body: T;
}>;

export type WithingsPaginated<T> = {
  more: boolean;
  offset: number;
} & T;

export type WithingsClientOptions = BaseOptions<WithingsClientSettings, WithingsApiResponse>;

export type WithingsApiQuery<T = unknown> = BaseQuery<BaseRequest, T>;

export type WithingsApiTemplateOptions<T extends string | number | symbol = string> = BaseTemplateOptions<T, boolean> & {
  /** If the method requires user authentication */
  auth?: boolean;
  /** If the method supports pagination */
  pagination?: boolean;
  /** If the method requires secret hash */
  secret?: boolean;
  /** If the method requires signature hash and nonce token */
  signature?: boolean;
  /** If the method requires endpoint override */
  endpoint?: string;
  /** If the method requires a specific content type */
  contentType?: string;
};

export type WithingsApiTemplate<Parameter extends WithingsApiParam = WithingsApiParam> = BaseTemplate<
  Parameter,
  WithingsApiTemplateOptions<keyof Parameter>
>;

export interface WithingsClientEndpoint<Parameter extends WithingsApiParam = Record<string, never>, Response = unknown> {
  (param?: Parameter, init?: BodyInit): Promise<WithingsApiResponse<Response>>;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class WithingsClientEndpoint<
  Parameter extends WithingsApiParam = Record<string, never>,
  Response = unknown,
  Cache extends boolean = false,
> extends ClientEndpoint<Parameter, Response, Cache, WithingsApiTemplateOptions<keyof Parameter>> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is a recursive type
export type ITmdbApi<Parameter extends WithingsApiParam = any, Response = unknown, Cache extends boolean = boolean> = {
  [key: string]: WithingsClientEndpoint<Parameter, Response, Cache> | ITmdbApi<Parameter>;
};
