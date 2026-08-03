import type { EntityId, Page, PageParams } from '@mzad/shared-types';
import {
  mockBanners,
  mockComplaints,
  mockConversations,
  mockCustomers,
  mockNotifications,
  mockOffers,
  mockProviders,
  mockReviews,
  mockServiceCategories,
  mockSettings,
  mockRequests,
  mockVehicles,
} from './mock-data.ts';
import type {
  AdvertisingRepository,
  ComplaintRepository,
  ConversationRepository,
  CustomerRepository,
  NotificationRepository,
  OfferRepository,
  ProviderRepository,
  RequestRepository,
  ReviewRepository,
  ServiceCategoryRepository,
  SettingsRepository,
  VehicleRepository,
} from './repositories.ts';

const clone = <T>(value: T): T => structuredClone(value);
function page<T>(items: T[], params: PageParams): Page<T> {
  const start = params.cursor ? Number.parseInt(params.cursor, 10) : 0;
  const selected = items.slice(start, start + params.limit);
  const next = start + selected.length;
  return next < items.length
    ? { items: clone(selected), nextCursor: String(next) }
    : { items: clone(selected) };
}
const byId = <T extends { id: EntityId }>(items: T[], id: EntityId): T | null =>
  clone(items.find((item) => item.id === id) ?? null);

export class MockCustomerRepository implements CustomerRepository {
  async getById(id: EntityId) {
    return byId(mockCustomers, id);
  }
  async list(params: PageParams) {
    return page(mockCustomers, params);
  }
}
export class MockProviderRepository implements ProviderRepository {
  async getById(id: EntityId) {
    return byId(mockProviders, id);
  }
  async list(params: PageParams) {
    return page(mockProviders, params);
  }
}
export class MockVehicleRepository implements VehicleRepository {
  async listForCustomer(customerId: EntityId) {
    return clone(mockVehicles.filter((item) => item.customerId === customerId));
  }
  async getById(id: EntityId) {
    return byId(mockVehicles, id);
  }
}
export class MockServiceCategoryRepository implements ServiceCategoryRepository {
  async listActive() {
    return clone(
      mockServiceCategories
        .filter((item) => item.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    );
  }
  async getById(id: EntityId) {
    return byId(mockServiceCategories, id);
  }
}
export class MockRequestRepository implements RequestRepository {
  async getById(id: EntityId) {
    return byId(mockRequests, id);
  }
  async list(params: PageParams) {
    return page(mockRequests, params);
  }
  async listForCustomer(customerId: EntityId, params: PageParams) {
    return page(
      mockRequests.filter((item) => item.customerId === customerId),
      params,
    );
  }
}
export class MockOfferRepository implements OfferRepository {
  async getById(id: EntityId) {
    return byId(mockOffers, id);
  }
  async listForRequest(requestId: EntityId) {
    return clone(mockOffers.filter((item) => item.requestId === requestId));
  }
}
export class MockConversationRepository implements ConversationRepository {
  async getByRequestId(requestId: EntityId) {
    return clone(mockConversations.find((item) => item.requestId === requestId) ?? null);
  }
}
export class MockReviewRepository implements ReviewRepository {
  async getByRequestId(requestId: EntityId) {
    return clone(mockReviews.find((item) => item.requestId === requestId) ?? null);
  }
  async listForProvider(providerId: EntityId) {
    return clone(mockReviews.filter((item) => item.providerId === providerId));
  }
}
export class MockComplaintRepository implements ComplaintRepository {
  async getById(id: EntityId) {
    return byId(mockComplaints, id);
  }
  async list(params: PageParams) {
    return page(mockComplaints, params);
  }
}
export class MockNotificationRepository implements NotificationRepository {
  async getById(id: EntityId) {
    return byId(mockNotifications, id);
  }
  async list(params: PageParams) {
    return page(mockNotifications, params);
  }
}
export class MockAdvertisingRepository implements AdvertisingRepository {
  async getById(id: EntityId) {
    return byId(mockBanners, id);
  }
  async list() {
    return clone(mockBanners);
  }
}
export class MockSettingsRepository implements SettingsRepository {
  async get() {
    return clone(mockSettings);
  }
}

export const mockRepositories = {
  customers: new MockCustomerRepository(),
  providers: new MockProviderRepository(),
  vehicles: new MockVehicleRepository(),
  services: new MockServiceCategoryRepository(),
  requests: new MockRequestRepository(),
  offers: new MockOfferRepository(),
  conversations: new MockConversationRepository(),
  reviews: new MockReviewRepository(),
  complaints: new MockComplaintRepository(),
  notifications: new MockNotificationRepository(),
  advertising: new MockAdvertisingRepository(),
  settings: new MockSettingsRepository(),
} as const;
