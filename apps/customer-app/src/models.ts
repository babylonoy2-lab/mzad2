export type ThemeMode = 'light' | 'dark';
export type ServiceKey =
  | 'maintenance'
  | 'parts'
  | 'mobile'
  | 'towing'
  | 'tires'
  | 'battery'
  | 'glass'
  | 'accessories';
export type RequestState =
  | 'receiving'
  | 'accepted'
  | 'waiting'
  | 'ready'
  | 'completed'
  | 'cancelled'
  | 'expired';
export interface Profile {
  name: string;
  phone: string;
  area: string;
}
export interface Vehicle {
  id: string;
  maker: string;
  model: string;
  year: string;
  engine: string;
  fuel: string;
  vin?: string;
  notes?: string;
}
export interface Provider {
  id: string;
  name: string;
  activity: string;
  activities: string[];
  area: string;
  rating: number;
  reviews: number;
  distance: string;
  description: string;
  brands: string[];
  hours: string;
}
export interface Offer {
  id: string;
  requestId: string;
  providerId: string;
  status: 'active' | 'accepted' | 'notAccepted';
  priceType: 'fixed' | 'estimated';
  price: string;
  appointment: string;
  parts: boolean;
  message: string;
}
export interface CustomerRequest {
  id: string;
  service: ServiceKey;
  vehicleId: string;
  description: string;
  area: string;
  address?: string;
  details: Record<string, string>;
  images: string[];
  status: RequestState;
  createdAt: string;
  cancellationReason?: string;
  acceptedOfferId?: string;
  rated?: boolean;
}
export interface Message {
  id: string;
  requestId: string;
  providerId: string;
  mine: boolean;
  text: string;
  time: string;
}
export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  target: string;
}
export interface Complaint {
  id: string;
  type: string;
  requestId?: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
}
export interface RequestDraft {
  editingRequestId?: string;
  service: ServiceKey;
  vehicleId: string;
  description: string;
  area: string;
  address: string;
  details: Record<string, string>;
  selected: string[];
  images: string[];
}
