export type EntityId = string;
export type IsoDateTime = string;
export type UserType = 'customer' | 'provider' | 'admin';
export type PageParams = { cursor?: string; limit: number };
export type Page<T> = { items: T[]; nextCursor?: string };
export type Coordinates = { latitude: number; longitude: number };

export type CustomerAccountStatus =
  | 'active'
  | 'temporarily_suspended'
  | 'permanently_suspended'
  | 'deletion_pending'
  | 'deleted';
export type ProviderStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'temporarily_suspended'
  | 'permanently_suspended';
export type ProviderDocumentType = 'identity' | 'practice_license' | 'business_location_image';
export type ProviderDocumentStatus = 'pending' | 'approved' | 'rejected';
export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'other';
export type ServiceCode =
  | 'maintenance'
  | 'spare_parts'
  | 'mobile_service'
  | 'towing'
  | 'tires'
  | 'batteries'
  | 'car_glass'
  | 'accessories';
export type FaultCode =
  | 'unknown'
  | 'engine'
  | 'electrical'
  | 'cooling_ac'
  | 'brakes'
  | 'suspension_steering'
  | 'transmission'
  | 'inspection_diagnostics'
  | 'periodic_maintenance'
  | 'painting_body'
  | 'wrapping_upholstery'
  | 'exhaust_performance'
  | 'other';
export type SparePartOption =
  | 'parts_with_installation'
  | 'parts_only'
  | 'offers_with_or_without_parts'
  | 'unknown';
export type RequestStatus =
  | 'submitted'
  | 'receiving_offers'
  | 'offer_accepted'
  | 'waiting_customer_contact'
  | 'ready_for_pickup'
  | 'completed'
  | 'cancelled'
  | 'expired';
export type OfferStatus = 'active' | 'accepted' | 'not_accepted' | 'withdrawn' | 'expired';
export type MessageDeliveryStatus = 'pending' | 'delivered' | 'failed';
export type ComplaintStatus = 'submitted' | 'under_review' | 'resolved' | 'rejected';
export type ComplaintReason =
  | 'service_quality'
  | 'provider_conduct'
  | 'customer_conduct'
  | 'offer_mismatch'
  | 'abusive_content'
  | 'other';
export type NotificationType =
  | 'request_update'
  | 'new_offer'
  | 'message'
  | 'completion_reminder'
  | 'administration'
  | 'marketing';
export type NotificationStatus = 'draft' | 'scheduled' | 'sent' | 'cancelled';
export type NotificationDeliveryStatus = 'pending' | 'delivered' | 'failed';

