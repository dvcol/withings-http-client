import { HttpMethod } from '@dvcol/base-http-client/utils/http';

import type {
  WithingsNudgeCampaignAddUserRequest,
  WithingsNudgeCampaignCreateRequest,
  WithingsNudgeCampaignCreateResponse,
  WithingsNudgeCampaignDeleteRequest,
  WithingsNudgeCampaignGetRequest,
  WithingsNudgeCampaignGetResponse,
  WithingsNudgeCampaignListRequest,
  WithingsNudgeCampaignListResponse,
  WithingsNudgeCampaignListUsersRequest,
  WithingsNudgeCampaignListUsersResponse,
  WithingsNudgeCampaignRemoveUserRequest,
  WithingsNudgeCampaignUpdateRequest,
  WithingsNudgeCreateRequest,
  WithingsNudgeCreateResponse,
  WithingsNudgeDeleteRequest,
  WithingsNudgeGetRequest,
  WithingsNudgeGetResponse,
  WithingsNudgeListRequest,
  WithingsNudgeListResponse,
  WithingsNudgeUpdateRequest,
} from '~/models/withings-nudge.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * These webservices allows you to to manage Health Nudges.
 * Read the [Health Nudges Integration Guide]{@link https://developer.withings.com/developer-guide/v3/integration-guide/health-nudges/health-nudge-overview} for more information.
 *
 * @see [nudge]{@link https://developer.withings.com/api-reference/#tag/nudge}
 */
export const nudge = {
  /**
   * @see [create]{@link https://developer.withings.com/api-reference/#tag/nudge/operation/nudgev2-create}
   */
  create: new WithingsClientEndpoint<WithingsNudgeCreateRequest, WithingsNudgeCreateResponse>({
    method: HttpMethod.POST,
    url: '/v2/nudge?action&client_id&signature&nonce&iconids&content&model&position',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          iconids: true,
          content: true,
          model: true,
          position: false,
        },
      },
    },
  }),
  /**
   * @see [delete]{@link https://developer.withings.com/api-reference/#tag/nudge/operation/nudgev2-delete}
   */
  delete: new WithingsClientEndpoint<WithingsNudgeDeleteRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/nudge?action&client_id&signature&nonce&nudgeid',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          nudgeid: true,
        },
      },
    },
  }),
  /**
   * @see [get]{@link https://developer.withings.com/api-reference/#tag/nudge/operation/nudgev2-get}
   */
  get: new WithingsClientEndpoint<WithingsNudgeGetRequest, WithingsNudgeGetResponse>({
    method: HttpMethod.POST,
    url: '/v2/nudge',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          nudgeid: true,
        },
      },
    },
  }),
  /**
   * @see [list]{@link https://developer.withings.com/api-reference/#tag/nudge/operation/nudgev2-list}
   */
  list: new WithingsClientEndpoint<WithingsNudgeListRequest, WithingsNudgeListResponse>({
    method: HttpMethod.POST,
    url: '/v2/nudge',
    opts: {
      signature: true,
      pagination: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          offset: false,
        },
      },
    },
  }),
  /**
   * @see [update]{@link https://developer.withings.com/api-reference/#tag/nudge/operation/nudgev2-update}
   */
  update: new WithingsClientEndpoint<WithingsNudgeUpdateRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/nudge',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          nudgeid: true,
          iconids: false,
          content: false,
          model: false,
          position: false,
        },
      },
    },
  }),
};

/**
 * These webservices allows you to to manage Health Nudges Campaign.
 * Read the Health [Nudges Integration Guide for more information]{@link https://developer.withings.com/developer-guide/v3/integration-guide/health-nudges/health-nudge-overview}.
 */
export const campaign = {
  /**
   * @see [add-user]{@link https://developer.withings.com/api-reference/#tag/nudgecampaign/operation/nudgecampaignv2-addusers}
   */
  addUser: new WithingsClientEndpoint<WithingsNudgeCampaignAddUserRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/nudgecampaign',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          nudgecampaignid: true,
          userids: true,
        },
      },
    },
  }),
  /**
   * @see [create]{@link https://developer.withings.com/api-reference/#tag/nudgecampaign/operation/nudgecampaignv2-create}
   */
  create: new WithingsClientEndpoint<WithingsNudgeCampaignCreateRequest, WithingsNudgeCampaignCreateResponse>({
    method: HttpMethod.POST,
    url: '/v2/nudgecampaign',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          nudgeid: true,
          startdate: true,
          enddate: true,
          max_display_count: true,
        },
      },
    },
  }),
  /**
   * @see [delete]{@link https://developer.withings.com/api-reference/#tag/nudgecampaign/operation/nudgecampaignv2-delete}
   */
  delete: new WithingsClientEndpoint<WithingsNudgeCampaignDeleteRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/nudgecampaign',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          nudgecampaignid: true,
        },
      },
    },
  }),
  /**
   * @see [get]{@link https://developer.withings.com/api-reference/#tag/nudgecampaign/operation/nudgecampaignv2-get}
   */
  get: new WithingsClientEndpoint<WithingsNudgeCampaignGetRequest, WithingsNudgeCampaignGetResponse>({
    method: HttpMethod.POST,
    url: '/v2/nudgecampaign',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          nudgecampaignid: true,
        },
      },
    },
  }),
  /**
   * @see [list]{@link https://developer.withings.com/api-reference/#tag/nudgecampaign/operation/nudgecampaignv2-list}
   */
  list: new WithingsClientEndpoint<WithingsNudgeCampaignListRequest, WithingsNudgeCampaignListResponse>({
    method: HttpMethod.POST,
    url: '/v2/nudgecampaign',
    opts: {
      signature: true,
      pagination: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          offset: false,
        },
      },
    },
  }),
  /**
   * @see [list-users]{@link https://developer.withings.com/api-reference/#tag/nudgecampaign/operation/nudgecampaignv2-listusers}
   */
  listUsers: new WithingsClientEndpoint<WithingsNudgeCampaignListUsersRequest, WithingsNudgeCampaignListUsersResponse>({
    method: HttpMethod.POST,
    url: '/v2/nudgecampaign',
    opts: {
      signature: true,
      pagination: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          nudgecampaignid: true,
          offset: false,
        },
      },
    },
  }),
  /**
   * @see [remove-user]{@link https://developer.withings.com/api-reference/#tag/nudgecampaign/operation/nudgecampaignv2-removeusers}
   */
  removeUser: new WithingsClientEndpoint<WithingsNudgeCampaignRemoveUserRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/nudgecampaign',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          nudgecampaignid: true,
          userids: true,
        },
      },
    },
  }),
  /**
   * @see [update]{@link https://developer.withings.com/api-reference/#tag/nudgecampaign/operation/nudgecampaignv2-update}
   */
  update: new WithingsClientEndpoint<WithingsNudgeCampaignUpdateRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/nudgecampaign',
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          nudgecampaignid: true,
          nudgeid: false,
          startdate: false,
          enddate: false,
          max_display_count: false,
        },
      },
    },
  }),
};
