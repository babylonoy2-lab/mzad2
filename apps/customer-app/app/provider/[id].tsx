import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Text } from 'react-native';
import { Button, Card, Header, Screen, Stars, Title } from '../../src/components/ui';
import { providers, useApp } from '../../src/store/AppContext';
export default function ProviderProfile() {
  const { id, offerId } = useLocalSearchParams<{ id: string; offerId?: string }>();
  const { theme, offers } = useApp();
  const p = providers.find((x) => x.id === id);
  if (!p) return null;
  const relatedOffer = offers.find((offer) => offer.id === offerId);
  return (
    <Screen>
      <Header title="ملف مقدم الخدمة" />
      <Text style={{ fontSize: 48, textAlign: 'center' }}>🏢</Text>
      <Title sub={`${p.activity} • ${p.area}`}>{p.name}</Title>
      <Stars value={Math.round(p.rating)} />
      <Text style={{ color: theme.muted, textAlign: 'center' }}>
        ★ {p.rating} من {p.reviews} تقييماً • {p.distance}
      </Text>
      <Card>
        <Text style={{ color: theme.text, textAlign: 'right', lineHeight: 25 }}>
          {p.description}
        </Text>
        <Text style={{ color: theme.text, textAlign: 'right' }}>
          الأنشطة: {p.activities.join('، ')}
        </Text>
        <Text style={{ color: theme.text, textAlign: 'right' }}>
          العلامات المدعومة: {p.brands.join('، ')}
        </Text>
        <Text style={{ color: theme.text, textAlign: 'right' }}>ساعات العمل: {p.hours}</Text>
      </Card>
      <Title>صور النشاط التجريبية</Title>
      <Card>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>▧ ▧ ▧</Text>
        <Text style={{ color: theme.muted, textAlign: 'center' }}>
          لا توجد أصول خارجية؛ هذه معاينات خفيفة.
        </Text>
      </Card>
      <Title>آراء الزبائن</Title>
      <Card>
        <Text style={{ color: theme.text, textAlign: 'right' }}>“تعامل واضح وخدمة جيدة” ★★★★★</Text>
        <Text style={{ color: theme.primary, textAlign: 'right' }}>
          رد مقدم الخدمة: شكراً لاختياركم لنا.
        </Text>
      </Card>
      <Button
        title="اتصال تجريبي"
        onPress={() => Alert.alert('اتصال تجريبي', 'لا يوجد رقم حقيقي في هذا النموذج.')}
      />
      <Button
        title="واتساب تجريبي"
        kind="secondary"
        onPress={() => Alert.alert('واتساب تجريبي', 'لن يُفتح تطبيق خارجي.')}
      />
      {relatedOffer ? (
        <Button
          title="اسأل مقدم الخدمة"
          kind="secondary"
          onPress={() => router.push(`/conversation/${relatedOffer.requestId}?providerId=${p.id}`)}
        />
      ) : null}
      <Button
        title="العودة إلى العرض"
        kind="text"
        onPress={() => (offerId ? router.replace(`/offer/${offerId}`) : router.back())}
      />
    </Screen>
  );
}
