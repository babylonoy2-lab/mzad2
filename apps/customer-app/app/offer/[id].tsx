import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Text, View } from 'react-native';
import { Button, Card, Header, Icon, Screen, StatusBadge, Title } from '../../src/components/ui';
import { providers, useApp } from '../../src/store/AppContext';
export default function OfferDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme, offers, requests, acceptOffer } = useApp();
  const offer = offers.find((o) => o.id === id);
  if (!offer) return null;
  const provider = providers.find((p) => p.id === offer.providerId)!;
  const request = requests.find((r) => r.id === offer.requestId)!;
  const contact = (type: string) =>
    Alert.alert(type, 'هذا إجراء تجريبي آمن ولن يفتح رقم هاتف حقيقياً.');
  return (
    <Screen>
      <Header title="تفاصيل العرض" />
      <Title>{provider.name}</Title>
      <StatusBadge
        text={
          offer.status === 'accepted'
            ? 'العرض المقبول'
            : offer.status === 'notAccepted'
              ? 'غير مقبول'
              : 'متاح للقبول'
        }
        tone={
          offer.status === 'accepted'
            ? 'success'
            : offer.status === 'notAccepted'
              ? 'error'
              : 'info'
        }
      />
      <Card>
        <Text style={{ color: theme.primary, fontSize: 28, fontWeight: '700', textAlign: 'right' }}>
          {offer.price}
        </Text>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>
          {offer.priceType === 'fixed' ? 'سعر ثابت' : 'سعر تقديري'}
        </Text>
        <Text style={{ color: theme.text, textAlign: 'right' }}>
          الموعد المتاح: {offer.appointment}
        </Text>
        <Text style={{ color: theme.text, textAlign: 'right' }}>
          {offer.parts ? 'يشمل قطع الغيار' : 'لا يشمل قطع الغيار'}
        </Text>
        <Text style={{ color: theme.text, textAlign: 'right', lineHeight: 25 }}>
          {offer.message}
        </Text>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>
          المسافة التقريبية: {provider.distance}
        </Text>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 5 }}>
          <Icon name="star" size={18} color={theme.secondary} />
          <Text style={{ color: theme.muted, textAlign: 'right' }}>
            التقييم: {provider.rating} من {provider.reviews} تقييماً
          </Text>
        </View>
      </Card>
      <Button
        title="ملف مقدم الخدمة"
        kind="secondary"
        onPress={() => router.push(`/provider/${provider.id}?offerId=${offer.id}`)}
      />
      <Button
        title="اسأل مقدم الخدمة"
        kind="secondary"
        onPress={() => router.push(`/conversation/${request.id}?providerId=${provider.id}`)}
      />
      <Button title="اتصال تجريبي" kind="text" onPress={() => contact('اتصال')} />
      <Button title="واتساب تجريبي" kind="text" onPress={() => contact('واتساب')} />
      {offer.status === 'active' && !request.acceptedOfferId ? (
        <Button
          title="قبول هذا العرض"
          onPress={() =>
            Alert.alert('تأكيد قبول العرض', 'لا يمكن التراجع أو قبول عرض آخر بعد التأكيد.', [
              { text: 'رجوع' },
              {
                text: 'قبول العرض',
                onPress: () => {
                  acceptOffer(request.id, offer.id);
                  router.replace(`/request/${request.id}`);
                },
              },
            ])
          }
        />
      ) : null}
    </Screen>
  );
}
