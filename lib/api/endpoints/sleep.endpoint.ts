import { HttpMethod } from '@dvcol/base-http-client/utils/http';

import type { WithingsSleepGetRequest, WithingsSleepGetResponse, WithingsSleepSummaryRequest } from '~/api/endpoints/withings-sleep.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * Returns data related to user sleep activities, wether they are captured by an Activity Tracker or a Sleep Monitor.
 * The data are only available once a synchronization occured between the device and Withings servers (which might include synchronizing with Withings mobile application or via Withings Mobile SDK).
 */
export const sleep = {
  /**
   * Returns sleep data captured at high frequency, including sleep stages.
   *
   * <b>Note:</b> If your input <b>startdate</b> and <b>enddate<+b> are separated by more than 24h, only the first 24h after <b>startdate</b> will be returned.
   */
  get: new WithingsClientEndpoint<WithingsSleepGetRequest, WithingsSleepGetResponse>({
    method: HttpMethod.POST,
    url: '/v2/sleep?action&startdate&enddate&data_fields&meastypes',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          startdate: true,
          enddate: true,
          data_fields: false,
          meastypes: false,
        },
      },
    },
    transform: param => {
      const _param = { ...param };
      if (Array.isArray(param.meastypes)) {
        _param.meastypes = param.meastypes.join(',');
      }
      if (Array.isArray(param.data_fields)) {
        _param.data_fields = param.data_fields.join(',');
      }
      return _param;
    },
  }),
  /**
   * Returns sleep activity summaries, which are an aggregation of all the data captured at high frequency during the sleep activity.
   * Use the [Sleep v2 - Get]{@link https://developer.withings.com/api-reference/#operation/sleepv2-get} service to get the high frequency data used to build these summaries.
   */
  summary: new WithingsClientEndpoint<WithingsSleepSummaryRequest>({
    method: HttpMethod.POST,
    url: '/v2/sleep?action&startdateymd&enddateymd&lastupdate&data_fields',
    opts: {
      auth: true,
      pagination: true,
      parameters: {
        query: {
          action: true,
          startdateymd: false,
          enddateymd: false,
          lastupdate: false,
          data_fields: false,
        },
      },
    },
    transform: param => (Array.isArray(param.data_fields) ? { ...param, data_fields: param.data_fields.join(',') } : param),
  }),
};
