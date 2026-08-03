import assert from 'node:assert/strict';
import test from 'node:test';
import type {
  AccountDeletionRequest,
  AppSettings,
  Offer,
  Provider,
  ProviderActivity,
  ServiceRequest,
} from '@mzad/shared-types';
import { validateRequestAttachments } from '@mzad/shared-validation';
import {
  acceptOffer,
  mayCancelAccountDeletion,
  mayCancelRequest,
  mayCreateReview,
  mayCustomerEditRequest,
  mayEditProviderReply,
  mayProviderSubmitOffer,
  mayRequestReceiveOffer,
  needsCompletionReminder,
  providerMatchesRequest,
  requestExpiry,
} from './index.ts';

const settings: AppSettings = {
  id: 'app_settings',
  maximumValidOffers: 7,
  towingExpiryHours: 6,
  mobileServiceExpiryHours: 72,
  defaultRequestExpiryHours: 168,
  completionReminderDays: 5,
  accountDeletionWaitingHours: 48,
  deletedDataRetentionMonths: 6,
  bannerRotationSeconds: 5,
};
const activity: ProviderActivity = {
  id: 'towing',
  serviceCode: 'towing',
  nameAr: 'سحب',
  isActive: true,
};
const services = [
  {
    id: 'service-towing',
    code: 'towing' as const,
    nameAr: 'سحب',
    displayOrder: 1,
    isActive: true,
    requiresDetailedAddress: true,
    expiryHours: 6,
  },
];
const provider: Provider = {
  id: 'p1',
  responsiblePersonName: 'تجريبي',
  businessName: 'تجريبي',
  phone: '+9647900000000',
  phoneVerified: true,
  status: 'approved',
  activityIds: ['towing'],
  supportedVehicleBrands: [],
  areaId: 'baghdad',
  fullAddress: 'تجريبي',
  workingHours: [],
  businessImageUrls: [],
  acceptedTermsAt: '2026-01-01T00:00:00.000Z',
  acceptedPrivacyAt: '2026-01-01T00:00:00.000Z',
  acceptedUsageInstructionsAt: '2026-01-01T00:00:00.000Z',
  rating: 0,
  ratingCount: 0,
  createdAt: '2026-01-01T00:00:00.000Z',
};
const request: ServiceRequest = {
  id: 'r1',
  customerId: 'c1',
  vehicleId: 'v1',
  serviceCategoryId: 'service-towing',
  faultCategoryIds: [],
  description: 'تجريبي',
  location: { areaId: 'baghdad', fullAddress: 'تجريبي' },
  attachments: [],
  status: 'receiving_offers',
  submittedAt: '2026-01-01T00:00:00.000Z',
  expiresAt: '2026-01-01T06:00:00.000Z',
};
const offer = (id: string, providerId = id): Offer => ({
  id,
  requestId: 'r1',
  providerId,
  status: 'active',
  price: { kind: 'fixed', amountIqd: 1000 },
  imageUrls: [],
  createdAt: request.submittedAt,
  updatedAt: request.submittedAt,
});

