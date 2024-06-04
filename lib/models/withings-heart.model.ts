import type { WithingsPaginated } from '~/models/withings-client.model';

/**
 * To get the signal details, either use:
 * * the <b>signalid</b> and an <b>access_token</b>
 * * or the <b>client_id</b>, <b>signature</b>, <b>nonce</b> and a <b>signal_token</b>.
 */
export type WithingsHeartGetRequest = {
  /** Service action name. Must take the constant string value <b>get</b> */
  action?: 'get';
  /**
   * The identifier of the signal to get.
   *
   * * <b>Important</b>: Only use if client_id, signature, nonce and signal_token are not provided.
   */
  signalid: string;
  /**
   * The client identifier.
   *
   * * <b>Important</b>: Only use if access_token and signalid are not provided.
   */
  client_id: string;
  /**
   * A Hash of params (Cf. [Signature hash protocol]{@link https://developer.withings.com/developer-guide/v3/get-access/sign-your-requests}).
   *
   * * <b>Important</b>: Only use if access_token and signalid are not provided.
   */
  signature: string;
  /**
   * A random token used to prevent replay attacks (Cf. [Signature v2 - Getnonce]{@link https://developer.withings.com/api-reference/#operation/signaturev2-getnonce}).
   *
   * * <b>Important</b>: Only use if access_token and signalid are not provided.
   */
  nonce: string;
  /**
   * The signal token identifier.
   *
   * * <b>Important</b>: Only use if access_token and signalid are not provided.
   */
  signal_token: string;
};

export type WithingsHeartGetResponse = {
  signal: string;
  sampling_frequency: number;
  wearposition: string;
};

export type WithingsHeartListRequest = {
  /** Service action name. Must take the constant string value <b>list</b> */
  action?: 'list';
  /** Data start date as a unix timestamp. */
  startdate?: number;
  /** Data end date as a unix timestamp. */
  enddate?: number;
  /** When a first call returns <b>more:1</b> and <b>offset:XX</b>, set value <b>XX</b> in this parameter to retrieve next available rows. */
  offset?: number;
};

export type WithingsHeartData = {
  deviceid: string;
  model: number;
  ecg: {
    signalid: number;
    afib: number;
  };
  bloodpressure: {
    diastole: number;
    systole: number;
  };
  heart_rate: number;
  timestamp: number;
  timezone: string;
};

export type WithingsHeartListResponse = WithingsPaginated<{
  series: WithingsHeartData[];
}>;
