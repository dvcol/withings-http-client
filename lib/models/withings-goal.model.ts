/**
 * Optionally, partner can specify end-user goals.
 * The <b>goals</b> parameter must be composed of a <b>JSON</b> object with the following parameter:
 */
export type WithingsGoal = {
  /** Number of steps per day */
  steps: number;
  /** Sleep duration (in seconds) */
  sleep: number;
  /** Weight */
  weight: WithingsWeight;
};

export type WithingsWeight = {
  /** Weight value as integer, in kilograms */
  value: number;
  /**
   * Decimal exponent to get the parameter value in kilos.
   * @example value=8000, unit=-2, Weight=80kg
   */
  unit: number;
};
