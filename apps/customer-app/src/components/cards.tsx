import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { requestStateLabels, serviceInfo } from '../constants';
import type { AppNotification, CustomerRequest, Offer, Provider, Vehicle } from '../models';
import { useApp } from '../store/AppContext';
import { ui } from '../theme';
import { Card, Icon, StatusBadge, type IconName } from './ui';
const statusTone = (status: CustomerRequest['status']) =>
  status === 'cancelled' || status === 'expired'
    ? 'error'
    : status === 'completed'
      ? 'success'
      : status === 'ready'
        ? 'warning'
        : 'info';
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
    <Card onPress={selectable ? onSelect : onEdit} selected={selected}>
      <View style={styles.row}>
        <View style={[styles.iconTile, { backgroundColor: theme.primarySoft }]}>
          <Icon name="car-outline" size={27} color={theme.primary} />
        </View>
        <View style={styles.flex}>
          <Text style={[styles.title, { color: theme.text }]}>
            {vehicle.maker} {vehicle.model}
          </Text>
          <Text style={[styles.meta, { color: theme.textSecondary }]}>
            {vehicle.year} · {vehicle.engine} · {vehicle.fuel}
          </Text>
        </View>
        {selectable ? (
          <Icon
            name={selected ? 'check-circle' : 'circle-outline'}
            color={selected ? theme.primary : theme.border}
          />
        ) : null}
      </View>
      {onEdit && !selectable ? (
        <Pressable onPress={onEdit} style={styles.inlineAction}>
          <Icon name="pencil-outline" size={17} color={theme.primary} />
          <Text style={[styles.actionText, { color: theme.primary }]}>تعديل المركبة</Text>
        </Pressable>
      ) : null}
    </Card>
  );
}
export function RequestCard({ request }: { request: CustomerRequest }) {
  const { theme, vehicles, offers } = useApp();
  const vehicle = vehicles.find((v) => v.id === request.vehicleId);
  const requestOffers = offers.filter((o) => o.requestId === request.id);
  const accepted = requestOffers.find((o) => o.id === request.acceptedOfferId);
  return (
    <Card onPress={() => router.push(`/request/${request.id}`)}>
      <View style={styles.between}>
        <View style={styles.rowGrow}>
          <View style={[styles.iconTileSmall, { backgroundColor: theme.primarySoft }]}>
            <Icon
              name={serviceInfo[request.service].icon as IconName}
              size={21}
              color={theme.primary}
            />
          </View>
          <View style={styles.flex}>
            <Text style={[styles.title, { color: theme.text }]}>
              {serviceInfo[request.service].title}
            </Text>
            <Text style={[styles.meta, { color: theme.muted }]}>
              {vehicle?.maker} {vehicle?.model} · {request.createdAt}
            </Text>
          </View>
        </View>
        <StatusBadge text={requestStateLabels[request.status]} tone={statusTone(request.status)} />
      </View>
      <View style={[styles.divider, { backgroundColor: theme.border }]} />
      <Text style={[styles.body, { color: theme.textSecondary }]} numberOfLines={2}>
        {request.description}
      </Text>
      {accepted ? (
        <Text style={[styles.accepted, { color: theme.success }]}>
          تم اختيار مقدم خدمة لهذا الطلب
        </Text>
      ) : null}
      <View style={styles.footer}>
        <View style={styles.inlineMeta}>
          <Icon name="tag-multiple-outline" size={17} color={theme.muted} />
          <Text style={[styles.meta, { color: theme.textSecondary }]}>
            {requestOffers.length ? `${requestOffers.length} عروض` : 'لا توجد عروض بعد'}
          </Text>
        </View>
        <View style={styles.inlineAction}>
          <Text style={[styles.actionText, { color: theme.primary }]}>عرض التفاصيل</Text>
          <Icon name="chevron-left" size={18} color={theme.primary} />
        </View>
      </View>
    </Card>
  );
}
export function OfferCard({ offer, provider }: { offer: Offer; provider: Provider }) {
  const { theme } = useApp();
  const accepted = offer.status === 'accepted';
  return (
    <Card selected={accepted} style={accepted ? { borderWidth: 1.5 } : undefined}>
      <View style={styles.between}>
        <View style={styles.rowGrow}>
          <View
            style={[
              styles.providerMark,
              { backgroundColor: accepted ? theme.primary : theme.primarySoft },
            ]}
          >
            <Icon
              name="storefront-outline"
              size={23}
              color={accepted ? theme.onPrimary : theme.primary}
            />
          </View>
          <View style={styles.flex}>
            <Text style={[styles.title, { color: theme.text }]}>{provider.name}</Text>
            <Text style={[styles.meta, { color: theme.muted }]}>{provider.activity}</Text>
          </View>
        </View>
        <StatusBadge
          text={
            accepted ? 'العرض المختار' : offer.status === 'notAccepted' ? 'غير مقبول' : 'عرض جديد'
          }
          tone={accepted ? 'success' : offer.status === 'notAccepted' ? 'error' : 'info'}
        />
      </View>
      <View style={styles.offerSummary}>
        <View>
          <Text style={[styles.price, { color: theme.text }]}>{offer.price}</Text>
          <Text style={[styles.caption, { color: theme.muted }]}>
            {offer.priceType === 'fixed' ? 'سعر ثابت' : 'سعر تقديري'}
          </Text>
        </View>
        <View style={styles.rating}>
          <Icon name="star" size={17} color={theme.secondary} />
          <Text style={[styles.metaStrong, { color: theme.text }]}>{provider.rating}</Text>
          <Text style={[styles.caption, { color: theme.muted }]}>({provider.reviews})</Text>
        </View>
      </View>
      <View style={[styles.facts, { backgroundColor: theme.surfaceAlt }]}>
        <View style={styles.fact}>
          <Icon name="map-marker-distance" size={17} color={theme.muted} />
          <Text style={[styles.caption, { color: theme.textSecondary }]}>{provider.distance}</Text>
        </View>
        <View style={styles.fact}>
          <Icon name="calendar-clock" size={17} color={theme.muted} />
          <Text style={[styles.caption, { color: theme.textSecondary }]}>{offer.appointment}</Text>
        </View>
        <View style={styles.fact}>
          <Icon
            name={offer.parts ? 'check-circle-outline' : 'minus-circle-outline'}
            size={17}
            color={offer.parts ? theme.success : theme.muted}
          />
          <Text style={[styles.caption, { color: theme.textSecondary }]}>
            {offer.parts ? 'يشمل القطع' : 'بدون قطع'}
          </Text>
        </View>
      </View>
      <Text style={[styles.body, { color: theme.textSecondary }]} numberOfLines={2}>
        {offer.message}
      </Text>
      <Pressable onPress={() => router.push(`/offer/${offer.id}`)} style={styles.detailsButton}>
        <Text style={[styles.actionText, { color: theme.primary }]}>عرض التفاصيل والإجراءات</Text>
        <Icon name="chevron-left" size={19} color={theme.primary} />
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
      style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1 })}
    >
      <View
        style={[
          styles.notification,
          {
            backgroundColor: item.read ? theme.surface : theme.primarySoft,
            borderColor: item.read ? theme.border : theme.primary,
          },
        ]}
      >
        <View
          style={[
            styles.notificationIcon,
            { backgroundColor: item.read ? theme.surfaceAlt : theme.surface },
          ]}
        >
          <Icon name="bell-outline" size={21} color={item.read ? theme.muted : theme.primary} />
        </View>
        <View style={styles.flex}>
          <View style={styles.between}>
            <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
            {!item.read ? (
              <View style={[styles.unreadDot, { backgroundColor: theme.primary }]} />
            ) : null}
          </View>
          <Text style={[styles.body, { color: theme.textSecondary }]}>{item.body}</Text>
          <Text style={[styles.caption, { color: theme.muted }]}>{item.time}</Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row-reverse', alignItems: 'center', gap: ui.spacing.sm },
  rowGrow: { flex: 1, flexDirection: 'row-reverse', alignItems: 'center', gap: ui.spacing.sm },
  between: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: ui.spacing.xs,
  },
  iconTile: {
    width: 52,
    height: 52,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTileSmall: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerMark: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: ui.font.body, lineHeight: 23, fontWeight: '700', textAlign: 'right' },
  body: { fontSize: ui.font.small, lineHeight: ui.lineHeight.small, textAlign: 'right' },
  meta: { fontSize: ui.font.small, lineHeight: 20, textAlign: 'right' },
  metaStrong: { fontSize: ui.font.small, fontWeight: '700' },
  caption: { fontSize: ui.font.caption, lineHeight: 18, textAlign: 'right' },
  divider: { height: StyleSheet.hairlineWidth },
  inlineAction: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4 },
  actionText: { fontSize: ui.font.small, fontWeight: '700' },
  footer: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  inlineMeta: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6 },
  accepted: { fontSize: ui.font.small, fontWeight: '700', textAlign: 'right' },
  offerSummary: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: { fontSize: ui.font.subtitle, fontWeight: '700', textAlign: 'right' },
  rating: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4 },
  facts: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: ui.spacing.sm,
    borderRadius: ui.radius.input,
    padding: ui.spacing.sm,
  },
  fact: { flexDirection: 'row-reverse', alignItems: 'center', gap: 5 },
  detailsButton: {
    minHeight: 42,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  notification: {
    minHeight: 96,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: ui.radius.card,
    padding: ui.spacing.sm,
    flexDirection: 'row-reverse',
    gap: ui.spacing.sm,
  },
  notificationIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDot: { width: 7, height: 7, borderRadius: 4, marginTop: 7 },
});
