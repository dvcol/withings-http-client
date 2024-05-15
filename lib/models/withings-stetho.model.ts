export type WithingsStetho = {
  signal: string;
  frequency: number;
  duration: number;
  format: number;
  size: number;
  resolution: number;
  channel: number;
  model: number;
  vhd: number;
};

export type WithingsStethoRequest = {
  /** Service action name. Must take the constant string value <b>get</b> */
  action: 'get';
  /** The ID of the signal to get. */
  signalid: string;
};

export type WithingsStethoListRequest = {
  /** Service action name. Must take the constant string value <b>list</b> */
  action: 'list';
  /** Data start date as a unix timestamp. */
  startdate?: number;
  /** Data end date as a unix timestamp. */
  enddate?: number;
  /** When a first call returns <b>more:1</b> and <b>offset:XX</b>, set value <b>XX</b> in this parameter to retrieve next available rows. */
  offset?: number;
};

export type WithingsStethoData = {
  hash_deviceid: string;
  signal: number;
  vhd: number;
  timestamp: number;
  timezone: string;
};

export type WithingsStethoListResponse = {
  more: boolean;
  offset: number;
  series: WithingsStethoData[];
};
