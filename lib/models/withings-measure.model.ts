/**
 * The following table presents the required measure data that is contained in the user data <b>measures</b> parameter.
 * The <b>measures</b> parameter must be composed of two mandatory <b>JSON</b> objects, one for the weight measurement and another with the height measurement, both with the following parameter:
 *
 * Important: please note that weight value must be in kilograms and height value in meters.
 * The weight must be between 1 and 600kg and the height between 0.1 and 3m.
 */
export type WithingsMeasure = {
  /** Height or weight value as integer not float. Ex: 187 or 6000 */
  value: number;
  /** Decimal exponent to get the parameter <b>value</b> in meters and kilos. Ex: value=187. unit=-2. Height=1,87m */
  unit: number;
  type: WithingsMeasureTypes;
  algo?: number;
  fm?: number;
  position?: number;
};

export type WithingsMeasureGroup = {
  grpid: number;
  attrib: number;
  date: number;
  created: number;
  modified: number;
  category: number;
  deviceid: string;
  hash_deviceid: string;
  comment: string;
  timezone: string;
  measures: WithingsMeasure[];
};

export const WithingsMeasureType = {
  /** Weight (kg) */
  Weight: 1,
  /** Height (meter) */
  Height: 4,
  /** Fat Free Mass (kg) */
  FatFreeMass: 5,
  /** Fat Ratio (%) */
  FatRatio: 6,
  /** Fat Mass Weight (kg) */
  FatMassWeight: 8,
  /** Diastolic Blood Pressure (mmHg) */
  DiastolicBloodPressure: 9,
  /** Systolic Blood Pressure (mmHg) */
  SystolicBloodPressure: 10,
  /** Heart Pulse (bpm) - only for BPM and scale devices */
  HeartPulse: 11,
  /** Temperature (celsius) */
  Temperature: 12,
  /** SP02 (%) */
  SP02: 54,
  /** Body Temperature (celsius) */
  BodyTemperature: 71,
  /** Skin Temperature (celsius) */
  SkinTemperature: 73,
  /** Muscle Mass (kg) */
  MuscleMass: 76,
  /** Hydration (kg) */
  Hydration: 77,
  /** Bone Mass (kg) */
  BoneMass: 88,
  /** Pulse Wave Velocity (m/s) */
  PulseWaveVelocity: 91,
  /** VO2 max is a numerical measurement of your body’s ability to consume oxygen (ml/min/kg). */
  VO2Max: 123,
  /** Atrial fibrillation result */
  AtrialFibrillation: 130,
  /** QRS interval duration based on ECG signal */
  QRSIntervalDuration: 135,
  /** PR interval duration based on ECG signal */
  PRIntervalDuration: 136,
  /** QT interval duration based on ECG signal */
  QTIntervalDuration: 137,
  /** Corrected QT interval duration based on ECG signal */
  CorrectedQTIntervalDuration: 138,
  /** Atrial fibrillation result from PPG */
  AtrialFibrillationPPG: 139,
  /** Vascular age */
  VascularAge: 155,
  /** Nerve Health Score Conductance 2 electrodes Feet */
  NerveHealthScore: 167,
  /** Extracellular Water in kg */
  ExtracellularWater: 168,
  /** Intracellular Water in kg */
  IntracellularWater: 169,
  /** Visceral Fat (without unity) */
  VisceralFat: 170,
  /** Fat Mass for segments in mass unit */
  FatMassForSegments: 174,
  /** Muscle Mass for segments */
  MuscleMassForSegments: 175,
  /** Electrodermal activity feet */
  ElectrodermalActivityFeet: 196,
} as const;

export type WithingsMeasureTypes = (typeof WithingsMeasureType)[keyof typeof WithingsMeasureType];

export const WithingsMeasureField = {
  /** Number of steps. */
  Steps: 'steps',
  /** Distance travelled (in meters). */
  Distance: 'distance',
  /** Number of floors climbed. */
  Elevation: 'elevation',
  /** Duration of soft activities (in seconds). */
  Soft: 'soft',
  /** Duration of moderate activities (in seconds). */
  Moderate: 'moderate',
  /** Duration of intense activities (in seconds). */
  Intense: 'intense',
  /** Sum of intense and moderate activity durations (in seconds). */
  Active: 'active',
  /** Active calories burned (in Kcal). Calculated by mixing fine granularity calories estimation, workouts estimated calories and calories manually set by the user. */
  Calories: 'calories',
  /** Total calories burned (in Kcal). Obtained by adding active calories (see calories) and passive calories. */
  TotalCalories: 'totalcalories',
  /** Average heart rate. */
  AverageHeartRate: 'hr_average',
  /** Minimal heart rate. */
  MinHeartRate: 'hr_min',
  /** Maximal heart rate. */
  MaxHeartRate: 'hr_max',
  /** Duration in seconds when heart rate was in a light zone (cf. [Glossary]{@link https://developer.withings.com/api-reference/#section/Glossary}). */
  HeartRateZone0: 'hr_zone_0',
  /** Duration in seconds when heart rate was in a moderate zone (cf. [Glossary]{@link https://developer.withings.com/api-reference/#section/Glossary}). */
  HeartRateZone1: 'hr_zone_1',
  /** Duration in seconds when heart rate was in an intense zone (cf. [Glossary]{@link https://developer.withings.com/api-reference/#section/Glossary}). */
  HeartRateZone2: 'hr_zone_2',
  /** Duration in seconds when heart rate was in maximal zone (cf. [Glossary]{@link https://developer.withings.com/api-reference/#section/Glossary}). */
  HeartRateZone3: 'hr_zone_3',
} as const;

