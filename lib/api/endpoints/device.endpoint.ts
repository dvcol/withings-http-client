import { HttpMethod } from '@dvcol/base-http-client/utils/http';

import type {
  WithingsDeviceDisableFeatureRequest,
  WithingsDeviceEnableFeatureRequest,
  WithingsDeviceUpdateSIMStatusRequest,
} from '~/models/withings-device.model';

import { WithingsClientEndpoint } from '~/models/withings-client.model';

/**
 * @see [device]{@link https://developer.withings.com/api-reference/#tag/device}
 */
export const device = {
  /**
   * @see [disable]{@link https://developer.withings.com/api-reference/#tag/device/operation/devicev2-disablefeature}
   */
  disable: new WithingsClientEndpoint<WithingsDeviceDisableFeatureRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/device?action&client_id&signature&nonce&feature_name&userid&model',
    seed: {
      action: 'disablefeature',
    },
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          feature_name: true,
          userid: true,
          model: true,
        },
      },
    },
  }),
  /**
   * @see [enable]{@link https://developer.withings.com/api-reference/#tag/device/operation/devicev2-enablefeature}
   */
  enable: new WithingsClientEndpoint<WithingsDeviceEnableFeatureRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/device?action&client_id&signature&nonce&feature_name&userid&model',
    seed: {
      action: 'enablefeature',
    },
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          feature_name: true,
          userid: true,
          model: true,
        },
      },
    },
  }),
  /**
   * The Withings Cellular SIM Plan Management API enables developers to manage the SIM plan status of Withings cellular devices.
   * This API is useful for developers who want to stop paying for cellular connectivity after the end of their end user program.
   * Once the SIM plan is terminated, the device will lose its ability to connect over the cellular network after a grace period of 30 days.
   * However, during this grace period, developers can still reactivate the cellular network if they change their mind.
   * Additionally, the device will automatically update within the next 48 hours in order to support being set up in the Withings app over Wi-Fi.
   * Once the update is complete, the device will display the necessary information on its screen to allow for a seamless setup process.
   *
   * * <b>Important:</b> After the 30 day grace period, the SIM is TERMINATED and cannot be re-activated.
   *
   * @see [update-sim-status]{@link https://developer.withings.com/api-reference/#tag/device/operation/devicev2-updatesimstatus}
   */
  updateSimStatus: new WithingsClientEndpoint<WithingsDeviceUpdateSIMStatusRequest, unknown>({
    method: HttpMethod.POST,
    url: '/v2/device?action&client_id&signature&nonce&mac_address&sim_status',
    seed: {
      action: 'updatesimstatus',
    },
    opts: {
      signature: true,
      parameters: {
        query: {
          action: true,
          client_id: true,
          signature: true,
          nonce: true,
          mac_address: true,
          sim_status: true,
        },
      },
    },
  }),
};
