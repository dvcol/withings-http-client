export type WithingsSleepData = {
  startdate: number;
  enddate: number;
  state: number;
  model: string;
  model_id: number;
} & Record<WithingsSleepDataFields, Record<string, number>>;

export const WithingsSleepDataField = {
  /** Heart Rate. */
  HeartRate: 'hr',
  /** Respiration Rate. */
  RespirationRate: 'rr',
  /** Total snoring time */
  Snoring: 'snoring',
  /** Heart rate variability - Standard deviation of the NN over 1 minute */
  HeartRateVariabilitySd: 'sdnn_1',
  /** Heart rate variability - Root mean square of the successive differences over "a few seconds" */
  HeartRateVariabilityRmssd: 'rmssd',
  /** Track the intensity of movement in bed on a minute-by-minute basis. Only available for EU devices and devices under prescription. */
  MovementScore: 'mvt_score',
} as const;

export type WithingsSleepDataFields = (typeof WithingsSleepDataField)[keyof typeof WithingsSleepDataField];

export type WithingsSleepGetRequest = {
  /** Service action name. Must take the constant string value <b>get</b> */
  action: 'get';
  /** Data start date as a unix timestamp. */
  startdate: number;
  /** Data end date as a unix timestamp. */
  enddate: number;
  /**
   * List of requested data fields, separated by a comma.
   * @example "hr,rr,snoring"
   */
  data_fields?: string | WithingsSleepDataFields | WithingsSleepDataFields[];
  /**
   * List of requested measure types (separated by a comma).
   * @example "1,4,12"
   */
  meastypes?: string | string[] | number | number[];
};

export type WithingsSleepGetResponse = {
  series: WithingsSleepData[];
};

export const WithingsStandardSleepMedicineMetric = {
  /** Count of the REM sleep phases. */
  NbRemEpisodes: 'nb_rem_episodes',
  /** Ratio of the total sleep time over the time spent in bed. */
  SleepEfficiency: 'sleep_efficiency',
  /** Time spent in bed before falling asleep. */
  SleepLatency: 'sleep_latency',
  /** Total time spent asleep. Sum of light, deep and rem durations. */
  TotalSleepTime: 'total_sleep_time',
  /** Total time spent in bed. */
  TotalTimeInBed: 'total_timeinbed',
  /** Time spent in bed after waking up. */
  WakeupLatency: 'wakeup_latency',
  /** Time spent awake in bed after falling asleep for the 1st time during the night. */
  Waso: 'waso',
} as const;

export type WithingsStandardSleepMedicineMetrics = (typeof WithingsStandardSleepMedicineMetric)[keyof typeof WithingsStandardSleepMedicineMetric];

export const WithingsSleepApneaAndBreathingDisturbancesMetric = {
  /**
   * Medical grade AHI.
   * Only available for devices purchased in Europe and Australia, with the sleep apnea detection feature activated.
   * Average number of hypopnea and apnea episodes per hour, that occured during sleep time.
   */
  ApneaHypopneaIndex: 'apnea_hypopnea_index',
  /**
   * Wellness metric, available for all Sleep and Sleep Analyzer devices.
   * Intensity of breathing disturbances
   */
  BreathingDisturbancesIntensity: 'breathing_disturbances_intensity',
} as const;

export type WithingsSleepApneaAndBreathingDisturbancesMetrics =
  (typeof WithingsSleepApneaAndBreathingDisturbancesMetric)[keyof typeof WithingsSleepApneaAndBreathingDisturbancesMetric];

export const WithingsSleepNightEvent = {
  /** got in bed */
  GotInBed: 1,
  /** fell asleep */
  FellAsleep: 2,
  /** woke up */
  WokeUp: 3,
  /** got out of bed */
  GotOutOfBed: 4,
  /** start of asleep period that was manually input */
  StartOfAsleepPeriod: 5,
  /** start of awake period that was manually input */
  StartOfAwakePeriod: 6,
} as const;

