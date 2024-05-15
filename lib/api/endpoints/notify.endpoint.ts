import { HttpMethod } from '@dvcol/base-http-client/utils/http';

import type {
  WithingsNotify,
  WithingsNotifyGetRequest,
  WithingsNotifyListRequest,
  WithingsNotifyListResponse,
  WithingsNotifyRevokeRequest,
  WithingsNotifySubscribeRequest,
  WithingsNotifyUpdateRequest,
} from '~/models/withings-notify.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * These services will allow you to be notified when new data is collected by Withings devices, or when specific events happen.
 * Learn more about our notification services in [the dedicated section]{@link https://developer.withings.com/developer-guide/v3/data-api/keep-user-data-up-to-date/}.
 *
 * @see [notify]{@link https://developer.withings.com/api-reference/#tag/notify}
 */
export const notify = {
  /**
   * Returns the last notification service that was subscribed for a user and for a given appli.
   * If no appli is specified, <b>appli=1</b> will be considered.
   *
   * @see [get]{@link https://developer.withings.com/api-reference/#tag/notify/operation/notify-get}
   */
  get: new WithingsClientEndpoint<WithingsNotifyGetRequest, WithingsNotify>({
    method: HttpMethod.POST,
    url: '/notify?action&callbackurl&appli',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          callbackurl: true,
          appli: false,
        },
      },
    },
  }),
  /**
   * Lists notification configuration for this user.
   *
   * @see [list]{@link https://developer.withings.com/api-reference/#tag/notify/operation/notify-list}
   */
  list: new WithingsClientEndpoint<WithingsNotifyListRequest, WithingsNotifyListResponse>({
    method: HttpMethod.POST,
    url: '/notify?action&appli',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          appli: false,
        },
      },
    },
  }),
  /**
   * Disables all notifications for a given user.
   *
   * @see [revoke]{@link https://developer.withings.com/api-reference/#tag/notify/operation/notify-revoke}
   */
  revoke: new WithingsClientEndpoint<WithingsNotifyRevokeRequest, unknown>({
    method: HttpMethod.POST,
    url: '/notify?action&callbackurl&appli',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          callbackurl: true,
          appli: false,
        },
      },
    },
  }),
  /**
   * This service allows to receive notifications from Withings:
   *
   * - <b>For the Health Data APIs:</b> your application can subscribe to a variety or events, including user data creation and updates. Notifications will be sent to your servers when the subscribed events occur. ([more information]{@link https://developer.withings.com/developer-guide/v3/data-api/keep-user-data-up-to-date}). Please note that you need to subscribe for each individual user.
   * - <b>For the Logistics APIs:</b> a notification will be sent when there is an order update ([more information]{@link https://developer.withings.com/api-reference/developer-guide/v3/integration-guide/dropship-only/logistics-api/observe-order-updates})
   * - <b>For partners integrating Withings Cellular Solutions or Withings Mobile SDK:</b> you can use the <b>NO_ACCOUNT_ASSOCIATED</b> event to track unassociated devices . Please note you need to subscribe only once per application.
   *
   * <b>Note</b>: Depending on your use case, the request parameters may change:
   *
   * - <b>For the Health Data APIs:</b> use a valid <b>access_token</b> in the header but don't use <b>signature</b> and <b>nonce</b> in the query parameters.
   * - <b>For the Logistics APIs:</b> the subscription is done automatically an order is placed (please refer to the [dedicated documentation section]{@link https://developer.withings.com/api-reference/developer-guide/v3/integration-guide/dropship-only/logistics-api/observe-order-updates#how-to-receive-order-update-notifications}).
   * - <b>For partners integrating Withings Cellular Solutions or Withings Mobile SDK:</b> to subscribe to the NO_ACCOUNT_ASSOCIATED event (appli = 53): use <b>signature</b> and <b>nonce</b> parameters but don't include an <b>access_token</b> in the header.
   *
   * @see [subscribe]{@link https://developer.withings.com/api-reference/#tag/notify/operation/notify-subscribe}
   */
  subscribe: new WithingsClientEndpoint<WithingsNotifySubscribeRequest, unknown>({
    method: HttpMethod.POST,
    url: '/notify?action&callbackurl&appli&signature&nonce&client_id&comment',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          callbackurl: true,
          appli: true,
          signature: false,
          nonce: false,
          client_id: false,
          comment: false,
        },
      },
    },
  }),
  /**
   * Updates the <b>callbackurl</b> and/or <b>appli</b> of a created notification subscription. If multiple subscriptions were made for a given user, <b>callbackurl</b> and <b>appli</b>, only one of the subscriptions will be updated.
   *
   * @see [update]{@link https://developer.withings.com/api-reference/#tag/notify/operation/notify-update}
   */
  update: new WithingsClientEndpoint<WithingsNotifyUpdateRequest, unknown>({
    method: HttpMethod.POST,
    url: '/notify?action&callbackurl&appli&new_callbackurl&new_appli&comment',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          callbackurl: true,
          appli: true,
          new_callbackurl: false,
          new_appli: false,
          comment: false,
        },
      },
    },
  }),
};
