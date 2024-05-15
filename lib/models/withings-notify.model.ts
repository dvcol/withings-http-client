import type { RequireAtLeastOne } from '~/utils/typescript.utils';

export type WithingsNotifyGetRequest = {
  /** Service action name. Must take the constant string value <b>get</b> */
  action: 'get';
  /** The callback URL to be notified. */
  callbackurl: string;
  /** Refer to the [Notifications section]{@link https://developer.withings.com/developer-guide/v3/data-api/keep-user-data-up-to-date/} to know which value you should use. */
  appli?: number;
};

export type WithingsNotify = {
  appli: number;
  callbackurl: string;
  expires?: number;
  comment?: string;
};

export type WithingsNotifyListRequest = {
  /** Service action name. Must take the constant string value <b>list</b> */
  action: 'list';
  /** Refer to the [Notifications section]{@link https://developer.withings.com/developer-guide/v3/data-api/keep-user-data-up-to-date/} to know which value you should use. */
  appli?: number;
};

export type WithingsNotifyListResponse = {
  profiles: WithingsNotify[];
};

export type WithingsNotifyRevokeRequest = {
  /** Service action name. Must take the constant string value <b>revoke</b> */
  action: 'revoke';
  /** The callback URL to be removed. */
  callbackurl: string;
  /** Refer to the [Notifications section]{@link https://developer.withings.com/developer-guide/v3/data-api/keep-user-data-up-to-date/} to know which value you should use. */
  appli?: number;
};

export type WithingsNotifySubscribeRequest = {
  /** Service action name. Must take the constant string value <b>subscribe</b> */
  action: 'subscribe';
  /** The callback URL to be notified. */
  callbackurl: string;
  /** Refer to the [Notifications section]{@link https://developer.withings.com/developer-guide/v3/data-api/keep-user-data-up-to-date/} to know which value you should use. */
  appli: number;

  /**
   * A Hash of params (Cf. [Signature hash protocol]{@link https://developer.withings.com/developer-guide/v3/get-access/sign-your-requests}).
   *
   * * <b>Important</b>: Only use if access_token is not provided. (for cellular or mobile SDk)
   */
  signature?: string;
  /**
   * A random token used to prevent replay attacks (Cf. [Signature v2 - Getnonce]{@link https://developer.withings.com/api-reference/#operation/signaturev2-getnonce}).
   *
   * * <b>Important</b>: Only use if access_token is not provided. (for cellular or mobile SDk)
   */
  nonce?: string;

  /**
   * The client identifier.
   *
   * * <b>Important</b>: Only use if access_token is not provided. (for cellular or mobile SDk)
   */
  client_id?: string;

  /** An optional comment. */
  comment?: string;
};

export type WithingsNotifyUpdateRequest = {
  /** Service action name. Must take the constant string value <b>update</b> */
  action: 'update';
  /** The original callback URL to be notified. */
  callbackurl: string;
  /** Refer to the [Notifications section]{@link https://developer.withings.com/developer-guide/v3/data-api/keep-user-data-up-to-date/} to know which value you should use. */
  appli: number;
} & RequireAtLeastOne<{
  /**
   * The new callback URL to be notified.
   *
   * * <b>Important</b>: Only use if new_appli or comment are not provided.
   */
  new_callbackurl: string;
  /**
   * The new application identifier.
   *
   * * <b>Important</b>: Only use if new_callbackurl or comment are not provided.
   */
  new_appli: number;
  /**
   * A new comment.
   *
   * * <b>Important</b>: Only use if new_callbackurl or new_appli are not provided.
   */
  comment: string;
}>;