test('matches approved providers by activity and area, including towing only', () => {
  assert.equal(providerMatchesRequest(provider, request, [activity], services), true);
  assert.equal(
    providerMatchesRequest({ ...provider, activityIds: ['tires'] }, request, [activity], services),
    false,
  );
  assert.equal(
    providerMatchesRequest({ ...provider, areaId: 'basra' }, request, [activity], services),
    false,
  );
});
test('provider cannot offer before approval or more than once', () => {
  assert.equal(
    mayProviderSubmitOffer(
      { ...provider, status: 'pending' },
      request,
      [],
      settings,
      [activity],
      services,
    ),
    false,
  );
  assert.equal(
    mayProviderSubmitOffer(
      provider,
      request,
      [offer('o1', provider.id)],
      settings,
      [activity],
      services,
    ),
    false,
  );
});
test('maximum seven valid offers closes reception', () => {
  assert.equal(
    mayRequestReceiveOffer(
      request,
      Array.from({ length: 6 }, (_, i) => offer(`o${i}`)),
      settings,
    ),
    true,
  );
  assert.equal(
    mayRequestReceiveOffer(
      request,
      Array.from({ length: 7 }, (_, i) => offer(`o${i}`)),
      settings,
    ),
    false,
  );
});
test('request is editable only before first offer', () => {
  assert.equal(mayCustomerEditRequest(request, []), true);
  assert.equal(mayCustomerEditRequest(request, [offer('o1')]), false);
});
test('request accepts at most three image attachments', () => {
  const images = Array.from({ length: 3 }, (_, index) => ({
    id: `a${index}`,
    type: 'image' as const,
    mockUrl: `mock://${index}`,
  }));
  assert.equal(validateRequestAttachments(images).valid, true);
  assert.equal(
    validateRequestAttachments([...images, { id: 'a4', type: 'image', mockUrl: 'mock://4' }]).valid,
    false,
  );
});
test('cancellation is allowed in every status with a written reason', () => {
  for (const status of [
    'submitted',
    'receiving_offers',
    'offer_accepted',
    'waiting_customer_contact',
    'ready_for_pickup',
    'completed',
    'cancelled',
    'expired',
  ] as const) {
    assert.equal(mayCancelRequest('سبب مكتوب'), true, status);
    assert.equal(mayCancelRequest('  '), false, status);
  }
});
test('accepts exactly one and leaves other offers visible but not accepted', () => {
  const result = acceptOffer(request, [offer('o1'), offer('o2')], 'o1');
  assert.equal(result.request.acceptedOfferId, 'o1');
  assert.deepEqual(
    result.offers.map((item) => item.status),
    ['accepted', 'not_accepted'],
  );
  assert.throws(() => acceptOffer(result.request, result.offers, 'o2'), /REQUEST_ALREADY/);
});
test('calculates towing, mobile and default expiries', () => {
  const start = '2026-01-01T00:00:00.000Z';
  assert.equal(requestExpiry(start, { expiryHours: 6 }), '2026-01-01T06:00:00.000Z');
  assert.equal(requestExpiry(start, { expiryHours: 72 }), '2026-01-04T00:00:00.000Z');
  assert.equal(requestExpiry(start, { expiryHours: 168 }), '2026-01-08T00:00:00.000Z');
});
test('review requires completed customer request', () => {
  assert.equal(mayCreateReview({ ...request, status: 'completed' }, 'c1'), true);
  assert.equal(mayCreateReview(request, 'c1'), false);
});
test('provider reply edit window is seven days', () => {
  assert.equal(mayEditProviderReply('2026-01-01T00:00:00.000Z', '2026-01-08T00:00:00.000Z'), true);
  assert.equal(mayEditProviderReply('2026-01-01T00:00:00.000Z', '2026-01-08T00:00:00.001Z'), false);
});
test('account deletion is reversible only inside 48-hour waiting period', () => {
  const deletion: AccountDeletionRequest = {
    id: 'd1',
    customerId: 'c1',
    reason: 'تجريبي',
    requestedAt: '2026-01-01T00:00:00.000Z',
    scheduledDeletionAt: '2026-01-03T00:00:00.000Z',
    status: 'waiting',
  };
  assert.equal(mayCancelAccountDeletion(deletion, '2026-01-02T23:59:59.999Z'), true);
  assert.equal(mayCancelAccountDeletion(deletion, deletion.scheduledDeletionAt), false);
});
test('five-day reminder does not complete the request automatically', () => {
  const ready = { ...request, status: 'ready_for_pickup' as const };
  assert.equal(needsCompletionReminder(ready, '2026-01-06T00:00:00.000Z'), true);
  assert.equal(ready.status, 'ready_for_pickup');
});
