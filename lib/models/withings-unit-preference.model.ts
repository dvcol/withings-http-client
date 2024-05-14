/**
 *
 * <b>Important</b>: please note that even if weight and height unit preferences are not in kilograms or meters, the measure values of Measures model must be set in kilograms and meters.
 */
export type WithingsUnitPreference = {
  weight: number;
  height: number;
  distance: number;
  temperature: number;
};

export const WithingsUnitPreferenceWeight = {
  /** kilogram (kg) */
  Kilogram: 1,
  /** pound (lb) */
  Pound: 2,
  /** Imperial stone:pound (StLb) */
  ImperialStone: 14,
} as const;

export const WithingsUnitPreferenceHeight = {
  Meter: 6,
  Inch: 7,
} as const;

export const WithingsUnitPreferenceDistance = {
  Kilometer: 6,
  Yard: 8,
} as const;

export const WithingsUnitPreferenceTemperature = {
  Celsius: 11,
  Fahrenheit: 13,
} as const;
