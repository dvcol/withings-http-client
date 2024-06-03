import type {
  WithingsAuthorizationCodeRequest,
  WithingsAuthorizeRequest,
  WithingsRefreshTokenRequest,
  WithingsRequestTokenRequest,
} from '~/models/withings-auth.model';
import type { AuthorizationRequest, IWithingsApi, WithingsClientAuthentication, WithingsClientOptions } from '~/models/withings-client.model';

import { minimalWithingsApi } from '~/api/withings-api-minimtal.endpoint';
import { BaseWithingsClient } from '~/clients/base-withings-client';
import { WithingsAuthToken } from '~/models/withings-client.model';

import { WithingsDataScope } from '~/models/withings-data-scope.model';

import { randomHex } from '~/utils/crypto.utils';

/**
 * WithingsClient is a wrapper around the WithingsApi to provide basic authentication and state management.
 *
 * @class WithingsClient
 *
 * @extends {BaseWithingsClient}
 */
export class WithingsClient extends BaseWithingsClient {
  /**
   * Creates an instance of WithingsClient, with the necessary endpoints and settings.
   * @param settings - The settings for the client.
   * @param authentication - The authentication for the client.
   * @param api - The API endpoints for the client.
   */
  constructor(settings: WithingsClientOptions, authentication: WithingsClientAuthentication = {}, api: IWithingsApi = minimalWithingsApi) {
    super(settings, authentication, api);
  }

  get state() {
    return this.auth.state;
  }

  private set state(state: string) {
    this.updateAuth(auth => ({ ...auth, state }));
  }

  get token() {
    return this.auth?.token;
  }

  private set token(token: WithingsAuthToken) {
    this.updateAuth(auth => ({ ...auth, token }));
  }

  private buildAuthorizationRequest({ scope, redirect_uri, state, demo }: AuthorizationRequest = {}): WithingsAuthorizeRequest {
    const request: WithingsAuthorizeRequest = {
      response_type: 'code',
      client_id: this.settings.client_id,
      redirect_uri: redirect_uri || this.settings.redirect_uri,
      state: state || randomHex(),
      scope: scope || Object.values(WithingsDataScope),
    };

    this.state = request.state;

    if (demo) request.mode = 'demo';
    return request;
  }

  authorizationUrl(query: AuthorizationRequest) {
    return this.authentication.authorize.resolve(this.buildAuthorizationRequest(query));
  }

  authorizationRedirect(query: AuthorizationRequest) {
    return this.authentication.authorize(this.buildAuthorizationRequest(query));
  }

  private async _requestToken(request: WithingsAuthorizationCodeRequest | WithingsRefreshTokenRequest): Promise<WithingsClientAuthentication> {
    const response = await this.authentication.requestToken({
      action: 'requesttoken',
      client_id: this.settings.client_id,
      client_secret: this.settings.client_secret,
      ...request,
    } as WithingsRequestTokenRequest);

    const content = await response.json();

    this.token = new WithingsAuthToken(content.body);

    return this.auth;
  }

  exchangeCode({ code, state, redirect_uri }: { code: string; redirect_uri?: string; state?: string }): Promise<WithingsClientAuthentication> {
    if (state && state !== this.auth.state) throw Error('Invalid CSRF (State)');
    return this._requestToken({
      grant_type: 'authorization_code',
      redirect_uri: redirect_uri || this.settings.redirect_uri,
      code,
    });
  }

  refreshToken(token: WithingsAuthToken = this.auth.token): Promise<WithingsClientAuthentication> {
    if (!token.refresh_token) throw Error('No refresh token found.');
    return this._requestToken({
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token,
    });
  }

  /**
   * Imports the provided authentication information into the client.
   *
   * @param token - The authentication token to import.
   *
   * @returns A promise resolving to the imported authentication information.
   */
  importToken(token: WithingsAuthToken): Promise<WithingsClientAuthentication> {
    if (!token?.access_token) throw Error('No access token found.');
    if (token.isExpired()) return this.refreshToken(token);

    this.token = token;
    return Promise.resolve(this.auth);
  }

  /**
   * Imports the provided CSRF state into the client.
   *
   * @param state - The CSRF state to import.
   *
   *  @returns The client authentication.
   */
  importState(state: string): WithingsClientAuthentication {
    this.state = state;
    return this.auth;
  }

  /**
   * Clears the authentication information from the client.
   */
  clearAuth() {
    this.updateAuth(() => ({}));
  }
}
