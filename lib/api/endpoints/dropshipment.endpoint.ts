import { HttpMethod } from '@dvcol/common-utils/http';

import type {
  WithingsDropshipmentCreateRequest,
  WithingsDropshipmentCreateResponse,
  WithingsDropshipmentCreateUserOrderResponse,
  WithingsDropshipmentCreateUserRequest,
  WithingsDropshipmentDeleteRequest,
  WithingsDropshipmentStatusRequest,
  WithingsDropshipmentStatusResponse,
  WithingsDropshipmentUpdateRequest,
  WithingsDropshipmentUpdateResponse,
} from '~/models/withings-dropshipment.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * The following services are part of the Logistics APIs. Refer to [this section]{@link https://developer.withings.com/developer-guide/v3/integration-guide/dropship-only/logistics-api/overview-create-order} for more information.
 *
 * The Logistics APIs allows partners to dropship devices directly to their program members.
 *
 * <b>Important</b>: To receive automatic notification on order status, please fill a dropshipment notify URI for your API application in your [Developer Dashboard]{@link https://developer.withings.com/dashboard/}.
 *
 * @contract true - those endpoints require a contract with Withings.
 * @logistics true - those endpoints are part of the Logistics APIs.
 *
 * @see [dropshipment]{@link https://developer.withings.com/api-reference/#tag/dropshipment}
 */
export const dropshipment = {
  /**
   * Creates a dropshipment order.
   *
   * If one of the orders has an invalid address, none of the orders will be created.
   *
   * <b>This service is part of Withings Pro Solutions.
   * You won't be able to use it if you did not sign a contract with Withings.
   * Do not use this service if you're integrating Withings Cellular Solutions with dropshipment.</b>
   *
   * In that case, please use the createuserorder action
   *
   * @contract true - this method requires a contract with Withings.
   *
   * @see [createorder]{@link https://developer.withings.com/api-reference/#tag/dropshipment/operation/dropshipmentv2-createorder}
   */
  create: new WithingsClientEndpoint<WithingsDropshipmentCreateRequest, WithingsDropshipmentCreateResponse>({
    method: HttpMethod.POST,
    url: '/v2/dropshipment?action&client_id&nonce&signature&order&customerid&testmode',
    seed: {
      action: 'createorder',
    },
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          nonce: true,
          signature: true,
          order: true,
          customerid: false,
          testmode: false,
        },
      },
    },
  }),
  /**
   * Creates a Withings user, then creates a dropshipment order and links the devices shipped to the created user once the device is shipped. If a cellular device is listed in the order field, the service will activate this device's cellular service and invoicing.
   *
   * If one of the orders has an invalid address, none of the orders will be created.
   *
   * Please refer to the [Access and refresh tokens section]{@link https://developer.withings.com/developer-guide/v3/integration-guide/dropship-cellular/get-access/access-and-refresh-tokens} to learn how to use the authorization code you'll get in return of this service in order to fetch user data.
   * The authorization code is only valid for 10 minutes.
   *
   * <b>This service is part of Withings Pro Solutions. You won't be able to use it if you did not sign a contract with Withings. Use this service only if you're integrating Withings Cellular Solutions with dropshipment.</b>
   *
   * @contract true - this method requires a contract with Withings.
   *
   * @see [create-user-order]{@link https://developer.withings.com/api-reference/#tag/dropshipment/operation/dropshipmentv2-createuserorder}
   */
  createUser: new WithingsClientEndpoint<WithingsDropshipmentCreateUserRequest, WithingsDropshipmentCreateUserOrderResponse>({
    method: HttpMethod.POST,
    url: '/v2/dropshipment?action&client_id&nonce&signature&mailingpref&birthdate&measures&gender&preflang&unit_pref&email&timezone&shortname&external_id&order&firstname&lastname&phonenumber&recovery_code&goals&testmode',
    seed: {
      action: 'createuserorder',
    },
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          nonce: true,
          signature: true,
          mailingpref: true,
          birthdate: true,
          measures: true,
          gender: true,
          preflang: true,
          unit_pref: true,
          email: true,
          timezone: true,
          shortname: true,
          external_id: true,
          order: true,
          firstname: false,
          lastname: false,
          phonenumber: false,
          recovery_code: false,
          goals: false,
          testmode: false,
        },
      },
    },
  }),
  /**
   * Cancels a dropshipment order.
   *
   * Only orders that haven't been shipped can be cancelled.
   *
   * Note that there can be a latency between the shipping of the parcel and the update of the shipping status to SHIPPED.
   *
   * Trying to cancel an order that was already shipped will result in a error with error code 277.
   *
   * <b>This service is part of Withings Pro Solutions. You won't be able to use it if you did not sign a contract with Withings.</b>
   *
   * @contract true - this method requires a contract with Withings.
   *
   * @see [delete]{@link https://developer.withings.com/api-reference/#tag/dropshipment/operation/dropshipmentv2-delete}
   */
  delete: new WithingsClientEndpoint<WithingsDropshipmentDeleteRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/dropshipment?action&client_id&nonce&signature&order_id',
    seed: {
      action: 'delete',
    },
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          nonce: true,
          signature: true,
          order_id: true,
        },
      },
    },
  }),
  /**
   * Returns dropshipment order information.
   *
   * <b>This service is part of Withings Pro Solutions. You won't be able to use it if you did not sign a contract with Withings.</b>
   *
   * @contract true - this method requires a contract with Withings.
   *
   * @deprecated This service is deprecated. Please use [Order v2 - Getdetail instead]{@link https://developer.withings.com/api-reference/#operation/orderv2-getdetail}
   *
   * @see [status]{@link https://developer.withings.com/api-reference/#tag/dropshipment/operation/dropshipmentv2-getorderstatus}
   */
  status: new WithingsClientEndpoint<WithingsDropshipmentStatusRequest, WithingsDropshipmentStatusResponse>({
    method: HttpMethod.POST,
    url: '/v2/dropshipment?action&client_id&nonce&signature&order_ids&customer_ref_ids&customerid&enrich',
    seed: {
      action: 'getorderstatus',
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
          enrich: false,
        },
      },
    },
  }),
  /**
   * Updates a dropshipment order.
   *
   * <b>This service is part of Withings Pro Solutions. You won't be able to use it if you did not sign a contract with Withings. </b>
   *
   * @contract true - this method requires a contract with Withings.
   *
   * @see [update]{@link https://developer.withings.com/api-reference/#tag/dropshipment/operation/dropshipmentv2-update}
   */
  update: new WithingsClientEndpoint<WithingsDropshipmentUpdateRequest, WithingsDropshipmentUpdateResponse>({
    method: HttpMethod.POST,
    url: '/v2/dropshipment?action&client_id&nonce&signature&order_id&status',
    seed: {
      action: 'update',
    },
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          order_id: true,
          order: true,
        },
      },
    },
  }),
};