export type WithingsMeasureFields = (typeof WithingsMeasureField)[keyof typeof WithingsMeasureField];

export type WithingsActivity = {
  date: string;
  timezone: string;
  deviceid: string;
  hash_deviceid: string;
  brand: number;
  is_tracker: boolean;
} & Record<WithingsMeasureFields, number>;

export const WithingsActivityIntraDayField = {
  /** Number of steps. */
  Steps: 'steps',
  /** Number of floors climbed. */
  Elevation: 'elevation',
  /** Estimation of active calories burned (in Kcal). */
  Calories: 'calories',
  /** Distance travelled (in meters). */
  Distance: 'distance',
  /** Number of strokes performed. */
  Stroke: 'stroke',
  /** Number of pool lap performed. */
  PoolLap: 'pool_lap',
  /** Duration of the activity (in seconds). */
  Duration: 'duration',
  /** Measured heart rate. */
  HeartRate: 'heart_rate',
  /** SpO2 measurement automatically tracked by a device tracker. */
  SpO2Auto: 'spo2_auto',
};

export type WithingsActivityIntraDayFields = (typeof WithingsActivityIntraDayField)[keyof typeof WithingsActivityIntraDayField];

export type WithingsActivityIntraDay = {
  deviceid: string;
  model: string;
  model_id: number;
} & Record<WithingsActivityIntraDayFields, number>;

export const WithingsWorkoutField = {
  /** Active calories burned (in Kcal). */
  Calories: 'calories',
  /** Intensity of the workout, from 0 to 100, as inputed by the user. If the user didn't manually give the intensity of his workout, the value will be 0. */
  Intensity: 'intensity',
  /** Distance travelled manually entered by user (in meters). */
  ManualDistance: 'manual_distance',
  /** Active calories burned manually entered by user (in Kcal). */
  ManualCalories: 'manual_calories',
  /** Average heart rate. */
  AverageHeartRate: 'hr_average',
  /** Minimal heart rate. */
  MinHeartRate: 'hr_min',
  /** Maximal heart rate. */
  MaxHeartRate: 'hr_max',
  /** Duration in seconds when heart rate was in a light zone (cf. [Glossary]{@link https://developer.withings.com/api-reference/#section/Glossary}). */
  HeartRateZone0: 'hr_zone_0',
  /** Duration in seconds when heart rate was in a moderate zone (cf. [Glossary]{@link https://developer.withings.com/api-reference/#section/Glossary}). */
  HeartRateZone1: 'hr_zone_1',
  /** Duration in seconds when heart rate was in an intense zone (cf. [Glossary]{@link https://developer.withings.com/api-reference/#section/Glossary}). */
  HeartRateZone2: 'hr_zone_2',
  /** Duration in seconds when heart rate was in maximal zone (cf. [Glossary]{@link https://developer.withings.com/api-reference/#section/Glossary}). */
  HeartRateZone3: 'hr_zone_3',
  /** Total pause time in second filled by user. */
  PauseDuration: 'pause_duration',
  /** Total pause time in seconds detected by Withings device (swim only). */
  AlgoPauseDuration: 'algo_pause_duration',
  /** Average percent of SpO2 percent value during a workout. */
  SpO2Average: 'spo2_average',
  /** Number of steps. */
  Steps: 'steps',
  /** Distance travelled (in meters). */
  Distance: 'distance',
  /** Number of floors climbed. */
  Elevation: 'elevation',
  /** Number of pool laps. */
  PoolLaps: 'pool_laps',
  /** Number of strokes. */
  Strokes: 'strokes',
  /** Length of the pool. */
  PoolLength: 'pool_length',
} as const;

export type WithingsWorkoutFields = (typeof WithingsWorkoutField)[keyof typeof WithingsWorkoutField];

