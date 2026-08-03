import type {
  AdvertisingBanner,
  AppSettings,
  Complaint,
  Conversation,
  Customer,
  EntityId,
  Notification,
  Offer,
  Page,
  PageParams,
  Provider,
  Review,
  ServiceCategory,
  ServiceRequest,
  Vehicle,
} from '@mzad/shared-types';

export interface CustomerRepository {
  getById(id: EntityId): Promise<Customer | null>;
  list(page: PageParams): Promise<Page<Customer>>;
}
export interface ProviderRepository {
  getById(id: EntityId): Promise<Provider | null>;
  list(page: PageParams): Promise<Page<Provider>>;
}
export interface VehicleRepository {
  listForCustomer(customerId: EntityId): Promise<Vehicle[]>;
  getById(id: EntityId): Promise<Vehicle | null>;
}
export interface ServiceCategoryRepository {
  listActive(): Promise<ServiceCategory[]>;
  getById(id: EntityId): Promise<ServiceCategory | null>;
}
export interface RequestRepository {
  getById(id: EntityId): Promise<ServiceRequest | null>;
  list(page: PageParams): Promise<Page<ServiceRequest>>;
  listForCustomer(customerId: EntityId, page: PageParams): Promise<Page<ServiceRequest>>;
}
export interface OfferRepository {
  getById(id: EntityId): Promise<Offer | null>;
  listForRequest(requestId: EntityId): Promise<Offer[]>;
}
export interface ConversationRepository {
  getByRequestId(requestId: EntityId): Promise<Conversation | null>;
}
export interface ReviewRepository {
  getByRequestId(requestId: EntityId): Promise<Review | null>;
  listForProvider(providerId: EntityId): Promise<Review[]>;
}
export interface ComplaintRepository {
  getById(id: EntityId): Promise<Complaint | null>;
  list(page: PageParams): Promise<Page<Complaint>>;
}
export interface NotificationRepository {
  getById(id: EntityId): Promise<Notification | null>;
  list(page: PageParams): Promise<Page<Notification>>;
}
export interface AdvertisingRepository {
  getById(id: EntityId): Promise<AdvertisingBanner | null>;
  list(): Promise<AdvertisingBanner[]>;
}
export interface SettingsRepository {
  get(): Promise<AppSettings>;
}
