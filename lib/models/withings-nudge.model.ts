import type { WithingsPaginated } from '~/models/withings-client.model';
import type { WithingSignatureRequest } from '~/models/withings-signature.model';

export type WithingsNudge = {
  campaignids: string[];
  content: string[];
  iconids: number[];
  model: number;
  position: 'first' | 'last';
  created: number;
  modified: number;
};

export type WithingsNudgeCampaign = {
  id: number;
  nudgeid: number;
  max_display_count: number;
  startdate: number;
  enddate: number;
  user_count: number;
  created: number;
  modified: number;
};

export type WithingsNudgeCampaignUser = {
  userid: number;
  campaignid: number;
  completion_date: number;
  display_count: number;
  deliver_count: number;
  created: number;
  modified: number;
};

export type WithingsNudgeCreateRequest = {
  /** Service action name. Must be set to <b>create</b>. */
  action?: 'create';
  /** The client identifier. */
  client_id: string;
  /** The Ids of the Nudge Icon  */
  iconids: string[] | number[];
  /** Array with 2 lines of text representing the Nudge text content */
  content: string[];
  /** Model integer value of a device or a consumable */
  model: number;
  /**
   * Nudge position in the dynamic screen list.
   * Allowed values are first and last.
   */
  position?: 'first' | 'last';
} & WithingSignatureRequest;

export type WithingsNudgeCreateResponse = {
  nudgeid: number;
};

type WithingsNudgeCommonRequest = {
  /** The client identifier. */
  client_id: string;
  /** The Id of the Nudge screen */
  nudgeid: number | string;
} & WithingSignatureRequest;

export type WithingsNudgeDeleteRequest = WithingsNudgeCommonRequest & {
  /** Service action name. Must be set to <b>delete</b>. */
  action?: 'delete';
};

export type WithingsNudgeGetRequest = WithingsNudgeCommonRequest & {
  /** Service action name. Must be set to <b>get</b>. */
  action?: 'get';
};

export type WithingsNudgeGetResponse = {
  nudge: WithingsNudge;
};

export type WithingsNudgeListRequest = {
  /** Service action name. Must be set to <b>list</b>. */
  action?: 'list';
  /** The client identifier. */
  client_id: string;
  /** When a first call returns <b>more:1</b> and <b>offset:XX</b>, set value <b>XX</b> in this parameter to retrieve next available rows. */
  offset?: number;
} & WithingSignatureRequest;

export type WithingsNudgeListResponse = WithingsPaginated<{
  nudges: WithingsNudge[];
}>;

export type WithingsNudgeUpdateRequest = {
  /** Service action name. Must take the string value <b>update</b>. */
  action?: 'update';
  /** The client identifier. */
  client_id: string;
  /** The Id of the Nudge screen */
  nudgeid: number | string;
  /** The Ids of the Nudge Icon  */
  iconids?: string[] | number[];
  /** Array with 2 lines of text representing the Nudge text content */
  content?: string[];
  /** Model integer value of a device or a consumable */
  model?: number;
  /**
   * Nudge position in the dynamic screen list.
   * Allowed values are first and last.
   */
  position?: 'first' | 'last';
} & WithingSignatureRequest;

export type WithingsNudgeCampaignAddUserRequest = {
  /** Service action name. Must be set to <b>addusers</b>. */
  action?: 'addusers';
  /** The client identifier. */
  client_id: string;
  /** The Nudge campaign identifier. */
  nudgecampaignid: number | string;
  /** The list of user identifiers to add to the campaign. */
  userids: string[] | number[];
} & WithingSignatureRequest;

export type WithingsNudgeCampaignCreateRequest = {
  /** Service action name. Must be set to <b>create</b>. */
  action?: 'create';
  /** The client identifier. */
  client_id: string;
  /** The Id of the Nudge screen */
  nudgeid: number | string;
  /** The Start date of the campaign as a unix timestamp. */
  startdate: number;
  /** The End date of the campaign as a unix timestamp. */
  enddate: number;
  /** The number of times the nudge should appear on the device screen */
  max_display_count: number | string;
} & WithingSignatureRequest;

export type WithingsNudgeCampaignCreateResponse = {
  campaignid: number;
};

export type WithingsNudgeCampaignCommonRequest = {
  /** The client identifier. */
  client_id: string;
  /** The Nudge campaign identifier. */
  nudgecampaignid: number | string;
} & WithingSignatureRequest;

export type WithingsNudgeCampaignDeleteRequest = WithingsNudgeCampaignCommonRequest & {
  /** Service action name. Must be set to <b>delete</b>. */
  action?: 'delete';
};

export type WithingsNudgeCampaignGetRequest = WithingsNudgeCampaignCommonRequest & {
  /** Service action name. Must be set to <b>get</b>. */
  action?: 'get';
};

export type WithingsNudgeCampaignGetResponse = {
  campaign: WithingsNudgeCampaign;
};

export type WithingsNudgeCampaignListRequest = {
  /** Service action name. Must be set to <b>list</b>. */
  action?: 'list';
  /** The client identifier. */
  client_id: string;
  /** When a first call returns <b>more:1</b> and <b>offset:XX</b>, set value <b>XX</b> in this parameter to retrieve next available rows. */
  offset?: number;
} & WithingSignatureRequest;

export type WithingsNudgeCampaignListResponse = WithingsPaginated<{
  campaigns: WithingsNudgeCampaign[];
}>;

export type WithingsNudgeCampaignListUsersRequest = WithingsNudgeCampaignCommonRequest & {
  /** Service action name. Must be set to <b>listusers</b>. */
  action?: 'listusers';
  /** When a first call returns <b>more:1</b> and <b>offset:XX</b>, set value <b>XX</b> in this parameter to retrieve next available rows. */
  offset?: number;
};

export type WithingsNudgeCampaignListUsersResponse = WithingsPaginated<{
  users: WithingsNudgeCampaignUser[];
}>;

export type WithingsNudgeCampaignRemoveUserRequest = WithingsNudgeCampaignCommonRequest & {
  /** Service action name. Must be set to <b>removeusers</b>. */
  action?: 'removeusers';
  /** The list of user identifiers to remove from the campaign. */
  userids: string[] | number[];
} & WithingSignatureRequest;

export type WithingsNudgeCampaignUpdateRequest = WithingsNudgeCampaignCommonRequest & {
  /** Service action name. Must be set to <b>update</b>. */
  action?: 'update';
  /** The id of the Nudge screen */
  nudgeid?: number | string;
  /** The Start date as a unix timestamp. */
  startdate?: number;
  /** The End date as a unix timestamp. */
  enddate?: number;
  /** The number of times the nudge should appear on the device screen */
  max_display_count?: number | string;
};