export type WithingsWorkout = {
  category: number;
  timezone: string;
  model: number;
  attrib: number;
  startdate: number;
  enddate: number;
  date: string;
  modified: number;
  deviceid: string;
  data: Record<WithingsWorkoutFields, number>;
};

export type WithingsMeasureGetRequest = {
  /** Service action name. Must take the constant string value <b>getmeas</b>. */
  action: 'getmeas';
  /** Requested measure type. */
  meastype?: WithingsMeasureTypes;
  /**
   * List of requested measure types (separated by a comma).
   * @example: "1,4,12"
   */
  meastypes?: string | WithingsMeasureTypes | WithingsMeasureTypes[];
  /** 1 for real measures, 2 for user objectives. */
  category?: 1 | 2;
  /** Data start date as a unix timestamp. */
  startdate?: number;
  /** Data end date as a unix timestamp. */
  enddate?: number;
  /**
   * Timestamp for requesting data that were updated or created after this date.
   * Useful for data synchronization between systems.
   * Use this instead of startdate + enddate.
   */
  lastupdate?: number;
  /** When a first call returns <b>more:1</b> and <b>offset:XX</b>, set value <b>XX</b> in this parameter to retrieve next available rows. */
  offset?: number;
};

export type WithingsMeasureGetResponse = {
  updatetime: string;
  timezone: string;
  more: boolean;
  offset: number;
  measuregrps: WithingsMeasureGroup[];
};

export type WithingsMeasureConfirmRequest = {
  /** Service action name. Must take the constant string value <b>confirmuser</b>. */
  action: 'confirmuser';
  /** Measure group identifier. */
  grpid: number;
  /** Indicates if the measure is was confirmed by the user. */
  is_confirmed: boolean;
};

export type WithingsMeasureActivityRequest = {
  /** Service action name. Must take the constant string value <b>getactivity</b>. */
  action: 'getactivity';
  /**
   * Start date.
   *
   * * <b>Important</b>: Only use if lastupdate is not provided.
   */
  startdateymd?: string;
  /**
   * End date.
   *
   * * <b>Important</b>: Only use if lastupdate is not provided.
   */
  enddateymd?: string;
  /**
   * Timestamp for requesting data that were updated or created after this date.
   *
   * Useful for data synchronization between systems.
   * Use this instead of startdateymd + enddateymd.
   *
   * * <b>Important</b>: Only use if startdateymd and enddateymd are not provided.
   */
  lastupdate?: number;
  /** When a first call returns <b>more:1</b> and <b>offset:XX</b>, set value <b>XX</b> in this parameter to retrieve next available rows. */
  offset?: number;
  /**
   * List of requested data fields (separated by a comma).
   * @example: "steps,distance,elevation"
   */
  data_fields?: string | WithingsMeasureFields | WithingsMeasureFields[];
};

export type WithingsMeasureActivityResponse = {
  more: boolean;
  offset: number;
  activities: WithingsActivity[];
};

export type WithingsMeasureActivityIntraDayRequest = {
  /** Service action name. Must take the constant string value <b>getintradayactivity</b>. */
  action: 'getintradayactivity';
  /** Start date as a unix timestamp. */
  startdate?: number;
  /** End date as a unix timestamp. */
  enddate?: number;
  /**
   * List of requested data fields, separated by a comma.
   * @example: "steps,elevation,calories"
   */
  data_fields?: string | WithingsActivityIntraDayFields | WithingsActivityIntraDayFields[];
};

export type WithingsMeasureActivityIntraDayResponse = {
  series: Record<string, WithingsActivityIntraDay>;
};

export type WithingsMeasureWorkoutRequest = {
  /** Service action name. Must take the constant string value <b>getworkouts</b>. */
  action: 'getworkouts';
  /**
   * Start date.
   *
   * * <b>Important</b>: Only use if lastupdate is not provided.
   */
  startdateymd?: string;
  /**
   * End date.
   *
   * * <b>Important</b>: Only use if lastupdate is not provided.
   */
  enddateymd?: string;
  /**
   * Timestamp for requesting data that were updated or created after this date.
   * Useful for data synchronization between systems.
   * Use this instead of startdateymd + enddateymd.
   *
   * * <b>Important</b>: Only use if startdateymd and enddateymd are not provided.
   */
  lastupdate?: number;
  /** When a first call returns <b>more:1</b> and <b>offset:XX</b>, set value <b>XX</b> in this parameter to retrieve next available rows. */
  offset?: number;
  /**
   * List of requested data fields (separated by a comma).
   * @example: "calories,intensity,manual_distance"
   */
  data_fields?: string | WithingsWorkoutFields | WithingsWorkoutFields[];
};

export type WithingsMeasureWorkoutResponse = {
  more: boolean;
  offset: number;
  series: WithingsWorkout[];
};