export type WithingsSleepNightEvents = (typeof WithingsSleepNightEvent)[keyof typeof WithingsSleepNightEvent];

export const WithingsSleepOtherMetric = {
  /** Duration of sleep when night comes from external source (light, deep and rem sleep durations are null in this case). */
  AsleepDuration: 'asleepduration',
  /** Duration in state deep sleep (in seconds). */
  DeepSleepDuration: 'deepsleepduration',
  /** Time to sleep (in seconds). (deprecated) */
  DurationToSleep: 'durationtosleep',
  /** Time to wake up (in seconds). (deprecated) */
  DurationToWakeUp: 'durationtowakeup',
  /** Average heart rate. */
  HeartRateAverage: 'hr_average',
  /** Maximal heart rate. */
  HeartRateMax: 'hr_max',
  /** Minimal heart rate. */
  HeartRateMin: 'hr_min',
  /** Duration in state light sleep (in seconds). */
  LightSleepDuration: 'lightsleepduration',
  /** Track the duration of movement in bed. Only available for EU devices and devices under prescription. */
  MovementActiveDuration: 'mvt_active_duration',
  /** mvt_score average for the full sleep duration. Only available for EU devices and devices under prescription. */
  MovementScoreAverage: 'mvt_score_avg',
  /** Summary of sleep events that happened during the sleep activity. */
  NightEvents: 'night_events',
  /** Number of times the user got out of bed during the night. */
  OutOfBedCount: 'out_of_bed_count',
  /** Duration in state REM sleep (in seconds). */
  RemSleepDuration: 'remsleepduration',
  /** Average respiration rate. */
  RespirationRateAverage: 'rr_average',
  /** Maximal respiration rate. */
  RespirationRateMax: 'rr_max',
  /** Minimal respiration rate. */
  RespirationRateMin: 'rr_min',
  /** Sleep score */
  SleepScore: 'sleep_score',
  /** Total snoring time */
  Snoring: 'snoring',
  /** Numbers of snoring episodes of at least one minute */
  SnoringEpisodeCount: 'snoringepisodecount',
  /** Number of times the user woke up while in bed. Does not include the number of times the user got out of bed. */
  WakeUpCount: 'wakeupcount',
  /** Time spent awake (in seconds). */
  WakeUpDuration: 'wakeupduration',
  /** withings_index */
  WithingsIndex: 'withings_index',
};

export type WithingsSleepOtherMetrics = (typeof WithingsSleepOtherMetric)[keyof typeof WithingsSleepOtherMetric];

export type WithingsSleepMetrics =
  | WithingsStandardSleepMedicineMetrics
  | WithingsSleepApneaAndBreathingDisturbancesMetrics
  | WithingsSleepOtherMetrics;

export type WithingsSleepSummary = {
  timezone: string;
  model: number;
  model_id: number;
  startdate: number;
  enddate: number;
  date: string;
  created: number;
  modified: number;
  data: Record<WithingsSleepMetrics, number>;
};

export type WithingsSleepSummaryRequest = {
  /** Service action name. Must take the constant string value <b>getsummary</b> */
  action: 'getsummary';
  /**
   * Start date. Required if no lastupdate.
   *
   * * <b>Important:</b> Only use if lastupdate is not provided.
   */
  startdateymd: string;
  /**
   * End date. Required if no startdateymd.
   *
   * * <b>Important:</b> Only use if lastupdate is not provided.
   */
  enddateymd: string;
  /**
   * Timestamp for requesting data that were updated or created after this date.
   * Useful for data synchronization between systems.
   * Use this instead of startdateymd + enddateymd.
   *
   * * <b>Important:</b> Only use if startdateymd and enddateymd are not provided.
   */
  lastupdate: number;
  data_fields: string | WithingsSleepMetrics | WithingsSleepMetrics[];
};

export type WithingsSleepSummaryResponse = {
  more: boolean;
  offset: number;
  data: WithingsSleepSummary;
};
