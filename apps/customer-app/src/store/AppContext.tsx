import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  defaultPrototypeState as defaults,
  localCustomerRepository,
  type CustomerPrototypeState as Persisted,
} from '../data/localRepository';
import { providers } from '../mock';
import type {
  AppNotification,
  Complaint,
  CustomerRequest,
  Message,
  Offer,
  Profile,
  RequestDraft,
  ThemeMode,
  Vehicle,
} from '../models';
import { palettes } from '../theme';
interface AppValue extends Persisted {
  hydrated: boolean;
  theme: (typeof palettes)[ThemeMode];
  draft?: RequestDraft;
  setDraft: (draft?: RequestDraft) => void;
  finishOnboarding: (profile: Profile) => void;
  logout: () => void;
  setMode: (mode: ThemeMode) => void;
  saveVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  submitRequest: (draft: RequestDraft) => string;
  cancelRequest: (id: string, reason: string) => void;
  acceptOffer: (requestId: string, offerId: string) => void;
  sendMessage: (requestId: string, providerId: string, text: string) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  rateRequest: (id: string) => void;
  addComplaint: (complaint: Complaint) => void;
  updatePhone: (phone: string) => void;
  requestDeletion: () => void;
  cancelDeletion: () => void;
  resetPrototype: () => void;
}
const AppContext = createContext<AppValue | null>(null);
export function AppProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<Persisted>(defaults);
  const [hydrated, setHydrated] = useState(false);
  const [draft, setDraft] = useState<RequestDraft>();
  useEffect(() => {
    localCustomerRepository
      .load()
      .then(setState)
      .finally(() => setHydrated(true));
  }, []);
  useEffect(() => {
    if (hydrated) void localCustomerRepository.save(state);
  }, [state, hydrated]);
  const patch = useCallback(
    (next: Partial<Persisted> | ((current: Persisted) => Partial<Persisted>)) =>
      setState((current) => ({
        ...current,
        ...(typeof next === 'function' ? next(current) : next),
      })),
    [],
  );
  const value = useMemo<AppValue>(
    () => ({
      ...state,
      hydrated,
      theme: palettes[state.mode],
      draft,
      setDraft,
      finishOnboarding: (profile) => patch({ profile, onboarded: true }),
      logout: () => patch({ onboarded: false }),
      setMode: (mode) => patch({ mode }),
      saveVehicle: (vehicle) =>
        patch((s) => ({
          vehicles: s.vehicles.some((v) => v.id === vehicle.id)
            ? s.vehicles.map((v) => (v.id === vehicle.id ? vehicle : v))
            : [vehicle, ...s.vehicles],
        })),
      deleteVehicle: (id) => patch((s) => ({ vehicles: s.vehicles.filter((v) => v.id !== id) })),
      submitRequest: (data) => {
        if (data.editingRequestId) {
          patch((s) => ({
            requests: s.requests.map((request) =>
              request.id === data.editingRequestId
                ? {
                    ...request,
                    service: data.service,
                    vehicleId: data.vehicleId,
                    description: data.description,
                    area: data.area,
                    address: data.address || undefined,
                    details: data.details,
                    images: data.images,
                  }
                : request,
            ),
          }));
          setDraft(undefined);
          return data.editingRequestId;
        }
        const id = `REQ-${Math.floor(2000 + Math.random() * 7000)}`;
        const request: CustomerRequest = {
          id,
          service: data.service,
          vehicleId: data.vehicleId,
          description: data.description,
          area: data.area,
          address: data.address || undefined,
          details: data.details,
          images: data.images,
          status: 'receiving',
          createdAt: new Date().toLocaleDateString('ar-IQ'),
        };
        patch((s) => ({ requests: [request, ...s.requests] }));
        setDraft(undefined);
        return id;
      },
      cancelRequest: (id, reason) =>
        patch((s) => ({
          requests: s.requests.map((r) =>
            r.id === id ? { ...r, status: 'cancelled', cancellationReason: reason } : r,
          ),
        })),
      acceptOffer: (requestId, offerId) =>
        patch((s) => ({
          requests: s.requests.map((r) =>
            r.id === requestId ? { ...r, status: 'accepted', acceptedOfferId: offerId } : r,
          ),
          offers: s.offers.map((o) =>
            o.requestId === requestId
              ? { ...o, status: o.id === offerId ? 'accepted' : 'notAccepted' }
              : o,
          ),
          notifications: [
            {
              id: `n-${Date.now()}`,
              title: 'تم قبول العرض',
              body: 'يمكنك الآن متابعة الطلب والتواصل مع مقدم الخدمة.',
              time: 'الآن',
              read: false,
              target: `/request/${requestId}`,
            },
            ...s.notifications,
          ],
        })),
      sendMessage: (requestId, providerId, text) =>
        patch((s) => ({
          messages: [
            ...s.messages,
            {
              id: `m-${Date.now()}`,
              requestId,
              providerId,
              mine: true,
              text,
              time: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        })),
      markRead: (id) =>
        patch((s) => ({
          notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
      markAllRead: () =>
        patch((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
      rateRequest: (id) =>
        patch((s) => ({
          requests: s.requests.map((r) => (r.id === id ? { ...r, rated: true } : r)),
        })),
      addComplaint: (complaint) => patch((s) => ({ complaints: [complaint, ...s.complaints] })),
      updatePhone: (phone) => patch((s) => ({ profile: { ...s.profile, phone } })),
      requestDeletion: () => patch({ deletionRequestedAt: new Date().toISOString() }),
      cancelDeletion: () => patch({ deletionRequestedAt: undefined }),
      resetPrototype: () => {
        setState({ ...defaults, onboarded: false });
        void localCustomerRepository.reset();
      },
    }),
    [state, hydrated, draft, patch],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('AppProvider is missing');
  return value;
}
export { providers };
