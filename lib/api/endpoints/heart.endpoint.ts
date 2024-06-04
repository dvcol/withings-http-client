import { HttpMethod } from '@dvcol/base-http-client/utils/http';

import type {
  WithingsHeartGetRequest,
  WithingsHeartGetResponse,
  WithingsHeartListRequest,
  WithingsHeartListResponse,
} from '~/models/withings-heart.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * Returns ECG (EKG) signal points in micro-volt (μV).
 *
 * You can use the [Heart - List]{@link https://developer.withings.com/api-reference/#operation/heartv2-list} service to get the list of ECG records and their corresponding <b>signalid</b> and then use [Heart - Get]{@link https://developer.withings.com/api-reference/#operation/heartv2-get} to get the signal details.
 *
 * The data are only available once a synchronization occured between the device and Withings servers (which might include synchronizing with Withings mobile application or via Withings Mobile SDK).
 *
 * @see [heart]{@link https://developer.withings.com/api-reference/#tag/heart}
 */
export const heart = {
  /**
   * Provides the high frequency data of an ECG recording in micro-volt (μV).
   *
   * <b>Duration:</b>
   *
   * - BPM Core: 20 seconds.
   * - Move ECG: 30 seconds.
   * - ScanWatch: 30 seconds.
   *
   * <b>Sampling frequency:</b>
   *
   * - BPM Core: 500 Hz.
   * - Move ECG: 300 Hz.
   * - ScanWatch: 300 Hz.
   *
   * @see [get]{@link https://developer.withings.com/api-reference/#tag/heart/operation/heartv2-get}
   */
  get: new WithingsClientEndpoint<WithingsHeartGetRequest, WithingsHeartGetResponse>({
    method: HttpMethod.POST,
    url: '/v2/heart?action&signalid&client_id&signature&nonce&signal_token',
    seed: {
      action: 'get',
    },
    opts: {
      auth: true,
      signature: true,
      parameters: {
        query: {
          action: true,
          signalid: false,
          client_id: false,
          signature: false,
          nonce: false,
          signal_token: false,
        },
      },
    },
  }),
  /**
   * Returns a list of ECG records and Afib classification for a given period of time. To get the full ECG signal, use the [Heart v2 - Get]{@link https://developer.withings.com/api-reference/#operation/heartv2-get} service.
   * If the ECG recordings have been taken with BPM Core, systole and diastole measurements will also be returned.
   *
   * @see [list]{@link https://developer.withings.com/api-reference/#tag/heart/operation/heartv2-list}
   */
  list: new WithingsClientEndpoint<WithingsHeartListRequest, WithingsHeartListResponse>({
    method: HttpMethod.POST,
    url: '/v2/heart?action&startdate&enddate&offset',
    seed: {
      action: 'list',
    },
    opts: {
      auth: true,
      pagination: true,
      parameters: {
        query: {
          action: true,
          startdate: false,
          enddate: false,
          offset: false,
        },
      },
    },
  }),
};
