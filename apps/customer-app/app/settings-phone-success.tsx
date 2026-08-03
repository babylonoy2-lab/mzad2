import { router } from 'expo-router';
import { Text } from 'react-native';
import { Button, Card, Screen, Title } from '../src/components/ui';
import { useApp } from '../src/store/AppContext';
export default function Success() {
  const { theme } = useApp();
  return (
    <Screen>
      <Title>تم تحديث رقم الهاتف ✓</Title>
      <Card>
        <Text style={{ color: theme.text, textAlign: 'right', lineHeight: 25 }}>
          تم التحقق من الرقم الجديد باستخدام الرمز التجريبي وحُفظ محلياً.
        </Text>
      </Card>
      <Button title="العودة إلى الإعدادات" onPress={() => router.replace('/(tabs)/settings')} />
    </Screen>
  );
}
