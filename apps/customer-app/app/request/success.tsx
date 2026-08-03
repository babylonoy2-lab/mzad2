import { router, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { Button, Card, Icon, Screen, Title } from '../../src/components/ui';
import { useApp } from '../../src/store/AppContext';
export default function RequestSuccess() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useApp();
  return (
    <Screen>
      <Icon name="check-decagram-outline" size={68} color={theme.success} />
      <Title sub="تم توزيعه فوراً بشكل محاكى على مقدمي الخدمة المطابقين للمنطقة والنشاط">
        تم إرسال طلبك بنجاح
      </Title>
      <Card>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>رقم الطلب</Text>
        <Text style={{ color: theme.primary, fontSize: 25, fontWeight: '700', textAlign: 'right' }}>
          {id}
        </Text>
        <Text style={{ color: theme.text, textAlign: 'right', lineHeight: 24 }}>
          الخطوة التالية: انتظر وصول العروض وقارن أول سبعة عروض صالحة.
        </Text>
      </Card>
      <Button title="فتح تفاصيل الطلب" onPress={() => router.replace(`/request/${id}`)} />
      <Button title="العودة للرئيسية" kind="secondary" onPress={() => router.replace('/(tabs)')} />
    </Screen>
  );
}
