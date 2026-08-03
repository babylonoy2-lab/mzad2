import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { Card, Header, Screen, StatusBadge, Title } from '../../src/components/ui';
import { useApp } from '../../src/store/AppContext';
export default function ComplaintDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme, complaints } = useApp();
  const c = complaints.find((x) => x.id === id);
  return (
    <Screen>
      <Header title="تفاصيل الشكوى" />
      <Title>{c?.id ?? id}</Title>
      <StatusBadge text={c?.status ?? 'تم الإرسال'} tone="warning" />
      <Card>
        <Text style={{ color: theme.text, fontWeight: '700', textAlign: 'right' }}>
          {c?.subject ?? 'شكوى تجريبية'}
        </Text>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>
          {c?.type ?? 'عام'} • {c?.createdAt ?? 'الآن'}
        </Text>
        <Text style={{ color: theme.text, textAlign: 'right', lineHeight: 25 }}>
          {c?.description ?? 'تم استلام الشكوى التجريبية وستظهر هنا استجابة الإدارة المحاكية.'}
        </Text>
        {c?.requestId ? (
          <Text style={{ color: theme.primary, textAlign: 'right' }}>
            الطلب المرتبط: {c.requestId}
          </Text>
        ) : null}
      </Card>
      <Card>
        <Text style={{ color: theme.text, textAlign: 'right' }}>
          حالة المتابعة: قيد المراجعة المحاكية. لا يُرسل هذا المحتوى إلى جهة حقيقية.
        </Text>
      </Card>
    </Screen>
  );
}
