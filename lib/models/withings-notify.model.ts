import type { RequireAtLeastOne } from '~/utils/typescript.utils';

export type WithingsNotifyGetRequest = {
  /** Service action name. Must take the constant string value <b>get</b> */
  action?: 'get';
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

/**
 * The event send by Withings when a notification is triggered.
 *
 * Refer to the [notification categories]{@link https://developer.withings.com/developer-guide/v3/data-api/keep-user-data-up-to-date#notification-categories} for information about which parameters you will receive depending on the notification category you subscribe to.
 *
 * @see [notifications]{@link https://developer.withings.com/developer-guide/v3/data-api/keep-user-data-up-to-date/#description-of-parameters}
 */
export type WithingsNotifyEvent = {
  /** The user identifier. */
  userid: number;
  /** The device identifier that triggered the notification. */
  deviceid: number;
  /** The application identifier (category of device). */
  appli: number;
  /** The start date of the event as an epoch date. */
  startdate: number;
  /** The end date of the event as an epoch date. */
  enddate: number;
  /** The date of the event as a YYY-MM-DD formatted string. */
  date: string;
  /** The action that triggered the event. */
  action?: 'delete' | 'unlink' | 'update';
};

export type WithingsNotifyListRequest = {
  /** Service action name. Must take the constant string value <b>list</b> */
  action?: 'list';
  /** Refer to the [Notifications section]{@link https://developer.withings.com/developer-guide/v3/data-api/keep-user-data-up-to-date/} to know which value you should use. */
  appli?: number;
};

export type WithingsNotifyListResponse = {
  profiles: WithingsNotify[];
};

export type WithingsNotifyRevokeRequest = {
  /** Service action name. Must take the constant string value <b>revoke</b> */
  action?: 'revoke';
  /** The callback URL to be removed. */
  callbackurl: string;
  /** Refer to the [Notifications section]{@link https://developer.withings.com/developer-guide/v3/data-api/keep-user-data-up-to-date/} to know which value you should use. */
  appli?: number;
};

/**
 * To subscribe to a notification, provide either:
 * * an <b>access_token</b> for web applications,
 * * or a <b>signature</b>, <b>nonce</b>, and <b>client_id</b> for cellular or mobile SDK.
 */
export type WithingsNotifySubscribeRequest = {
  /** Service action name. Must take the constant string value <b>subscribe</b> */
  action?: 'subscribe';
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
  action?: 'update';
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
