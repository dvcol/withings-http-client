import { HttpMethod } from '@dvcol/base-http-client/utils/http';

import type { WithingsStetho, WithingsStethoListRequest, WithingsStethoListResponse, WithingsStethoRequest } from '~/models/withings-stetho.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * First the [Stetho - List API]{@link https://developer.withings.com/api-reference/#operation/stethov2-list} should be called to fetch the stetho signalIds which should be fetched individually using the [Stetho - Get]{@link https://developer.withings.com/api-reference/#operation/stethov2-get} API.
 */
export const stetho = {
  /**
   * @see [get]{@link https://developer.withings.com/api-reference/#tag/stetho/operation/stethov2-get}
   */
  get: new WithingsClientEndpoint<WithingsStethoRequest, WithingsStetho>({
    method: HttpMethod.POST,
    url: '/v2/stetho?action&signalid',
    seed: {
      action: 'get',
    },
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          signalid: true,
        },
      },
    },
  }),
  /**
   * @see [list]{@link https://developer.withings.com/api-reference/#tag/stetho/operation/stethov2-list}
   */
  list: new WithingsClientEndpoint<WithingsStethoListRequest, WithingsStethoListResponse>({
    method: HttpMethod.POST,
    url: '/v2/stetho?action&startdate&enddate&offset',
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
