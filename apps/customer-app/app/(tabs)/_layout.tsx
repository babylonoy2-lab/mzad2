import { Redirect, Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { Icon, type IconName } from '../../src/components/ui';
import { useApp } from '../../src/store/AppContext';
const icons: Record<string, { active: IconName; idle: IconName }> = {
  index: { active: 'home-variant', idle: 'home-variant-outline' },
  offers: { active: 'tag-multiple', idle: 'tag-multiple-outline' },
  history: { active: 'clipboard-text-clock', idle: 'clipboard-text-clock-outline' },
  settings: { active: 'cog', idle: 'cog-outline' },
};
export default function TabsLayout() {
  const { theme, hydrated, onboarded } = useApp();
  if (hydrated && !onboarded) return <Redirect href="/welcome" />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: '#F4F7FC',
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          styles.bar,
          {
            backgroundColor: '#05070B',
            borderTopColor: '#111827',
            shadowColor: theme.shadow,
          },
        ],
        tabBarItemStyle: styles.item,
        tabBarLabelStyle: styles.label,
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
            tabBarIcon: ({ color, focused }) => (
              <View
                style={[
                  styles.iconWrap,
                  focused && {
                    backgroundColor: `${theme.primary}22`,
                    borderColor: theme.primary,
                    shadowColor: theme.glow,
                    shadowOpacity: 0.3,
                  },
                ]}
              >
                <Icon
                  name={icons[name]![focused ? 'active' : 'idle']}
                  size={22}
                  color={focused ? theme.primary : color}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
const styles = StyleSheet.create({
  bar: {
    height: Platform.OS === 'ios' ? 84 : 72,
    paddingTop: 7,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  item: { paddingVertical: 1 },
  label: { fontSize: 11, fontWeight: '600', marginTop: 1 },
  iconWrap: {
    width: 44,
    height: 30,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
});
