import type { WithingCreatedOrder, WithingOrderStatus, WithingsOrder } from '~/models/withings-order.model';

import type { WithingSignatureRequest } from '~/models/withings-signature.model';

import type { WithingsUserCreateRequest } from '~/models/withings-user.model';

export type WithingsDropshipmentCreateRequest = {
  /** Must take the constant string value <b>createorder</b>. */
  action: 'createorder';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** Refer to [Order model]{@link https://developer.withings.com/api-reference/#tag/models/Order}. The maximum number of orders is 10 per API request. */
  order: WithingsOrder;
  /** Your dropshipment billing ID. If you don't know it, ignore this parameter. */
  customerid?: string;
  /**
   * If is set, it will create fake orders, and simulate the evolution of the orders status and sending of notifications.
   * * 1 - SHIPPED sequence
   * * 2 - TRASHED sequence
   * * 3 - FAILED sequence
   * * 4 - BACKHOLD sequence
   */
  testmode?: 1 | 2 | 3 | 4;
} & WithingSignatureRequest;

export type WithingsDropshipmentCreateResponse = {
  orders: WithingCreatedOrder[];
  dropshipmentorderid: string;
};

export type WithingsDropshipmentCreateUserRequest = {
  /** Service action name. Must take the constant string value <b>createuserorder</b>. */
  action: 'createuserorder';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** The maximum number of orders is 10 per API request. */
  order: WithingsOrder;
  /**
   * If is set, it will create fake orders, and simulate the evolution of the orders status and sending of notifications.
   * * 1 - SHIPPED sequence
   * * 2 - TRASHED sequence
   * * 3 - FAILED sequence
   * * 4 - BACKHOLD sequence
   */
  testmode?: 1 | 2 | 3 | 4;
} & WithingsUserCreateRequest &
  WithingSignatureRequest;

export type WithingsDropshipmentCreateUserOrderResponse = WithingsDropshipmentCreateResponse & {
  user: {
    code: string;
    external_id: string;
  };
};

export type WithingsDropshipmentDeleteRequest = {
  /** Service action name. Must take the constant string value <b>delete</b>. */
  action: 'delete';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** Withings generated identifier used to track your order. */
  order_id: string;
} & WithingSignatureRequest;

export type WithingsDropshipmentStatusRequest = {
  /** Service action name. Must take the constant string value <b>getorderstatus</b>. */
  action: 'getorderstatus';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /**
   * List of order_id
   *
   * * <b>Important</b>: Only use if customer_ref_ids is not provided.
   */
  order_ids?: string[];
  /**
   * Movement reference number of dropshipment orderlines
   *
   * * <b>Important</b>: Only use if order_ids is not provided.
   */
  customer_ref_ids?: string[];
  /** Your dropshipment billing ID. If you don't know it, ignore this parameter. */
  customerid?: string;
  /** Enable advanced features if set to 't' */
  enrich?: boolean;
} & WithingSignatureRequest;

export type WithingsDropshipmentStatusResponse = {
  orders: WithingOrderStatus[];
};

export type WithingsDropshipmentUpdateRequest = {
  /** Service action name. Must take the constant string value <b>update</b>. */
  action: 'update';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /** Withings generated identifier used to track your order. */
  order_id: string;
  /** Restricted to one order only. */
  order: WithingsOrder;
} & WithingSignatureRequest;

export type WithingsDropshipmentUpdateResponse = {
  orders: WithingOrderStatus[];
};

export type WithingsOrderDetailRequest = {
  /** Service action name. Must take the constant string value <b>getdetail</b>. */
  action: 'getdetail';
  /** Your <b>Client ID</b>. */
  client_id: string;
  /**
   * List of order_id
   *
   * * <b>Important</b>: Only use if customer_ref_ids is not provided.
   */
  order_ids?: string[];
  /**
   * Movement reference number of dropshipment orderlines
   *
   * * <b>Important</b>: Only use if order_ids is not provided.
   */
  customer_ref_ids?: string[];
  /** Your dropshipment billing ID. If you don't know it, ignore this parameter. */
  customerid?: string;
} & WithingSignatureRequest;

export type WithingsOrderDetailResponse = {
  orders: WithingOrderStatus[];
};
