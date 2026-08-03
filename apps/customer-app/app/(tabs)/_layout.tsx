import { Redirect, Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useApp } from '../../src/store/AppContext';
const icons = { index: '⌂', offers: '◉', history: '▤', settings: '⚙' } as const;
export default function TabsLayout() {
  const { theme, hydrated, onboarded } = useApp();
  if (hydrated && !onboarded) return <Redirect href="/welcome" />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.muted,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          height: 68,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
        sceneStyle: { backgroundColor: theme.background },
      }}
    >
      {Object.entries({
        index: 'الرئيسية',
        offers: 'العروض الجديدة',
        history: 'سجل الطلبات',
        settings: 'الإعدادات',
      }).map(([name, title]) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 22 }}>{icons[name as keyof typeof icons]}</Text>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
