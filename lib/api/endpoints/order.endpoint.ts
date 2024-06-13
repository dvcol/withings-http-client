import { HttpMethod } from '@dvcol/common-utils/http';

import type { WithingsOrderDetailRequest, WithingsOrderDetailResponse } from '~/models/withings-dropshipment.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * The following services are part of the Logistics APIs. Refer to [this section]{@link https://developer.withings.com/developer-guide/v3/integration-guide/dropship-only/logistics-api/overview-create-order} for more information.
 *
 * @contract true - those endpoints require a contract with Withings.
 * @logistics true - those endpoints are part of the Logistics APIs.
 *
 * @see [order]{@link https://developer.withings.com/api-reference/#tag/order}
 */
export const order = {
  /**
   * Returns detailed information about bulkshipment or dropshipment orders.
   *
   * <b>This service is part of Withings Pro Solutions. You won't be able to use it if you did not sign a contract with Withings.</b>
   *
   * @contract true - this method requires a contract with Withings.
   *
   * @see [detail]{@link https://developer.withings.com/api-reference/#tag/order/operation/orderv2-getdetail}
   */
  detail: new WithingsClientEndpoint<WithingsOrderDetailRequest, WithingsOrderDetailResponse>({
    method: HttpMethod.POST,
    url: '/v2/order?action&client_id&nonce&signature&order_ids&customer_ref_ids&customerid',
    seed: {
      action: 'getdetail',
    },
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          nonce: true,
          signature: true,
          order_ids: false,
          customer_ref_ids: false,
          customerid: false,
        },
      },
    },
  }),
};