export interface Area {
  id: EntityId;
  governorate: string;
  city: string;
  name: string;
  isActive: boolean;
}
export interface Customer {
  id: EntityId;
  name: string;
  phone: string;
  areaId: EntityId;
  status: CustomerAccountStatus;
  phoneVerified: boolean;
  acceptedTermsAt: IsoDateTime;
  acceptedPrivacyAt: IsoDateTime;
  createdAt: IsoDateTime;
}
export interface ProviderActivity {
  id: EntityId;
  serviceCode: ServiceCode;
  nameAr: string;
  isActive: boolean;
}
export interface WorkingHours {
  day: number;
  opensAt: string;
  closesAt: string;
  isClosed: boolean;
}
export interface ProviderDocument {
  id: EntityId;
  providerId: EntityId;
  type: ProviderDocumentType;
  mockFileUrl: string;
  status: ProviderDocumentStatus;
  rejectionReason?: string;
  reviewedAt?: IsoDateTime;
}
export interface Provider {
  id: EntityId;
  responsiblePersonName: string;
  businessName: string;
  phone: string;
  phoneVerified: boolean;
  status: ProviderStatus;
  activityIds: EntityId[];
  supportedVehicleBrands: string[];
  areaId: EntityId;
  fullAddress: string;
  location?: Coordinates;
  workingHours: WorkingHours[];
  businessImageUrls: string[];
  logoUrl?: string;
  acceptedTermsAt: IsoDateTime;
  acceptedPrivacyAt: IsoDateTime;
  acceptedUsageInstructionsAt: IsoDateTime;
  rating: number;
  ratingCount: number;
  createdAt: IsoDateTime;
}
export interface Vehicle {
  id: EntityId;
  customerId: EntityId;
  manufacturer: string;
  model: string;
  manufacturingYear: number;
  engineSize: string;
  fuelType: FuelType;
  vin?: string;
  additionalDetails?: string;
  createdAt: IsoDateTime;
}
export interface ServiceCategory {
  id: EntityId;
  code: ServiceCode;
  nameAr: string;
  displayOrder: number;
  isActive: boolean;
  requiresDetailedAddress: boolean;
  expiryHours: number;
}
export interface FaultCategory {
  id: EntityId;
  code: FaultCode;
  nameAr: string;
  displayOrder: number;
  isActive: boolean;
}
export interface RequestLocation {
  areaId: EntityId;
  fullAddress?: string;
  coordinates?: Coordinates;
}
export interface RequestAttachment {
  id: EntityId;
  type: 'image';
  mockUrl: string;
  thumbnailMockUrl?: string;
}
export interface RequestCancellation {
  reason: string;
  cancelledBy: 'customer' | 'provider' | 'admin';
  cancelledAt: IsoDateTime;
}
export interface ServiceRequest {
  id: EntityId;
  customerId: EntityId;
  vehicleId: EntityId;
  serviceCategoryId: EntityId;
  faultCategoryIds: EntityId[];
  description: string;
  location: RequestLocation;
  preferredAppointment?: IsoDateTime;
  sparePartOption?: SparePartOption;
  attachments: RequestAttachment[];
  status: RequestStatus;
  acceptedOfferId?: EntityId;
  cancellation?: RequestCancellation;
  submittedAt: IsoDateTime;
  expiresAt: IsoDateTime;
  completedAt?: IsoDateTime;
}
export type OfferPrice =
  | { kind: 'fixed'; amountIqd: number }
  | { kind: 'estimated'; minimumIqd: number; maximumIqd: number };
export interface Offer {
  id: EntityId;
  requestId: EntityId;
  providerId: EntityId;
  status: OfferStatus;
  price: OfferPrice;
  availableAppointment?: IsoDateTime;
  estimatedWorkDuration?: string;
  partsIncluded?: boolean;
  warrantyInformation?: string;
  providerMessage?: string;
  imageUrls: string[];
  additionalConditions?: string;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}
export interface Conversation {
  id: EntityId;
  requestId: EntityId;
  customerId: EntityId;
  providerId: EntityId;
  administrationVisible: boolean;
  createdAt: IsoDateTime;
}
export interface Message {
  id: EntityId;
  conversationId: EntityId;
  senderId: EntityId;
  senderType: 'customer' | 'provider' | 'admin';
  recipientId: EntityId;
  text: string;
  sentAt: IsoDateTime;
  deliveryStatus: MessageDeliveryStatus;
  readAt?: IsoDateTime;
}
export interface ReviewReply {
  id: EntityId;
  reviewId: EntityId;
  providerId: EntityId;
  text: string;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}
export interface Review {
  id: EntityId;
  requestId: EntityId;
  customerId: EntityId;
  providerId: EntityId;
  rating: number;
  comment?: string;
  reply?: ReviewReply;
  isHidden: boolean;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}
export interface Complaint {
  id: EntityId;
  reason: ComplaintReason;
  status: ComplaintStatus;
  description: string;
  customerId?: EntityId;
  providerId?: EntityId;
  requestId?: EntityId;
  reportedUserId?: EntityId;
  administrationResponse?: string;
  createdAt: IsoDateTime;
  resolvedAt?: IsoDateTime;
}
export interface Report {
  id: EntityId;
  reporterId: EntityId;
  reporterType: 'customer' | 'provider';
  reportedUserId: EntityId;
  reason: ComplaintReason;
  description: string;
  requestId?: EntityId;
  status: ComplaintStatus;
  administrationResponse?: string;
  createdAt: IsoDateTime;
}
export interface SupportConversation {
  id: EntityId;
  userId: EntityId;
  userType: Exclude<UserType, 'admin'>;
  subject: string;
  messageIds: EntityId[];
  status: 'open' | 'closed';
  createdAt: IsoDateTime;
}

