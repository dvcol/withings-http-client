import type { WithingSignatureRequest } from '~/models/withings-signature.model';

export type WithingsDevice = {
  mac_address?: string;
  type: string;
  model: string;
  model_id: number;
  battery: string;
  deviceid: string;
  hash_deviceid?: string;
  timezone: string;
  first_session_date?: string;
  last_session_date: string;
};

// Feature Name	Description	Compatible Model	Activated by Default
// feature_muscle_mass	Measures muscle mass.	Body Pro 2 (model: 17)	✅
// feature_fat_mass	Measures fat mass.	Body Pro 2 (model: 17)	✅
// feature_bone_mass	Measures bone mass.	Body Pro 2 (model: 17)	✅
// feature_water_percent	Measures water percentage.	Body Pro 2 (model: 17)	✅
// feature_body_mass_index	Calculates Body Mass Index (BMI).	Body Pro 2 (model: 17)	✅
// feature_visceral_fat	Measures visceral fat.	Body Pro 2 (model: 17)	✅
// feature_standing_hr	Monitors standing heart rate.	Body Pro 2 (model: 17)	✅
// feature_eyes_closed_mode	Hides weight during measurement.	Body Pro 2 (model: 17)	❌
// feature_pacemaker	Adjusts for pacemaker users.	Body Pro 2 (model: 17)	❌
// feature_vascular_age	Estimates vascular age.	Body Pro 2 (model: 17)	✅
// feature_esc	Measures Electrochemical Skin Conductance.	Body Pro 2 (model: 17) (By prescription only)	❌
// feature_nhs	Measures Nerve Health Score.	Body Pro 2 (model: 17) (🇪🇺 models only)	✅
// feature_pwv	Measures pulse wave velocity.	Body Pro 2 (model: 17)	❌
// feature_sleep_rx	Measures sleep Apnea.	Sleep Sensor (model: 63)	❌

export const WithingsDeviceFeature = {
  /**
   * Measures muscle mass.
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Activated by Default: ✅
   */
  MuscleMass: 'feature_muscle_mass',
  /**
   * Measures fat mass.
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Activated by Default: ✅
   */
  FatMass: 'feature_fat_mass',
  /**
   * Measures bone mass.
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Activated by Default: ✅
   */
  BoneMass: 'feature_bone_mass',
  /**
   * Measures water percentage.
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Activated by Default: ✅
   */
  WaterPercent: 'feature_water_percent',
  /**
   * Calculates Body Mass Index (BMI).
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Activated by Default: ✅
   */
  BodyMassIndex: 'feature_body_mass_index',
  /**
   * Measures visceral fat.
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Activated by Default: ✅
   */
  VisceralFat: 'feature_visceral_fat',
  /**
   * Monitors standing heart rate.
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Activated by Default: ✅
   */
  StandingHeartRate: 'feature_standing_hr',
  /**
   * Hides weight during measurement.
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Activated by Default: ❌
   */
  EyesClosedMode: 'feature_eyes_closed_mode',
  /**
   * Adjusts for pacemaker users.
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Activated by Default: ❌
   */
  Pacemaker: 'feature_pacemaker',
  /**
   * Estimates vascular age.
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Activated by Default: ✅
   */
  VascularAge: 'feature_vascular_age',
  /**
   * Measures Electrochemical Skin Conductance.
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Note: (By prescription only)
   * Activated by Default: ❌
   */
  ElectrochemicalSkinConductance: 'feature_esc',
  /**
   * Measures Nerve Health Score.
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Note: (European 🇪🇺 models only)
   * Activated by Default: ✅
   */
  NerveHealthScore: 'feature_nhs',
  /**
   * Measures pulse wave velocity.
   *
   * Compatible Model: Body Pro 2 (model: 17)
   * Activated by Default: ❌
   */
  PulseWaveVelocity: 'feature_pwv',
  /**
   * Measures sleep Apnea.
   *
   * Compatible Model: Sleep Sensor (model: 63)
   * Activated by Default: ❌
   */
  SleepApnea: 'feature_sleep_rx',
} as const;

export type WithingsDeviceFeatures = (typeof WithingsDeviceFeature)[keyof typeof WithingsDeviceFeature];

type WithingsDeviceFeatureRequest = {
  /** The client identifier. */
  client_id: string;
  /** Name of the feature to enable / disable. Cf [Feature Name List]{@link https://developer.withings.com/developer-guide/v3/integration-guide/features-api/features-api-enable#available-features} */
  feature_name: string | WithingsDeviceFeatures;
  /** User's identifier. */
  userid: string;
  /** Model integer value of a device or a consumable */
  model: number;
} & WithingSignatureRequest;

export type WithingsDeviceDisableFeatureRequest = {
  /** Service action name. Must take the string value <b>disablefeature</b> */
  action: 'disablefeature';
} & WithingsDeviceFeatureRequest;

export type WithingsDeviceEnableFeatureRequest = {
  /** Service action name. Must take the string value <b>enablefeature</b> */
  action: 'enablefeature';
} & WithingsDeviceFeatureRequest;

export type WithingsDeviceUpdateSIMStatusRequest = {
  /** Service action name. Must take the string value <b>updatesimstatus</b> */
  action: 'updatesimstatus';
  /** The client identifier. */
  client_id: string;
  /** The mac address of the target device. */
  mac_address: string;
  /** Required SIM status. Allowed values are STANDBY and TERMINATED. */
  sim_status: 'STANDBY' | 'TERMINATED';
} & WithingsDeviceFeatureRequest;
