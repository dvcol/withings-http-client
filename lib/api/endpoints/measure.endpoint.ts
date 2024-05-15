import { HttpMethod } from '@dvcol/base-http-client/utils/http';

import type {
  WithingsMeasureActivityIntraDayRequest,
  WithingsMeasureActivityIntraDayResponse,
  WithingsMeasureActivityRequest,
  WithingsMeasureActivityResponse,
  WithingsMeasureConfirmRequest,
  WithingsMeasureGetRequest,
  WithingsMeasureGetResponse,
  WithingsMeasureWorkoutRequest,
  WithingsMeasureWorkoutResponse,
} from '~/models/withings-measure.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * The following services gives access to several types of Health Data collected by a user.
 * The data are only available once a synchronization occured between the device and Withings servers (which might include synchronizing with Withings mobile application or via Withings Mobile SDK).
 *
 * @see [measure]{@link https://developer.withings.com/api-reference/#tag/measure}
 */
export const measure = {
  /**
   * Provides measures stored at a specific date among the types below. Please refer to the following responses for details.
   *
   * @see [get]{@link https://developer.withings.com/api-reference/#tag/measure/operation/measure-getmeas}
   */
  get: new WithingsClientEndpoint<WithingsMeasureGetRequest, WithingsMeasureGetResponse>({
    method: HttpMethod.POST,
    url: '/v2/measure?action&meastype&meastypes&category&startdate&enddate&lastupdate&offset',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          meastype: false,
          meastypes: false,
          category: false,
          startdate: false,
          enddate: false,
          lastupdate: false,
          offset: false,
        },
      },
    },
    transform: param => (Array.isArray(param.meastypes) ? { ...param, meastypes: param.meastypes.join(',') } : param),
  }),
  /**
   * Confirm measures for a user.
   *
   * @see [confirm]{@link https://developer.withings.com/api-reference/#tag/measure/operation/measurev2-confirmuser}
   */
  confirm: new WithingsClientEndpoint<WithingsMeasureConfirmRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/measure?action&grpid&is_confirmed',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          grpid: true,
          is_confirmed: true,
        },
      },
    },
  }),
  /**
   * Provides daily aggregated activity data of a user.
   *
   * @see [activity]{@link https://developer.withings.com/api-reference/#tag/measure/operation/measurev2-getactivity}
   */
  activity: new WithingsClientEndpoint<WithingsMeasureActivityRequest, WithingsMeasureActivityResponse>({
    method: HttpMethod.POST,
    url: '/v2/measure?action&startdateymd&enddateymd&lastupdate&offset&data_fields',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          startdateymd: false,
          enddateymd: false,
          lastupdate: false,
          offset: false,
          data_fields: false,
        },
      },
    },
    transform: param => (Array.isArray(param.data_fields) ? { ...param, data_fields: param.data_fields.join(',') } : param),
  }),
  /**
   * Returns user activity data captured at high frequency.
   *
   * * <b>Notes:</b>
   *
   * If your input <b>startdate</b> and <b>enddate</b> are separated by more than 24h, only the first <b>24h</b> after <b>startdate</b> will be returned.
   * If no <b>startdate</b>  and <b>enddate</b> are passed as parameters, the most recent activity data will be returned.
   *
   * @see [getintradayactivity]{@link https://developer.withings.com/api-reference/#tag/measure/operation/measurev2-getintradayactivity}
   */
  activityIntraDay: new WithingsClientEndpoint<WithingsMeasureActivityIntraDayRequest, WithingsMeasureActivityIntraDayResponse>({
    method: HttpMethod.POST,
    url: '/v2/measure?action&startdate&enddate&data_fields',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          startdate: false,
          enddate: false,
          data_fields: false,
        },
      },
    },
    transform: param => (Array.isArray(param.data_fields) ? { ...param, data_fields: param.data_fields.join(',') } : param),
  }),
  /**
   * Returns workout summaries, which are an aggregation all data that was captured during that workout.
   *
   * Use the Measure v2 - [Getintradayactivity]{@link https://developer.withings.com/api-reference/#operation/measurev2-getintradayactivity} service to get the high frequency data used to build this summary.
   */
  workout: new WithingsClientEndpoint<WithingsMeasureWorkoutRequest, WithingsMeasureWorkoutResponse>({
    method: HttpMethod.POST,
    url: '/v2/measure?action&startdateymd&enddateymd&lastupdate&offset&data_fields',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          startdateymd: false,
          enddateymd: false,
          lastupdate: false,
          offset: false,
          data_fields: false,
        },
      },
    },
    transform: param => (Array.isArray(param.data_fields) ? { ...param, data_fields: param.data_fields.join(',') } : param),
  }),
};