export type NotificationTarget =
  | { kind: 'all_users' | 'all_customers' | 'all_providers' }
  | { kind: 'customer'; customerId: EntityId }
  | { kind: 'provider'; providerId: EntityId }
  | { kind: 'provider_activity'; activityId: EntityId }
  | { kind: 'area'; areaId: EntityId }
  | { kind: 'selected_users'; recipients: { id: EntityId; type: 'customer' | 'provider' }[] };
export interface Notification {
  id: EntityId;
  title: string;
  message: string;
  type: NotificationType;
  channels: ('in_app' | 'simulated_push')[];
  target: NotificationTarget;
  status: NotificationStatus;
  scheduledAt?: IsoDateTime;
  sentAt?: IsoDateTime;
  internalDestination?: string;
  createdAt: IsoDateTime;
}
export interface NotificationPreference {
  userId: EntityId;
  userType: Exclude<UserType, 'admin'>;
  disabledTypes: NotificationType[];
  simulatedPushEnabled: boolean;
}
export interface NotificationDelivery {
  id: EntityId;
  notificationId: EntityId;
  recipientId: EntityId;
  recipientType: 'customer' | 'provider';
  status: NotificationDeliveryStatus;
  deliveredAt?: IsoDateTime;
  openedAt?: IsoDateTime;
}

export type BannerTargetApplication = 'customer' | 'provider' | 'both';
export type BannerTarget = {
  application: BannerTargetApplication;
  userType?: 'customer' | 'provider';
};
export type BannerDestination =
  | { type: 'none' }
  | { type: 'internal'; path: string }
  | { type: 'external'; url: string };
export interface BannerStatistic {
  bannerId: EntityId;
  impressionCount: number;
  clickCount: number;
}
export interface AdvertisingBanner {
  id: EntityId;
  title: string;
  description: string;
  imageUrl?: string;
  buttonLabel?: string;
  destination: BannerDestination;
  startsAt: IsoDateTime;
  endsAt: IsoDateTime;
  displayOrder: number;
  isActive: boolean;
  target: BannerTarget;
  statistic: BannerStatistic;
}
export interface AppSettings {
  id: 'app_settings';
  maximumValidOffers: number;
  towingExpiryHours: number;
  mobileServiceExpiryHours: number;
  defaultRequestExpiryHours: number;
  completionReminderDays: number;
  accountDeletionWaitingHours: number;
  deletedDataRetentionMonths: number;
  bannerRotationSeconds: number;
}
export interface LegalDocument {
  id: EntityId;
  type: 'terms' | 'privacy' | 'usage_instructions';
  titleAr: string;
  contentAr: string;
  version: string;
  isActive: boolean;
  publishedAt: IsoDateTime;
}
export interface FAQItem {
  id: EntityId;
  questionAr: string;
  answerAr: string;
  displayOrder: number;
  isActive: boolean;
}
export interface AccountDeletionRequest {
  id: EntityId;
  customerId: EntityId;
  reason: string;
  requestedAt: IsoDateTime;
  scheduledDeletionAt: IsoDateTime;
  cancelledAt?: IsoDateTime;
  status: 'waiting' | 'cancelled' | 'completed';
}
export interface MetricBreakdown {
  key: string;
  labelAr: string;
  value: number;
}
export interface GrowthPoint {
  period: string;
  customers: number;
  providers: number;
  requests: number;
}
export interface AdminReportSummary {
  totalCustomers: number;
  activeCustomers: number;
  totalProviders: number;
  approvedProviders: number;
  pendingProviders: number;
  requestsByStatus: MetricBreakdown[];
  requestsByArea: MetricBreakdown[];
  requestsByService: MetricBreakdown[];
  offersSubmitted: number;
  averageOffersPerRequest: number;
  acceptedOffers: number;
  completedRequests: number;
  cancelledRequests: number;
  averageProviderRating: number;
  bannerImpressions: number;
  bannerClicks: number;
  notificationDeliveries: number;
  notificationOpens: number;
  growth: GrowthPoint[];
  generatedAt: IsoDateTime;
}
