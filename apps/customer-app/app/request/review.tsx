import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Header, Progress, Screen, Title } from '../../src/components/ui';
import { serviceInfo } from '../../src/constants';
import { useApp } from '../../src/store/AppContext';
export default function Review() {
  const { theme, draft, vehicles, submitRequest } = useApp();
  const [loading, setLoading] = useState(false);
  if (!draft)
    return (
      <Screen>
        <Header title="مراجعة الطلب" />
        <Title>لا توجد بيانات طلب</Title>
        <Button title="العودة للرئيسية" onPress={() => router.replace('/(tabs)')} />
      </Screen>
    );
  const vehicle = vehicles.find((v) => v.id === draft.vehicleId);
  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      const id = submitRequest(draft);
      router.replace(`/request/success?id=${id}`);
    }, 700);
  };
  return (
    <Screen>
      <Header title="مراجعة الطلب" />
      <Progress step={3} />
      <Title sub="راجع المعلومات ثم أكد الإرسال التجريبي">تأكيد البيانات</Title>
      <Card>
        <Text style={{ color: theme.text, fontWeight: '900', textAlign: 'right' }}>الخدمة</Text>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>
          {serviceInfo[draft.service].title}
        </Text>
        <Button title="تعديل الخدمة" kind="text" onPress={() => router.back()} />
      </Card>
      <Card>
        <Text style={{ color: theme.text, fontWeight: '900', textAlign: 'right' }}>المركبة</Text>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>
          {vehicle?.maker} {vehicle?.model} - {vehicle?.year}
        </Text>
        <Button title="تعديل المركبة والحقول" kind="text" onPress={() => router.back()} />
      </Card>
      <Card>
        <Text style={{ color: theme.text, fontWeight: '900', textAlign: 'right' }}>التفاصيل</Text>
        {draft.selected.length ? (
          <Text style={{ color: theme.muted, textAlign: 'right' }}>
            {draft.selected.join('، ')}
          </Text>
        ) : null}
        {Object.entries(draft.details).map(([k, v]) => (
          <Text key={k} style={{ color: theme.muted, textAlign: 'right' }}>
            {k}: {v}
          </Text>
        ))}
        <Text style={{ color: theme.text, textAlign: 'right', lineHeight: 24 }}>
          {draft.description}
        </Text>
      </Card>
      <Card>
        <Text style={{ color: theme.text, fontWeight: '900', textAlign: 'right' }}>
          الموقع والصور
        </Text>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>
          {draft.area}
          {draft.address ? ` • ${draft.address}` : ''}
        </Text>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>
          {draft.images.length ? `${draft.images.length} صور مختارة` : 'لا توجد صور'}
        </Text>
      </Card>
      <Button title="إرسال الطلب الآن" loading={loading} onPress={submit} />
      <Button title="رجوع للتعديل" kind="secondary" onPress={() => router.back()} />
    </Screen>
  );
}
