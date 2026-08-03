import { router } from 'expo-router';
import { Text } from 'react-native';
import { Button, Card, Header, Screen, Title } from '../src/components/ui';
import { useApp } from '../src/store/AppContext';
export default function Support() {
  const { theme, complaints } = useApp();
  return (
    <Screen>
      <Header title="الدعم والشكاوى" />
      <Title sub="قنوات محاكية لا تتصل بفريق حقيقي">كيف نساعدك؟</Title>
      <Button title="إنشاء شكوى" onPress={() => router.push('/complaints/new')} />
      <Button
        title="فتح محادثة دعم تجريبية"
        kind="secondary"
        onPress={() => router.push('/conversation/support')}
      />
      <Button title="الأسئلة الشائعة" kind="secondary" onPress={() => router.push('/legal/faq')} />
      <Title>شكاواي</Title>
      {complaints.length ? (
        complaints.map((c) => (
          <Card key={c.id} onPress={() => router.push(`/complaints/${c.id}`)}>
            <Text style={{ color: theme.text, fontWeight: '700', textAlign: 'right' }}>
              {c.subject}
            </Text>
            <Text style={{ color: theme.muted, textAlign: 'right' }}>
              {c.status} • {c.createdAt}
            </Text>
          </Card>
        ))
      ) : (
        <Card>
          <Text style={{ color: theme.muted, textAlign: 'center' }}>لا توجد شكاوى مسجلة.</Text>
        </Card>
      )}
    </Screen>
  );
}
