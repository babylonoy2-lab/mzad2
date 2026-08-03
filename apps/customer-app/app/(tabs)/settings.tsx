import { router } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';
import { Button, Card, Header, Icon, Screen, Title, type IconName } from '../../src/components/ui';
import { useApp } from '../../src/store/AppContext';
const links: readonly [IconName, string, string][] = [
  ['car-outline', 'مركباتي', '/vehicle'],
  ['bell-outline', 'الإشعارات', '/notifications'],
  ['phone-outline', 'تغيير رقم الهاتف', '/change-phone'],
  ['message-alert-outline', 'الدعم والشكاوى', '/support'],
  ['file-document-outline', 'الشروط والأحكام', '/legal/terms'],
  ['shield-lock-outline', 'سياسة الخصوصية', '/legal/privacy'],
  ['help-circle-outline', 'تعليمات الاستخدام والأسئلة', '/legal/usage'],
  ['delete-outline', 'طلب حذف الحساب', '/delete-account'],
];
export default function Settings() {
  const { theme, profile, mode, setMode, logout } = useApp();
  return (
    <Screen>
      <Header title="الإعدادات" back={false} />
      <Title>حساب الزبون</Title>
      <Card>
        <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700', textAlign: 'right' }}>
          {profile.name}
        </Text>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>{profile.phone}</Text>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>{profile.area}</Text>
      </Card>
      <Title>المظهر</Title>
      <View style={{ flexDirection: 'row-reverse', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Button
            title="الوضع الفاتح"
            kind={mode === 'light' ? 'primary' : 'secondary'}
            onPress={() => setMode('light')}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="الوضع الداكن"
            kind={mode === 'dark' ? 'primary' : 'secondary'}
            onPress={() => setMode('dark')}
          />
        </View>
      </View>
      <Title>الخدمات والحساب</Title>
      {links.map(([icon, label, path]) => (
        <Pressable key={path} onPress={() => router.push(path)}>
          <View
            style={{
              minHeight: 58,
              flexDirection: 'row-reverse',
              alignItems: 'center',
              gap: 12,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 13,
                backgroundColor: theme.primarySoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name={icon} size={21} color={theme.primary} />
            </View>
            <Text
              style={{
                flex: 1,
                color: theme.text,
                fontSize: 16,
                fontWeight: '700',
                textAlign: 'right',
              }}
            >
              {label}
            </Text>
            <Icon name="chevron-left" size={22} color={theme.muted} />
          </View>
        </Pressable>
      ))}
      <Button
        title="تسجيل الخروج"
        kind="secondary"
        onPress={() =>
          Alert.alert(
            'تسجيل الخروج',
            'ستعود إلى شاشة الترحيب ويمكن تسجيل الدخول تجريبياً مرة أخرى.',
            [
              { text: 'رجوع' },
              {
                text: 'تسجيل الخروج',
                style: 'destructive',
                onPress: () => {
                  logout();
                  router.replace('/welcome');
                },
              },
            ],
          )
        }
      />
    </Screen>
  );
}
