import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { requestStateLabels, serviceInfo } from '../constants';
import type { AppNotification, CustomerRequest, Offer, Provider, Vehicle } from '../models';
import { useApp } from '../store/AppContext';
import { Card, StatusBadge } from './ui';
export function VehicleCard({
  vehicle,
  selectable,
  selected,
  onSelect,
  onEdit,
}: {
  vehicle: Vehicle;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
}) {
  const { theme } = useApp();
  return (
    <Card
      onPress={selectable ? onSelect : onEdit}
      style={selected ? { borderColor: theme.primary, borderWidth: 2 } : {}}
    >
      <View style={styles.row}>
        <Text style={styles.icon}>🚙</Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.text }]}>
            {vehicle.maker} {vehicle.model}
          </Text>
          <Text style={[styles.text, { color: theme.muted }]}>
            {vehicle.year} • {vehicle.engine} • {vehicle.fuel}
          </Text>
        </View>
      </View>
      {onEdit && !selectable ? (
        <Pressable onPress={onEdit}>
          <Text style={{ color: theme.primary, fontWeight: '700' }}>تعديل المركبة</Text>
        </Pressable>
      ) : null}
    </Card>
  );
}
export function RequestCard({ request }: { request: CustomerRequest }) {
  const { theme, vehicles, offers } = useApp();
  const vehicle = vehicles.find((v) => v.id === request.vehicleId);
  const count = offers.filter((o) => o.requestId === request.id).length;
  return (
    <Card onPress={() => router.push(`/request/${request.id}`)}>
      <View style={styles.between}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.text }]}>
            {serviceInfo[request.service].icon} {serviceInfo[request.service].title}
          </Text>
          <Text style={[styles.text, { color: theme.muted }]}>
            {vehicle?.maker} {vehicle?.model} • {request.createdAt}
          </Text>
        </View>
        <StatusBadge
          text={requestStateLabels[request.status]}
          tone={
            request.status === 'cancelled'
              ? 'error'
              : request.status === 'completed'
                ? 'success'
                : 'info'
          }
        />
      </View>
      <Text style={[styles.text, { color: theme.text }]} numberOfLines={2}>
        {request.description}
      </Text>
      <Text style={{ color: theme.primary, fontWeight: '700' }}>
        {count ? `${count} عروض` : 'لا توجد عروض بعد'} ← عرض التفاصيل
      </Text>
    </Card>
  );
}
export function OfferCard({ offer, provider }: { offer: Offer; provider: Provider }) {
  const { theme } = useApp();
  return (
    <Card>
      <View style={styles.between}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 20 }}>🔧</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.text }]}>{provider.name}</Text>
          <Text style={[styles.text, { color: theme.muted }]}>
            {provider.activity} • ★ {provider.rating} ({provider.reviews})
          </Text>
        </View>
        <StatusBadge
          text={
            offer.status === 'accepted'
              ? 'مقبول'
              : offer.status === 'notAccepted'
                ? 'غير مقبول'
                : 'جديد'
          }
          tone={
            offer.status === 'accepted'
              ? 'success'
              : offer.status === 'notAccepted'
                ? 'error'
                : 'info'
          }
        />
      </View>
      <Text style={[styles.price, { color: theme.primary }]}>{offer.price}</Text>
      <Text style={[styles.text, { color: theme.muted }]}>
        {offer.priceType === 'fixed' ? 'سعر ثابت' : 'سعر تقديري'} • {offer.appointment} •{' '}
        {offer.parts ? 'يشمل القطع' : 'لا يشمل القطع'}
      </Text>
      <Text style={[styles.text, { color: theme.text }]} numberOfLines={2}>
        {offer.message}
      </Text>
      <Pressable onPress={() => router.push(`/offer/${offer.id}`)}>
        <Text style={{ color: theme.primary, fontWeight: '800' }}>عرض التفاصيل والإجراءات ←</Text>
      </Pressable>
    </Card>
  );
}
export function NotificationCard({ item }: { item: AppNotification }) {
  const { theme, markRead } = useApp();
  return (
    <Pressable
      onPress={() => {
        markRead(item.id);
        router.push(item.target as never);
      }}
    >
      <View
        style={[
          styles.notification,
          {
            backgroundColor: item.read ? theme.surface : theme.primarySoft,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={[styles.dot, { backgroundColor: item.read ? theme.border : theme.primary }]} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.text, { color: theme.muted }]}>{item.body}</Text>
          <Text style={[styles.small, { color: theme.primary }]}>{item.time}</Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12 },
  between: { flexDirection: 'row-reverse', alignItems: 'flex-start', gap: 10 },
  icon: { fontSize: 30 },
  title: { fontSize: 17, fontWeight: '800', textAlign: 'right' },
  text: { fontSize: 14, lineHeight: 22, textAlign: 'right' },
  small: { fontSize: 12, marginTop: 5, textAlign: 'right' },
  price: { fontSize: 21, fontWeight: '900', textAlign: 'right' },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#DDEBE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    minHeight: 92,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row-reverse',
    gap: 10,
  },
  dot: { width: 9, height: 9, borderRadius: 5, marginTop: 7 },
});
