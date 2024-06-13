import { HttpMethod } from '@dvcol/common-utils/http';

import type {
  WithingsCreateClientRequest,
  WithingsCreateClientResponse,
  WithingsRecoverCodeRequest,
  WithingsRecoverCodeResponse,
  WithingsUserListRequest,
  WithingsUserListResponse,
} from '~/models/withings-auth.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * The Withings API uses OAuth 2.0, an industry-standard protocol for authorization.
 * OAuth 2.0 enables your application to access user-specific data with a secure and seamless way without requiring users to share their Withings credentials with your app.
 *
 * The Withings API supports the Authorization Code Flow, which is suitable for server-side applications. In this flow, your application will obtain an authorization code from the user, which can then be exchanged for an access token and refresh token.
 *
 * There are two ways to obtain the authorization code:
 *
 * 1. Web Authorization Flow: Redirect the user to the Withings authorization endpoint, where they can grant permission for your app to access their Withings data.
 * 2. Account Creation Flow (contract partners only): Obtain the authorization code after account creation (Cellular Devices/SDK only) .
 *
 * To use OAuth 2.0 with the Withings API, follow these general steps:
 *
 * 1. Request user authorization/Create an account: Use one of the two methods mentioned above to obtain an authorization code from the user.
 * 2. Obtain an access token: Exchange the authorization code for an access token and refresh token.
 * 3. Access the API: Include the access token in your API requests to access user-specific data from the Withings API.
 * 4. Refresh tokens: Use the refresh token to obtain new access tokens when the current ones expire.
 *
 * Please refer to the appropriate [Integration Guide]{@link https://developer.withings.com/developer-guide/v3/withings-solutions/integration-guides} to know which method you should use.
 *
 * @see [oauth2]{@link https://developer.withings.com/api-reference#tag/oauth2}
 */
export const authenticationPro = {
  /**
   * <b>This service will only work for partners having signed a contract with Withings (Withings Mobile SDK or Withings Cellular).</b>
   *
   * To generate a new authorization code for standard end-user accounts, your user will have to authorize your application to the Web Authorization Flow again.
   *
   * This service allows you to retrieve a new authorization code in the event that the refresh token is invalid for a user belonging to your namespace.
   *
   * @contract true - this method requires a contract with Withings.
   *
   * @see [recover-code]{@link https://developer.withings.com/api-reference/#tag/oauth2/operation/oauth2-recoverauthorizationcode}
   */
  recoverCode: new WithingsClientEndpoint<WithingsRecoverCodeRequest, WithingsRecoverCodeResponse>({
    method: HttpMethod.POST,
    url: '/v2/oauth2?action&client_id&nonce&signature&userid',
    seed: {
      action: 'recoverauthorizationcode',
    },
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
   * This service allows you to get a list of all users that have authorized your application to fetch their data.
   *
   * <b>This service is limited to partners who are integrating with Withings Pro solutions.
   * This service will only work for partners having signed a contract with Withings.</b>
   *
   * @pro true - this method requires a Pro account.
   * @contract true - this method requires a contract with Withings.
   *
   * @see [user-list]{@link https://developer.withings.com/api-reference/#tag/oauth2/operation/oauth2-listusers}
   */
  userList: new WithingsClientEndpoint<WithingsUserListRequest, WithingsUserListResponse | WithingsUserListResponse[]>({
    method: HttpMethod.POST,
    url: '/v2/oauth2?action&client_id&nonce&signature',
    seed: {
      action: 'listusers',
    },
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          nonce: true,
          signature: true,
        },
      },
    },
  }),
  /**
   * This service allows creation of a new OAuth 2.0 application.
   *
   * </b>This service is part of Withings Pro Solutions.
   * You won't be able to use it if you did not sign a contract with Withings.
   * Uncontracted partners should use the developer dashboard to create their applications.</b>
   *
   * @pro true - this method requires a Pro account.
   * @contract true - this method requires a contract with Withings.
   *
   * @see [create-client]{@link https://developer.withings.com/api-reference/#tag/oauth2/operation/oauth2-createclient}
   */
  createClient: new WithingsClientEndpoint<WithingsCreateClientRequest, WithingsCreateClientResponse>({
    method: HttpMethod.POST,
    url: '/v2/oauth2?action&client_id&nonce&signature&name&description&intended_environment&intended_integrations&redirect_uris',
    seed: {
      action: 'createclient',
    },
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          nonce: true,
          signature: true,
          name: true,
          description: true,
          intended_environment: true,
          intended_integrations: true,
          redirect_uris: true,
        },
      },
    },
  }),
};
