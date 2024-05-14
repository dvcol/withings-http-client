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
  /** Possible values are: Height = 4. Weight = 1. */
  type: 3 | 4;
};
