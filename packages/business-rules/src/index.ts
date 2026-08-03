import type {
  AccountDeletionRequest,
  AdvertisingBanner,
  AppSettings,
  Customer,
  EntityId,
  NotificationTarget,
  Offer,
  Provider,
  ProviderActivity,
  RequestCancellation,
  ServiceCategory,
  ServiceRequest,
} from '@mzad/shared-types';
import { validateCancellationReason } from '@mzad/shared-validation';

const activeOfferStatuses = new Set<Offer['status']>(['active', 'accepted']);
export function providerMatchesRequest(
  provider: Provider,
  request: ServiceRequest,
  activities: ProviderActivity[],
  services: ServiceCategory[],
): boolean {
  const requestAreaMatches = provider.areaId === request.location.areaId;
  const requestService = services.find((service) => service.id === request.serviceCategoryId);
  const matchingActivity = activities.some(
    (activity) =>
      provider.activityIds.includes(activity.id) &&
      activity.serviceCode === requestService?.code &&
      activity.isActive,
  );
  return provider.status === 'approved' && requestAreaMatches && matchingActivity;
}
export function mayProviderSubmitOffer(
  provider: Provider,
  request: ServiceRequest,
  offers: Offer[],
  settings: AppSettings,
  activities: ProviderActivity[],
  services: ServiceCategory[],
): boolean {
  return (
    providerMatchesRequest(provider, request, activities, services) &&
    mayRequestReceiveOffer(request, offers, settings) &&
    !offers.some((offer) => offer.requestId === request.id && offer.providerId === provider.id)
  );
}
export function mayRequestReceiveOffer(
  request: ServiceRequest,
  offers: Offer[],
  settings: AppSettings,
): boolean {
  const validCount = offers.filter(
    (offer) => offer.requestId === request.id && activeOfferStatuses.has(offer.status),
  ).length;
  return (
    (request.status === 'submitted' || request.status === 'receiving_offers') &&
    validCount < settings.maximumValidOffers
  );
}
export function mayCustomerEditRequest(request: ServiceRequest, offers: Offer[]): boolean {
  return !offers.some((offer) => offer.requestId === request.id);
}
export function mayEditOffer(offer: Offer, request: ServiceRequest): boolean {
  return (
    offer.status === 'active' &&
    request.acceptedOfferId === undefined &&
    request.status !== 'cancelled' &&
    request.status !== 'expired'
  );
}
export function acceptOffer(
  request: ServiceRequest,
  offers: Offer[],
  offerId: EntityId,
): { request: ServiceRequest; offers: Offer[] } {
  if (request.acceptedOfferId) throw new Error('REQUEST_ALREADY_HAS_ACCEPTED_OFFER');
  const selected = offers.find(
    (offer) => offer.id === offerId && offer.requestId === request.id && offer.status === 'active',
  );
  if (!selected) throw new Error('OFFER_NOT_AVAILABLE');
  return {
    request: { ...request, acceptedOfferId: offerId, status: 'offer_accepted' },
    offers: offers.map((offer) =>
      offer.requestId !== request.id
        ? offer
        : {
            ...offer,
            status:
              offer.id === offerId
                ? 'accepted'
                : offer.status === 'active'
                  ? 'not_accepted'
                  : offer.status,
          },
    ),
  };
}
export function requestExpiry(
  submittedAt: string,
  service: Pick<ServiceCategory, 'expiryHours'>,
): string {
  return new Date(Date.parse(submittedAt) + service.expiryHours * 3_600_000).toISOString();
}
export function createCancellation(
  reason: string,
  cancelledBy: RequestCancellation['cancelledBy'],
  now: string,
): RequestCancellation {
  if (!validateCancellationReason(reason).valid) throw new Error('CANCELLATION_REASON_REQUIRED');
  return { reason: reason.trim(), cancelledBy, cancelledAt: now };
}
export function mayCancelRequest(reason: string): boolean {
  return validateCancellationReason(reason).valid;
}
export function mayCreateReview(request: ServiceRequest, customerId: EntityId): boolean {
  return request.status === 'completed' && request.customerId === customerId;
}
export function mayEditProviderReply(replyUpdatedAt: string, now: string): boolean {
  return Date.parse(now) <= Date.parse(replyUpdatedAt) + 7 * 86_400_000;
}
export function mayMarkCompleted(actor: 'customer' | 'provider', request: ServiceRequest): boolean {
  return (
    (actor === 'customer' || actor === 'provider') &&
    !['completed', 'cancelled', 'expired'].includes(request.status)
  );
}
export function mayCancelAccountDeletion(request: AccountDeletionRequest, now: string): boolean {
  return request.status === 'waiting' && Date.parse(now) < Date.parse(request.scheduledDeletionAt);
}
export function needsCompletionReminder(request: ServiceRequest, now: string): boolean {
  return (
    request.status === 'ready_for_pickup' &&
    Date.parse(now) >= Date.parse(request.submittedAt) + 5 * 86_400_000
  );
}
export function activeBanners(
  banners: AdvertisingBanner[],
  application: 'customer' | 'provider',
  now: string,
): AdvertisingBanner[] {
  const at = Date.parse(now);
  return banners
    .filter(
      (banner) =>
        banner.isActive &&
        (banner.target.application === application || banner.target.application === 'both') &&
        Date.parse(banner.startsAt) <= at &&
        at < Date.parse(banner.endsAt),
    )
    .sort((a, b) => a.displayOrder - b.displayOrder || a.id.localeCompare(b.id));
}
type Recipient = {
  id: EntityId;
  type: 'customer' | 'provider';
  areaId: EntityId;
  activityIds: EntityId[];
};
export function selectNotificationRecipients(
  target: NotificationTarget,
  customers: Customer[],
  providers: Provider[],
): Recipient[] {
  const recipients: Recipient[] = [
    ...customers.map((customer) => ({
      id: customer.id,
      type: 'customer' as const,
      areaId: customer.areaId,
      activityIds: [],
    })),
    ...providers.map((provider) => ({
      id: provider.id,
      type: 'provider' as const,
      areaId: provider.areaId,
      activityIds: provider.activityIds,
    })),
  ];
  switch (target.kind) {
    case 'all_users':
      return recipients;
    case 'all_customers':
      return recipients.filter((item) => item.type === 'customer');
    case 'all_providers':
      return recipients.filter((item) => item.type === 'provider');
    case 'customer':
      return recipients.filter((item) => item.type === 'customer' && item.id === target.customerId);
    case 'provider':
      return recipients.filter((item) => item.type === 'provider' && item.id === target.providerId);
    case 'provider_activity':
      return recipients.filter(
        (item) => item.type === 'provider' && item.activityIds.includes(target.activityId),
      );
    case 'area':
      return recipients.filter((item) => item.areaId === target.areaId);
    case 'selected_users':
      return recipients.filter((item) =>
        target.recipients.some(
          (selected) => selected.id === item.id && selected.type === item.type,
        ),
      );
  }
}
