import type { WithingsDevice } from '~/models/withings-device.model';
import type { WithingsGoal } from '~/models/withings-goal.model';
import type { WithingsMeasure } from '~/models/withings-measure.model';
import type { WithingSignatureRequest } from '~/models/withings-signature.model';
import type { WithingsUnitPreference } from '~/models/withings-unit-preference.model';

export type WithingsUser = {
  /** Specifies if customer accepted Withings commercial contacts. */
  mailingpref: boolean;
  /** Unix timestamp of user's birthdate */
  birthdate: number;
  /** 0: man, 1: woman */
  gender: 0 | 1;
  /**
   * User language preference.
   * @examples en_EN, en_US, de_DE, es_ES, fr_FR, it_IT, ja_JA, ko_KR, nl_NL, pt_PT, ru_RU, zh_CN
   */
  preflang: string;
  /** User's email address */
  email: string;
  /**
   * User's timezone.
   * A complete list of all possible timezones can be found on the "TZ database name" column of [this page]{@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}
   * @examples: "Europe/Paris", "America/New_York".
   */
  timezone: string;
  /** User's firstname (if not set, will take the same value as shortname) */
  firstname?: string;
  /** User's lastname (if not set, will take the same value as shortname) */
  lastname?: string;
  /** Phone number in E.164 format. End user will receive a verification code on this phone number for 2 factor authentication if they wish to securely access the data of their program in the withings app in the future (recommended). */
  phonenumber?: string;
  /** Unit pref (cf. [Unit preferences]{@link https://developer.withings.com/api-reference/#tag/models/Unit-preferences} model). */
  unit_pref: WithingsUnitPreference;
};

export type WithingsUserCreateRequest = WithingsUser & {
  /** User measures (Cf. [Measures model]{@link https://developer.withings.com/api-reference/#tag/models/Measures}). */
  measures: WithingsMeasure[];
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
  /**
   * Recovery code can be used by end user as a 2nd authentication factor in the withings app if they wish to securely access the data of their program in the future.
   * You will be responsible of securely providing this recovery code to your user if he asks for it.
   */
  recovery_code?: string;
  /** Goals */
  goals?: WithingsGoal[];
};

export type WithingsUserActivateRequest = {
  /** Must take the constant string value <b>activate</b>. */
  action?: 'activate';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /**
   * List of Withings device MAC addresses that will be linked to the created user.
   * @Example: ["00:24:e4:xx:xx:xx","00:24:e4:xx:xx:xx"]
   */
  mac_addresses: string[];
  /** Scope oauth2 */
  scope_oauth2?: string;
  /** Account's password. */
  password?: string;
  /**
   * The URI we should redirect the user to after choosing to authorize or not your app.
   * This URI must be set as <b>Callback Url</b> in your partner application.
   * It is possible to use multiple URLs by separating them with a comma.
   *
   * * Examples:
   *
   * Callbacks: https://mydomain.com/
   * Callback: https://mydomain.com/,https://mydomain2.com/
   * Valid URL: https://mydomain.com/relative_path?args=value
   */
  redirect_uri?: string;
} & WithingsUserCreateRequest &
  WithingSignatureRequest;

export type WithingsUserActivateResponse = {
  user: {
    code: string;
    external_id: string;
  };
  devices: WithingsDevice[];
};

export type WithingsUserGetRequest = {
  /** Must take the constant string value <b>get</b>. */
  action?: 'get';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** User's email address */
  email: string;
} & WithingSignatureRequest;

export type WithingsUserGetResponse = {
  user: WithingsUser;
};

export type WithingsUserDeviceRequest = {
  /** Must take the constant string value <b>getdevice</b>. */
  action?: 'getdevice';
};

export type WithingsUserDeviceResponse = {
  devices: WithingsDevice[];
};

export type WithingsUserGoalsRequest = {
  /** Must take the constant string value <b>getgoals</b>. */
  action?: 'getgoals';
};

export type WithingsUserGoalsResponse = {
  goals: WithingsGoal[];
};

export type WithingsUserLinkRequest = {
  /** Service action name. Must take the constant string value <b>link</b>. */
  action?: 'link';
  /**
   * List of Withings device MAC addresses that will be linked to the created user.
   * @Example: ["00:24:e4:xx:xx:xx","00:24:e4:xx:xx:xx"]
   */
  mac_addresses: string[];
};

export type WithingsUserUnLinkRequest = {
  /** Service action name. Must take the constant string value <b>unlink</b>. */
  action?: 'unlink';
  /** The mac address of the target device. */
  mac_address: string;
};
