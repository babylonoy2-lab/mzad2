import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  AppNotification,
  Complaint,
  CustomerRequest,
  Message,
  Offer,
  Profile,
  ThemeMode,
  Vehicle,
} from '../models';
import {
  initialMessages,
  initialNotifications,
  initialOffers,
  initialRequests,
  initialVehicles,
  providers,
  banners,
} from '../mock';
export interface CustomerProfileRepository {
  getProfile(): Profile;
}
export interface VehicleRepository {
  listVehicles(): Vehicle[];
}
export interface RequestRepository {
  listRequests(): CustomerRequest[];
}
export interface OfferRepository {
  listOffers(requestId: string): Offer[];
}
export interface ProviderRepository {
  listProviders(): typeof providers;
}
export interface ConversationRepository {
  listMessages(requestId: string): Message[];
}
export interface NotificationRepository {
  listNotifications(): AppNotification[];
}
export interface AdvertisingRepository {
  listBanners(): typeof banners;
}
export interface RatingRepository {
  hasRating(requestId: string): boolean;
}
export interface ComplaintRepository {
  listComplaints(): Complaint[];
}
export interface SettingsRepository {
  getThemeMode(): ThemeMode;
}
export interface CustomerPrototypeState {
  onboarded: boolean;
  profile: Profile;
  vehicles: Vehicle[];
  requests: CustomerRequest[];
  offers: Offer[];
  messages: Message[];
  notifications: AppNotification[];
  complaints: Complaint[];
  mode: ThemeMode;
  deletionRequestedAt?: string;
}
const KEY = '@mzad/customer-prototype-v1';
export const defaultPrototypeState: CustomerPrototypeState = {
  onboarded: false,
  profile: { name: 'سارة', phone: '+964 790 000 0001', area: 'الكرادة - بغداد' },
  vehicles: initialVehicles,
  requests: initialRequests,
  offers: initialOffers,
  messages: initialMessages,
  notifications: initialNotifications,
  complaints: [],
  mode: 'light',
};
export interface LocalCustomerRepository {
  load(): Promise<CustomerPrototypeState>;
  save(state: CustomerPrototypeState): Promise<void>;
  reset(): Promise<void>;
}
export const localCustomerRepository: LocalCustomerRepository = {
  async load() {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return defaultPrototypeState;
    try {
      return { ...defaultPrototypeState, ...(JSON.parse(raw) as CustomerPrototypeState) };
    } catch {
      return defaultPrototypeState;
    }
  },
  async save(state) {
    await AsyncStorage.setItem(KEY, JSON.stringify(state));
  },
  async reset() {
    await AsyncStorage.removeItem(KEY);
  },
};
