import crypto from 'crypto';

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

import type { WithingsDemoAccessResponse, WithingsRequestTokenResponse } from '~/models/withings-auth.model';
import type { WithingsDataScopes } from '~/models/withings-data-scope.model';
import type { RecursiveRecord } from '~/utils/typescript.utils';

export type WithingsClientSettings = BaseSettings<{
  /** The app unique client ID */
  client_id: string;
  /** The app api key/secret  */
  client_secret: string;
  /** URI specified in your app settings. */
  redirect_uri: string;
}>;

class WithingAuth {
  /** The expiration time of the token */
  readonly expires: number;

  constructor(expires: number) {
    this.expires = expires;
  }

  /**
   * Check if the token is expired.
   * @param offset - The offset time in milliseconds (defaults to 5 minutes 5 * 60 * 1000).
   */
  isExpired(offset = 5 * 60 * 1000): boolean {
    return this.expires - offset < Date.now();
  }
}

/** @see [token]{@link https://developer.withings.com/api-reference/#tag/oauth2/operation/oauth2-getaccesstoken} */
export class WithingsAuthToken extends WithingAuth {
  /** User access token if there is an active session */
  readonly access_token: string;
  /** User refresh token */
  readonly refresh_token: string;

  /** User identifier */
  readonly userid?: string;
  /** The access scope of the token */
  readonly scope?: (string | WithingsDataScopes)[];
  /** Cross-Site Request Forgery token */
  readonly csrf_token?: string;

  constructor(token: WithingsRequestTokenResponse | WithingsDemoAccessResponse | WithingsAuthToken) {
    super('expires' in token ? token.expires : new Date(Date.now() + token.expires_in * 1000).getTime());

    this.access_token = token.access_token;
    this.refresh_token = token.refresh_token;

    if ('userid' in token) this.userid = token.userid;
    if ('csrf_token' in token) this.csrf_token = token.csrf_token;
    if ('scope' in token) this.scope = Array.isArray(token.scope) ? token.scope : token.scope.split(',');
  }
}

/** @see [signature]{@link https://developer.withings.com/api-reference/#tag/signature/operation/signaturev2-getnonce} */
export class WithingsAuthSignature extends WithingAuth {
  /** Service action name. */
  readonly action: string;
  /** The client identifier. */
  readonly client_id: string;
  /** The client secret. */
  readonly client_secret: string;
  /** A unix timestamp. */
  readonly timestamp: number;
  /** Hash of params (Cf. [Signature hash protocol]{@link https://developer.withings.com/developer-guide/v3/get-access/sign-your-requests}). */
  readonly signature: string;

  /** A random token used to prevent replay attacks (Cf. [Signature v2 - Getnonce]{@link https://developer.withings.com/api-reference#operation/signaturev2-getnonce}) */
  nonce?: string;

  constructor(data: { action: string; client_id: string; client_secret: string }, creation = Date.now()) {
    super(creation + 30 * 60 * 1000);

    this.action = data.action;
    this.client_id = data.client_id;
    this.client_secret = data.client_secret;
    this.timestamp = Math.floor(creation / 1000);

    const payload = [this.action, this.client_id, this.timestamp].join(',');
    this.signature = crypto.createHmac('sha256', this.client_secret).update(payload).digest('hex');
  }
}

export type WithingsClientAuthentication = {
  token?: WithingsAuthToken;
  signature?: WithingsAuthSignature;
  state?: string;
};

export type AuthorizationRequest = {
  scope?: string | WithingsDataScopes | WithingsDataScopes[];
  redirect_uri?: string;
  state?: string;
  demo?: boolean;
};

export type WithingsApiParam = RecursiveRecord;

export type WithingsApiResponse<T = unknown> = ResponseOrTypedResponse<{
  status: number;
  body: T;
  error?: string;
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
export type IWithingsApi<Parameter extends WithingsApiParam = any, Response = unknown, Cache extends boolean = boolean> = {
  [key: string]: WithingsClientEndpoint<Parameter, Response, Cache> | IWithingsApi<Parameter>;
};
