/**
 * The following table presents the required order data that is contained in the dropshipment service <b>order</b> parameter.
 * The <b>order</b> parameter is a list of <b>JSON</b> objects that constitute product purchase orders, each product purchase order having the following parameter:
 *
 * @see [order]{@link https://developer.withings.com/api-reference/#tag/models/Order}
 */
export type WithingsOrder = {
  /** Random identifier you must provide. It will be used to track your order and <b>must be unique</b>. */
  customer_ref_id: string;
  /** Order delivery information. */
  address: WithingsAddress;
  /** Ordered products. */
  products: WithingsProduct[];
  /** If set to <b>true</b>, the address will not be verified. (default is <b>false</b>)
   * If the address is not validated by carrier, Withings Logistics will ignore the address error and try to ship to the provided address anyway. */
  force_address?: boolean;
};

export type WithingsAddress = {
  /** Client's fullname. */
  name: string;
  /** Company name. */
  company_name?: string;
  /** Client's email. */
  email: string;
  /** Client's phone number in E.164 format. */
  telephone?: string;
  /** Client's primary address (Street address with number). */
  address1: string;
  /** Client's additional address (Apartment or suite number). */
  address2?: string;
  /** Client's city address. */
  city: string;
  /** Client's zipcode address. */
  zip: string;
  /** Client's state address in ISO2 format. */
  state?: string;
  /** Client's country address in ISO2 format. */
  country: string;
};

export type WithingsProduct = {
  /** Product quantity. */
  quantity: number;
  /** Product international article number. Do not use a partner_ref if you are using EAN. */
  ean?: string;
  /** The reference of your Withings device kit you are ordering which will be shared with you by your Withings CSM during the project. Do not use EAN if you are using a partner_ref. */
  partner_ref?: string;
};

export type WithingCreatedOrder = {
  order_id: string;
  customer_ref_id: string;
  status: string;
  products: WithingsProduct[];
};

export type WithingOrderStatus = WithingCreatedOrder & {
  carrier: string;
  carrier_service: string;
  tracking_number: string;
  parcel_status: string;
};
