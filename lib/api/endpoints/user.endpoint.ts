import { HttpMethod } from '@dvcol/base-http-client/utils/http';

import type {
  WithingsUserActivateRequest,
  WithingsUserActivateResponse,
  WithingsUserDeviceRequest,
  WithingsUserDeviceResponse,
  WithingsUserGetRequest,
  WithingsUserGetResponse,
  WithingsUserGoalsRequest,
  WithingsUserGoalsResponse,
  WithingsUserLinkRequest,
  WithingsUserUnLinkRequest,
} from '~/models/withings-user.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * @see [user]{@link https://developer.withings.com/api-reference/#tag/user}
 */
export const user = {
  /**
   * Creates a Withings user, links the devices related to the provided <b>mac_addresses</b> and activates the cellular devices service and invoicing.
   *
   * Please refer to the [Access and refresh tokens section]{@link https://developer.withings.com/developer-guide/v3/integration-guide/bulkship-cellular/get-access/access-and-refresh-tokens} to learn how to use the authorization code you'll get in return of this service in order to fetch user data.
   * The authorization code is only valid for 10 minutes.
   *
   * <b>Important:</b>
   *
   * * Please note that to activate the Withings HUB cellular service, the <b>mac_address</b> of the Withings HUB needs to be passed included in the input <b>mac_addresses</b> along with the other Withings devices.
   * * Please note that the devices need to be authorized to be linked by API by the Partner.
   * * Please contact Withings for more information on device authorization.
   *
   * <b>This service is part of Withings Pro Solutions. You won't be able to use it if you did not sign a contract with Withings. Use this service only if you're integrating Withings Cellular Solutions with bulkshipment.</b>
   *
   * @contract true - those endpoints require a contract with Withings.
   *
   * @see [activate]{@link https://developer.withings.com/api-reference/#tag/user/operation/userv2-activate}
   */
  activate: new WithingsClientEndpoint<WithingsUserActivateRequest, WithingsUserActivateResponse>({
    method: HttpMethod.POST,
    url: '/v2/user?action&client_id&nonce&signature&mac_addresses&email&birthdate&measures&gender&preflang&unit_pref&timezone&shortname&external_id&firstname&lastname&phonenumber&recovery_code&scope_oauth2&goals&password&redirect_uri',
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
          mac_addresses: true,
          firstname: false,
          lastname: false,
          phonenumber: false,
          recovery_code: false,
          scope_oauth2: false,
          goals: false,
          password: false,
          redirect_uri: false,
        },
      },
    },
  }),
  /**
   * Returns user information.
   *
   * * <b>Important</b>:
   *   For data privacy reasons, this webservice is only available for integration solutions for which the provider is responsible for the account creation (ie Withings Cellular Solutions and Withings Mobile SDK integrations).
   *   This webservice will return an error the above condition is not met.
   *
   * @see [get]{@link https://developer.withings.com/api-reference/#tag/user/operation/userv2-get}
   */
  get: new WithingsClientEndpoint<WithingsUserGetRequest, WithingsUserGetResponse>({
    method: HttpMethod.POST,
    url: '/v2/user?action&client_id&nonce&signature&email',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          nonce: true,
          signature: true,
          email: true,
        },
      },
    },
  }),
  /**
   * Returns the list of user linked devices.
   *
   * @authentication user - this endpoint requires a user token in the Authorization header.
   *
   * @see [devices]{@link https://developer.withings.com/api-reference/#tag/user/operation/userv2-getdevice}
   */
  devices: new WithingsClientEndpoint<WithingsUserDeviceRequest, WithingsUserDeviceResponse>({
    method: HttpMethod.POST,
    url: '/v2/user?action',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
        },
      },
    },
  }),
  /**
   * Returns the goals of a user.
   *
   * @authentication user - this endpoint requires a user token in the Authorization header.
   *
   * @see [goals]{@link https://developer.withings.com/api-reference/#tag/user/operation/userv2-getgoals}
   */
  goals: new WithingsClientEndpoint<WithingsUserGoalsRequest, WithingsUserGoalsResponse>({
    method: HttpMethod.POST,
    url: '/v2/user?action',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
        },
      },
    },
  }),
  /**
   * Links the devices related to the provided <b>mac_addresses</b> and the user related to the provided <b>access_token/b>.
   * If a cellular device is listed in the <b>mac_address/b> field, it will activate this device's cellular service and invoicing.
   */
  link: new WithingsClientEndpoint<WithingsUserLinkRequest, WithingsUserDeviceResponse>({
    method: HttpMethod.POST,
    url: '/v2/user?action&mac_addresses',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          mac_addresses: true,
        },
      },
    },
  }),
  unLink: new WithingsClientEndpoint<WithingsUserUnLinkRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/user?action&mac_addresses',
    opts: {
      auth: true,
      parameters: {
        query: {
          action: true,
          mac_address: true,
        },
      },
    },
  }),
};
