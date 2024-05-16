import { authPro } from '~/api/endpoints/auth-pro.endpoint';
import { auth } from '~/api/endpoints/auth.endpoint';
import { device } from '~/api/endpoints/device.endpoint';
import { dropshipment } from '~/api/endpoints/dropshipment.endpoint';
import { heart } from '~/api/endpoints/heart.endpoint';
import { measure } from '~/api/endpoints/measure.endpoint';
import { notify } from '~/api/endpoints/notify.endpoint';
import { campaign, nudge } from '~/api/endpoints/nudge.endpoint';
import { order } from '~/api/endpoints/order.endpoint';
import { rawData } from '~/api/endpoints/raw-data.endpoint';
import { signature } from '~/api/endpoints/signature.endpoint';
import { sleep } from '~/api/endpoints/sleep.endpoint';
import { stetho } from '~/api/endpoints/stetho.endpoint';
import { user } from '~/api/endpoints/user.endpoint';

export const withingsApi = {
  auth: { ...auth, ...authPro },
  dropshipment,
  order,
  user,
  measure,
  heart,
  stetho,
  sleep,
  notify,
  signature,
  rawData,
  device,
  nudge: { ...nudge, campaign },
};
