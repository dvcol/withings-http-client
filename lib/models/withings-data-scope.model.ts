export const WithingsDataScope = {
  userActivity: 'user.activity',
  userMetrics: 'user.metrics',
  userInfo: 'user.info',
} as const;

export type WithingsDataScopes = (typeof WithingsDataScope)[keyof typeof WithingsDataScope];
