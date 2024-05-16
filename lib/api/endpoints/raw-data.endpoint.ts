import { HttpMethod } from '@dvcol/base-http-client/utils/http';

import type {
  WithingsRawDataActivateRequest,
  WithingsRawDataDeactivateRequest,
  WithingsRawDataGetRequest,
  WithingsRawDataResponse,
} from '~/models/withings-raw-data.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * Raw Data webservices are part of the Advanced research API that allows to collect high frequency PPG and accelerometer data (around 25Hz).
 * These APIs are compatible only with the Withings ScanWatch. If you need more information about how to use these APIs and how to parse the data, please have a look the [dedicated integration guide]{@link https://developer.withings.com/developer-guide/v3/integration-guide/advanced-research-api/advanced-research-api-overview}.
 *
 * @see [raw-data]{@link https://developer.withings.com/api-reference/#tag/rawdata}
 */
export const rawData = {
  /**
   * This service allows to activate Raw Data collection on a given device that is already set up, and set the date at which the raw data collection will stop (enddate).
   * The raw data capture will be activated as soon as the watch is able to sync with the Withings app following the API call.
   * The capture will stop automatically at the enddate provided in the API call.
   *
   * @see [activate]{@link https://developer.withings.com/api-reference/#tag/rawdata/operation/rawdatav2-activate}
   */
  activate: new WithingsClientEndpoint<WithingsRawDataActivateRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/rawdata?action&hash_deviceid&rawdata_type&enddate',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          hash_deviceid: true,
          rawdata_type: true,
          enddate: false,
        },
      },
    },
  }),
  /**
   * This service allows the de-activation of raw data collection.
   * Raw Data de-activation will occur as soon as the Withings device is able to sync with the Withings app.
   *
   * @see [deactivate]{@link https://developer.withings.com/api-reference/#tag/rawdata/operation/rawdatav2-deactivate}
   */
  deactivate: new WithingsClientEndpoint<WithingsRawDataDeactivateRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/rawdata?action&hash_deviceid&rawdata_type',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          hash_deviceid: true,
          rawdata_type: false,
        },
      },
    },
  }),
  /**
   * This service allows to fetch raw data of a specific type that were captured and synchronized by a Withings device.
   * Detailed information about the data structure can be found in the [Raw Data structure section]{@link https://developer.withings.com/developer-guide/v3/integration-guide/advanced-research-api/fetch-raw-data/raw-data-structure}.
   *
   * @see [get]{@link https://developer.withings.com/api-reference/#tag/rawdata/operation/rawdatav2-get}
   */
  get: new WithingsClientEndpoint<WithingsRawDataGetRequest, WithingsRawDataResponse>({
    method: HttpMethod.POST,
    url: '/v2/rawdata?action&hash_deviceid&rawdata_type&startdate&enddate&offset',
    opts: {
      auth: true,
      pagination: true,
      parameters: {
        query: {
          action: true,
          hash_deviceid: true,
          rawdata_type: true,
          startdate: true,
          enddate: true,
          offset: false,
        },
      },
    },
  }),
};
