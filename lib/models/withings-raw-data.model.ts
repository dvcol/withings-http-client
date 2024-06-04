import type { WithingsPaginated } from '~/models/withings-client.model';

export type WithingsRawData = {
  data: string;
  hash_deviceid: string;
  type: number;
  format_version: number;
  firmware_version: number;
  sensor_name: string;
  startdate: number;
  enddate: number;
};

export type WithingsRawDataActivateRequest = {
  /** Service action name. Must take the constant string value <b>activate</b> */
  action?: 'activate';
  /**
   * Public device id.
   * For any device installed on a user account, can be found by calling the [User v2 - Get]{@link Public device id. For any device installed on a user account, can be found by calling the User v2 - Get webservice.} webservice.
   */
  hash_deviceid: string;
  /**
   * The type of raw data you want to act upon.
   * Set to 1 for accelerometer, set to 2 for optical sensor.
   */
  rawdata_type: 1 | 2;
  /**
   * The date at which the raw data collection will stop.
   * The date must be a unix timestamp.
   */
  enddate?: number;
};

export type WithingsRawDataDeactivateRequest = {
  /** Service action name. Must take the constant string value <b>deactivate</b> */
  action?: 'deactivate';
  /**
   * Public device id.
   * For any device installed on a user account, can be found by calling the [User v2 - Get]{@link Public device id. For any device installed on a user account, can be found by calling the User v2 - Get webservice.} webservice.
   */
  hash_deviceid: string;
  /**
   * The type of raw data you want to act upon.
   * Set to 1 for accelerometer, set to 2 for optical sensor.
   */
  rawdata_type: 1 | 2;
};

export type WithingsRawDataGetRequest = {
  /** Service action name. Must take the constant string value <b>get</b> */
  action?: 'get';
  /**
   * Public device id.
   * For any device installed on a user account, can be found by calling the [User v2 - Get]{@link Public device id. For any device installed on a user account, can be found by calling the User v2 - Get webservice.} webservice.
   */
  hash_deviceid: string;
  /**
   * The type of raw data you want to act upon.
   * Set to 1 for accelerometer, set to 2 for optical sensor.
   */
  rawdata_type: 1 | 2;
  /**
   * Data start date as a unix timestamp.
   */
  startdate: number;
  /**
   * Data end date as a unix timestamp.
   */
  enddate: number;
  /**
   * When a first call returns <b>more:1</b> and <b>offset:XX</b>, set value <b>XX</b> in this parameter to retrieve next available rows.
   */
  offset?: number;
};

export type WithingsRawDataResponse = WithingsPaginated<{
  rawdata: WithingsRawData[];
}>;
