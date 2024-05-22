import { BaseHeaderContentType } from '@dvcol/base-http-client';
import { HttpMethod } from '@dvcol/base-http-client/utils/http';

import type {
  WithingsAuthorizeRequest,
  WithingsDemoAccessRequest,
  WithingsDemoAccessResponse,
  WithingsRequestTokenRequest,
  WithingsRequestTokenResponse,
  WithingsRevokeUserRequest,
} from '~/models/withings-auth.model';

import { Config } from '~/config';
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
export const authentication = {
  /**
   * To use the Web Authorization Flow, you'll need to construct an authorization URL with the appropriate query parameters. Here's an example of an authorization URL:
   *
   * https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=YOUR_CLIENT_ID&scope=user.info,user.metrics,user.activity&redirect_uri=YOUR_REDIRECT_URI&state=YOUR_STATE
   *
   * Replace <b>YOUR_CLIENT_ID</b>, <b>YOUR_REDIRECT_URI</b>, and <b>YOUR_STATE</b> with your actual values.
   *
   * When someone navigates to this URL, they will be asked to authorize your application for the requested scopes. Upon granting permissions, the user will be redirected to your specified redirect_uri, which will include an additional query string parameter called code. The state parameter will also be returned and should be validated at this point.
   *
   * Please note that the authorization code is only valid for 30 seconds.
   *
   * @see [authorize]{@link https://developer.withings.com/api-reference#tag/oauth2/operation/oauth2-authorize}
   */
  authorize: new WithingsClientEndpoint<WithingsAuthorizeRequest, unknown>({
    method: HttpMethod.GET,
    url: '/oauth2_user/authorize2?response_type&client_id&state&scope&redirect_uri&mode',
    init: {
      redirect: 'manual',
      credentials: 'omit',
    },
    opts: {
      endpoint: Config.endpoint.account,
      parameters: {
        query: {
          response_type: true,
          client_id: true,
          state: true,
          scope: true,
          redirect_uri: true,
          mode: false,
        },
      },
    },
    transform: params => (Array.isArray(params.scope) ? { ...params, type: params.scope.join(',') as never } : params),
  }),
  /**
   * Use this endpoint to request an <b>access token</b> and <b>refresh token</b> from an <b>authorization code</b> or refresh an existing <b>access token</b>.
   *
   * * <b>Important:</b> Don't forget to save the userid included in the response in your database.
   *
   * * <b>Note:</b> You can use this webservice either by signing the call or using the secret. Toggle the request body schema to see the parameters for the 2 options.
   *
   * * <b>Note:</b> Toggle the <b>grant_type</b> to see the different parameters that must be used depending if you're refreshing a token or using an authorization code.
   *
   * @see [request-token]{@link https://developer.withings.com/api-reference/#tag/oauth2/operation/oauth2-getaccesstoken}
   */
  requestToken: new WithingsClientEndpoint<WithingsRequestTokenRequest, WithingsRequestTokenResponse>({
    method: HttpMethod.POST,
    url: '/v2/oauth2',
    opts: {
      contentType: BaseHeaderContentType.FormUrlEncoded,
      signature: true,
      secret: true,
    },
    body: {
      action: true,
      client_id: true,

      client_secret: false,

      nonce: false,
      signature: false,

      grant_type: true,

      code: false,
      redirect_uri: false,

      refresh_token: false,
    },
  }),
  /**
   * This service allows to revoke the access your application have been granted to a user's data.
   * After calling this webservice, your access and refresh tokens for this user will become invalid, and the data update notifications for this user will be automatically unsubscribed.
   *
   * @see [revoke-user]{@link https://developer.withings.com/api-reference/#tag/oauth2/operation/oauth2-revoke}
   */
  revokeUser: new WithingsClientEndpoint<WithingsRevokeUserRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/oauth2?action&client_id&nonce&signature&userid',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          nonce: true,
          signature: true,
          userid: true,
        },
      },
    },
  }),
  /**
   * This webservice gives your clientID access to a demo account containing dummy data
   *
   * @see [demo-access]{@link https://developer.withings.com/api-reference/#tag/oauth2/operation/oauth2-getdemoaccess}
   */
  demoAccess: new WithingsClientEndpoint<WithingsDemoAccessRequest, WithingsDemoAccessResponse>({
    method: HttpMethod.GET,
    url: '/v2/oauth2?action&client_id&nonce&signature&scope_oauth2',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          nonce: true,
          signature: true,
          scope_oauth2: true,
        },
      },
    },
    transform: params => (Array.isArray(params.scope_oauth2) ? { ...params, type: params.scope_oauth2.join(',') as never } : params),
  }),
};
