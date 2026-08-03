/** Confirmed simulation defaults; the administration repository can replace configurable values. */
export const platformDefaults = {
  locale: 'ar-IQ',
  direction: 'rtl',
  interfaceLanguage: 'ar',
  country: 'Iraq',
  primaryLaunchGovernorate: 'Baghdad',
  colorSchemes: ['light', 'dark'],
  visibleOfferLimit: 7,
  pageSize: 20,
  requestExpiryHours: { towing: 6, mobileService: 72, default: 168 },
  accountDeletionWaitingHours: 48,
  deletedDataRetentionMonths: 6,
  completionReminderDays: 5,
} as const;
