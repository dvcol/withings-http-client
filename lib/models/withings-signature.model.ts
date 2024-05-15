export type WithingSignatureRequest = {
  /** A random token used to prevent replay attacks (Cf. [Signature v2 - Getnonce]{@link https://developer.withings.com/api-reference/#operation/signaturev2-getnonce}). */
  nonce: string;
  /** A Hash of params (Cf. [Signature hash protocol]{@link https://developer.withings.com/developer-guide/v3/get-access/sign-your-requests}). */
  signature: string;
};

export type WithingSignatureGetNonceRequest = {
  /** Service action name. Must take the constant string value <b>getnonce</b> */
  action: 'getnonce';
  /** The client identifier. */
  client_id: string;
  /** A unix timestamp. */
  timestamp: number;
  /** @see [getnonce]{@link https://developer.withings.com/api-reference/#tag/signature/operation/signaturev2-getnonce} */
  signature: string;
};

export type WithingSignatureGetNonceResponse = { nonce: string };
