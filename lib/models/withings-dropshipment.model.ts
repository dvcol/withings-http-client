import type { WithingsGoal } from '~/models/withings-goal.model';
import type { WithingsMeasure } from '~/models/withings-measure.model';

import type { WithingCreatedOrder, WithingOrderStatus, WithingsOrder } from '~/models/withings-order.model';
import type { WithingSignatureRequest } from '~/models/withings-request.model';
import type { WithingsUnitPreference } from '~/models/withings-unit-preference.model';

export type WithingsDropshipmentCreateRequest = {
  /** Must take the constant string value <b>createorder</b>. */
  action: 'createorder';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** Refer to [Order model]{@link https://developer.withings.com/api-reference/#tag/models/Order}. The maximum number of orders is 10 per API request. */
  order: WithingsOrder;
  /** Your dropshipment billing ID. If you don't know it, ignore this parameter. */
  customerid?: string;
  /**
   * If is set, it will create fake orders, and simulate the evolution of the orders status and sending of notifications.
   * * 1 - SHIPPED sequence
   * * 2 - TRASHED sequence
   * * 3 - FAILED sequence
   * * 4 - BACKHOLD sequence
   */
  testmode?: 1 | 2 | 3 | 4;
} & WithingSignatureRequest;

export type WithingsDropshipmentCreateResponse = {
  orders: WithingCreatedOrder[];
  dropshipmentorderid: string;
};

export type WithingsDropshipmentCreateUserRequest = {
  /** Service action name. Must take the constant string value <b>createuserorder</b>. */
  action: 'createuserorder';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** Specifies if customer accepted Withings commercial contacts. */
  mailingpref: boolean;
  /** Unix timestamp of user's birthdate */
  birthdate: number;
  /** User measures (Cf. [Measures model]{@link https://developer.withings.com/api-reference/#tag/models/Measures}). */
  measures: WithingsMeasure[];
  /** 0: man, 1: woman */
  gender: 0 | 1;
  /**
   * User language preference.
   * @examples en_EN, en_US, de_DE, es_ES, fr_FR, it_IT, ja_JA, ko_KR, nl_NL, pt_PT, ru_RU, zh_CN
   */
  preflang: string;
  /** Unit pref (cf. [Unit preferences]{@link https://developer.withings.com/api-reference/#tag/models/Unit-preferences} model). */
  unit_pref: WithingsUnitPreference;
  /** User's email address */
  email: string;
  /**
   * User's timezone.
   * A complete list of all possible timezones can be found on the "TZ database name" column of [this page]{@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}
   * @examples: "Europe/Paris", "America/New_York".
   */
  timezone: string;
  /**
   * 3 characters representing the end user (ex: for a user named Robert, you could set the shortname param to ROB).
   * These characters will be displayed on device screens when used.
   * Shortname must respect the following regex: <b>/^[a-zA-Z0-9]{3}$/</b> (either letters or numbers, special characters and spaces are not allowed).
   */
  shortname: string;
  /**
   * Unique identifier used by the partner to identify the end-user.
   * Will be attached to the [data update notifications]{@link https://developer.withings.com/api-reference/#tag/dropshipment/operation/dropshipmentv2-createuserorder:~:text=attached%20to%20the-,data%20update%20notifications,-order}.
   */
  external_id: string;
  /** The maximum number of orders is 10 per API request. */
  order: WithingsOrder;
  /** User's firstname (if not set, will take the same value as shortname) */
  firstname?: string;
  /** User's lastname (if not set, will take the same value as shortname) */
  lastname?: string;
  /** Phone number in E.164 format. End user will receive a verification code on this phone number for 2 factor authentication if they wish to securely access the data of their program in the withings app in the future (recommended). */
  phonenumber?: string;
  /**
   * Recovery code can be used by end user as a 2nd authentication factor in the withings app if they wish to securely access the data of their program in the future.
   * You will be responsible of securely providing this recovery code to your user if he asks for it.
   */
  recovery_code?: string;
  /** Goals */
  goals: WithingsGoal[];
  /**
   * If is set, it will create fake orders, and simulate the evolution of the orders status and sending of notifications.
   * * 1 - SHIPPED sequence
   * * 2 - TRASHED sequence
   * * 3 - FAILED sequence
   * * 4 - BACKHOLD sequence
   */
  testmode?: 1 | 2 | 3 | 4;
} & WithingSignatureRequest;

export type WithingsDropshipmentCreateUserOrderResponse = WithingsDropshipmentCreateResponse & {
  user: {
    code: string;
    external_id: string;
  };
};

export type WithingsDropshipmentDeleteRequest = {
  /** Service action name. Must take the constant string value <b>delete</b>. */
  action: 'delete';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** Withings generated identifier used to track your order. */
  order_id: string;
} & WithingSignatureRequest;

export type WithingsDropshipmentStatusRequest = {
  /** Service action name. Must take the constant string value <b>getorderstatus</b>. */
  action: 'getorderstatus';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** List of order_id */
  order_ids?: string[];
  /** Movement reference number of dropshipment orderlines */
  customer_ref_ids?: string[];
  /** Your dropshipment billing ID. If you don't know it, ignore this parameter. */
  customerid?: string;
  /** Enable advanced features if set to 't' */
  enrich?: boolean;
} & WithingSignatureRequest;

export type WithingsDropshipmentStatusResponse = {
  orders: WithingOrderStatus[];
};

export type WithingsDropshipmentUpdateRequest = {
  /** Service action name. Must take the constant string value <b>update</b>. */
  action: 'update';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** Withings generated identifier used to track your order. */
  order_id: string;
  /** Restricted to one order only. */
  order: WithingsOrder;
} & WithingSignatureRequest;

export type WithingsDropshipmentUpdateResponse = {
  orders: WithingOrderStatus[];
};

export type WithingsOrderDetailRequest = {
  /** Service action name. Must take the constant string value <b>getdetail</b>. */
  action: 'getdetail';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** List of order_id */
  order_ids?: string[];
  /** Movement reference number of dropshipment orderlines */
  customer_ref_ids?: string[];
  /** Your dropshipment billing ID. If you don't know it, ignore this parameter. */
  customerid?: string;
} & WithingSignatureRequest;

export type WithingsOrderDetailResponse = {
  orders: WithingOrderStatus[];
};
