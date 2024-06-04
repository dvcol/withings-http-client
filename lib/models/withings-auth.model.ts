import type { WithingsDataScopes } from '~/models/withings-data-scope.model';
import type { WithingSignatureRequest } from '~/models/withings-signature.model';

export type WithingsAuthorizeRequest = {
  /** Must take the constant string value <b>code</b>. */
  response_type: 'code';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** A value you define. This can be used to make sure that the redirect back to your site or app wasn’t spoofed. */
  state: string;
  /** A comma-separated list of permission scopes you want to ask your user for (see the [Index Data API]{@link https://developer.withings.com/developer-guide/v3/data-api/all-available-health-data} section to know which scope you should use). */
  scope: string | WithingsDataScopes | WithingsDataScopes[];
  /** he URI we should redirect the user to after choosing to authorize or not your app.
   * This URI must be set as Callback Url in your partner application.
   * It is possible to use multiple URLs by separating them with a comma.
   *
   * * Examples:
   *
   * Callbacks: https://mydomain.com/
   * Callback: https://mydomain.com/,https://mydomain2.com/
   * Valid URL: https://mydomain.com/relative_path?args=value
   */
  redirect_uri: string;
  /** Only set to use the demo user. For demo user must take the constant string value <b>demo</b>. */
  mode?: 'demo';
};

type WithingSecretRequest = {
  /** Your <b>Client Secret</b>. */
  client_secret: string;
};

export type WithingsAuthorizationCodeRequest = {
  /** Must take the constant string value <b>authorization_code</b>. */
  grant_type: 'authorization_code';
  /** The authorization code you received from the authorization endpoint. */
  code: string;
  /** The URI we should redirect the user to after choosing to authorize or not your app. */
  redirect_uri: string;
};

export type WithingsRefreshTokenRequest = {
  /** Must take the string value <b>requesttoken</b>. */
  grant_type: 'refresh_token';
  /** The current valid refresh_token. */
  refresh_token: string;
};

export type WithingsRequestTokenRequest<
  GrantType extends 'authorization_code' | 'refresh_token' = 'authorization_code',
  Identity extends 'secret' | 'signature' = 'secret',
> = {
  /** Must take the string value requesttoken. */
  action?: 'requesttoken';
  /** Your <b>Client ID</b>. */
  client_id: string;
} & (GrantType extends 'authorization_code' ? WithingsAuthorizationCodeRequest : WithingsRefreshTokenRequest) &
  (Identity extends 'secret' ? WithingSecretRequest : WithingSignatureRequest);

export type WithingsRequestTokenResponse = {
  userid: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  csrf_token: string;
  token_type: string;
};

export type WithingsRecoverCodeRequest = {
  /** Must take the constant string value <b>recoverauthorizationcode</b>. */
  action?: 'recoverauthorizationcode';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** User's email address */
  email: string;
} & WithingSignatureRequest;

export type WithingsRecoverCodeResponse = {
  user: {
    code: string;
  };
};

export type WithingsUserListRequest = {
  /** Must take the constant string value <b>listusers</b>. */
  action?: 'listusers';
  /** Your <b>Client ID</b>. */
  client_id: string;
} & WithingSignatureRequest;

export type WithingsUserListResponse = {
  hash_userid: string;
  userid: string;
  email: string;
  fully_owned: boolean;
};

export type WithingsRevokeUserRequest = {
  /** Must take the constant string value <b>revoke</b>. */
  action?: 'revoke';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** User's identifier. */
  userid: string;
} & WithingSignatureRequest;

export type WithingsDemoAccessRequest = {
  /** Must take the constant string value <b>getdemoaccess</b>. */
  action?: 'getdemoaccess';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** A comma-separated list of permission scopes you want to ask your user for (see the [Index Data API]{@link https://developer.withings.com/developer-guide/v3/data-api/all-available-health-data} section to know which scope you should use). */
  scope_oauth2: string | WithingsDataScopes | WithingsDataScopes[];
} & WithingSignatureRequest;

export type WithingsDemoAccessResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type WithingsCreateClientRequest = {
  /** Must take the constant string value <b>createclient</b>. */
  action?: 'createclient';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** Specifies the OAuth2.0 application's name */
  name: string;
  /** Brief summary of the application */
  description: string;
  /** Indicates intended operation environment. Allowed values are: <b>dev</b>, <b>stage</b> and <b>prod</b> */
  intended_environment: 'dev' | 'stage' | 'prod';
  /** Specifies Withings Solutions to be used. Allowed values are: <b>app_to_app</b>, <b>sdk, <b>cellular</b> and <b>logistics</b> */
  intended_integrations: ('app_to_app' | 'sdk' | 'cellular' | 'logistics')[];
  /** List of redirect uris */
  redirect_uris: string[];
} & WithingSignatureRequest;

export type WithingsCreateClientResponse = {
  client_id: string;
  client_secret: string;
  name: string;
  desc: string;
  img: string;
  is_restricted: boolean;
  organization_id: number;
};
