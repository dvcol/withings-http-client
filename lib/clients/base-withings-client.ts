import {
  BaseApiHeaders,
  type BaseBody,
  BaseClient,
  BaseHeaderContentType,
  injectCorsProxyPrefix,
  parseBody,
  parseUrl,
} from '@dvcol/base-http-client';

import type { WithingsApi } from '~/api/withings-api.endpoints';

import type {
  IWithingsApi,
  WithingsApiParam,
  WithingsApiQuery,
  WithingsApiResponse,
  WithingsApiResponseData,
  WithingsApiTemplate,
  WithingsClientAuthentication,
  WithingsClientOptions,
  WithingsClientSettings,
} from '~/models/withings-client.model';

/** Needed to type Object assignment */
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging  -- To allow type extension
export interface BaseWithingsClient extends WithingsApi {}

const parseResponse = (result: WithingsApiResponseData) => {
  if (result.status !== 0) throw result;
  return result;
};

const patchResponse = <T extends Response>(response: T): T => {
  const parsed: T = response;
  const _json = parsed.json as T['json'];
  parsed.json = async () => _json.bind(parsed)().then(parseResponse);
  return parsed;
};

/**
 * Represents a Withings API client with common functionality.
 *
 * @class BaseWithingsClient
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging  -- To allow type extension
export class BaseWithingsClient
  extends BaseClient<WithingsApiQuery, WithingsApiResponse, WithingsClientSettings, WithingsClientAuthentication>
  implements WithingsApi
{
  /**
   * Creates an instance of BaseWithingsClient.
   * @param options - The options for the client.
   * @param authentication - The authentication for the client.
   * @param api - The API endpoints for the client.
   */
  constructor(options: WithingsClientOptions, authentication: WithingsClientAuthentication = {}, api: IWithingsApi = {}) {
    super(options, authentication, api);
  }

  /**
   * Parses the template to construct the headers for a Withings API request.
   *
   * @protected
   *
   * @template T - The type of the parameters.
   **
   * @returns {HeadersInit} The parsed request headers.
   *
   * @throws {Error} Throws an error if auth is required and the access token is missing.
   */
  protected _parseHeaders<T extends WithingsApiParam = WithingsApiParam>(template: WithingsApiTemplate<T>): HeadersInit {
    const headers: HeadersInit = {
      [BaseApiHeaders.Accept]: BaseHeaderContentType.Json,
      [BaseApiHeaders.ContentType]: template.opts.contentType ?? BaseHeaderContentType.Json,
    };

    if (template.opts?.auth) {
      if (this.auth.token && !this.auth.token.isExpired()) headers[BaseApiHeaders.Authorization] = `Bearer ${this.auth.token.access_token}`;
      else if (!this.auth.token) throw Error('User auth required: access_token is missing');
      else if (this.auth.token.isExpired()) throw Error('User auth required: access_token has expired');
    }

    return headers;
  }

  /**
   * Parses the parameters and constructs the URL for a Withings API request.
   *
   * @protected
   *
   * @template T - The type of the parameters.
   *
   * @param template - The template for the API endpoint.
   * @param {T} params - The parameters for the API call.
   *
   * @returns {string} The URL for the Withings API request.
   *
   * @throws {Error} Throws an error if mandatory parameters are missing or if a filter is not supported.
   */
  protected _parseUrl<T extends WithingsApiParam = WithingsApiParam>(template: WithingsApiTemplate<T>, params: T): URL {
    injectCorsProxyPrefix(template, this.settings);
    const _url = parseUrl<T>(template, params, template.opts.endpoint ?? this.settings.endpoint);
    if (template.opts?.parameters?.query?.nonce && !_url.searchParams.get('nonce')) {
      if (!this.auth.signature?.nonce) throw Error('Missing mandatory parameter: nonce');
      else if (this.auth.signature?.isExpired()) throw Error('Auth required: signature has expired');
      else _url.searchParams.set('nonce', this.auth.signature.nonce);
    }
    if (template.opts?.parameters?.query?.signature && !_url.searchParams.get('signature')) {
      if (!this.auth.signature?.signature) throw Error('Missing mandatory parameter: signature');
      else if (this.auth.signature?.isExpired()) throw Error('Auth required: signature has expired');
      else _url.searchParams.set('signature', this.auth.signature.signature);
    }
    if (template.opts?.parameters?.query?.client_id && !_url.searchParams.get('client_id')) {
      if (this.settings.client_id) _url.searchParams.set('client_id', this.settings.client_id);
      else throw Error('Missing mandatory parameter: client_id');
    }
    if (template.opts?.parameters?.query?.client_secret && !_url.searchParams.get('client_secret')) {
      if (this.settings.client_secret) _url.searchParams.set('client_secret', this.settings.client_secret);
      else throw Error('Missing mandatory parameter: client_secret');
    }
    return _url;
  }

  /**
   * Parses body from a template and stringifies a {@link BodyInit}
   *
   * @protected
   *
   * @template T - The type of the parameters.
   *
   * @param template - The expected body structure.
   * @param {T} params - The actual parameters.
   *
   * @returns {BodyInit} The parsed request body.
   */
  // eslint-disable-next-line class-methods-use-this -- implemented from abstract class
  protected _parseBody<T extends WithingsApiParam = WithingsApiParam>(template: BaseBody<string | keyof T>, params: T): BodyInit {
    return parseBody(template, params);
  }

  /**
   * Parses the response from the API before returning from the call.
   * @param response - The response from the API.
   *
   * @returns {WithingsApiResponse} The parsed response.
   * @protected
   */
  // eslint-disable-next-line class-methods-use-this -- implemented from abstract class
  protected _parseResponse(response: WithingsApiResponse): WithingsApiResponse {
    if (!response.ok || response.status >= 400) throw response;

    const parsed: WithingsApiResponse = patchResponse(response);
    const _clone = parsed.clone;
    parsed.clone = () => patchResponse(_clone.bind(parsed)());
    return parsed;
  }
}
