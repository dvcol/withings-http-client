import { HttpMethod } from '@dvcol/common-utils/http';

import type { WithingSignatureGetNonceRequest, WithingSignatureGetNonceResponse } from '~/models/withings-signature.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * The following services are part of the Logistics APIs.
 * Refer to [this section]{@link https://developer.withings.com/developer-guide/v3/integration-guide/dropship-only/logistics-api/overview-create-order} for more information.
 *
 * @see [signature]{@link https://developer.withings.com/api-reference/#tag/signature}
 */
export const signature = {
  /**
   * A <b>nonce</b> is a random token that is generated and stored in Withings server with <b>30 minutes of validity</b>.
   *
   * As a partner, you will use this <b>nonce</b> token in the API services that require a <b>signature</b> so that Withings can check that the <b>nonce</b> token is still valid and was never used before.
   * The usage of a <b>nonce</b> token prevents your service calls from replay attacks.
   *
   * Because this service is an Device Management service, Withings checks your authorized access using your client_id and your <b>secret</b> based <b>signature</b>.
   *
   * To generate the <b>signature</b> please follow these steps:
   *
   * - Sort the following parameters alphabetically: action, client_id, timestamp
   * - Generate a string by concatenating values separated by a comma. The string should look like: value1,value2,value3.
   * - Apply a hmac hashing function on the string using the algorithm <b>sha256</b> and your partner <b>client_secret</b> (available in your [Withings partner dashboard]{@link https://developer.withings.com/dashboard/}) as a secret key.
   * - Add the hash string in the parameters under the key <b>signature</b>
   *
   * @see [getnonce]{@link https://developer.withings.com/api-reference/#tag/signature/operation/signaturev2-getnonce}
   */
  nonce: new WithingsClientEndpoint<WithingSignatureGetNonceRequest, WithingSignatureGetNonceResponse>({
    method: HttpMethod.GET,
    url: '/v2/signature?action&client_id&timestamp&signature',
    seed: {
      action: 'getnonce',
    },
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          timestamp: true,
          signature: true,
        },
      },
    },
  }),
};
