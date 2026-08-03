import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nManager } from 'react-native';
import { AppProvider, useApp } from '../src/store/AppContext';
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
function Navigator() {
  const { theme, mode } = useApp();
  return (
    <>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_left',
          contentStyle: { backgroundColor: theme.background },
        }}
      />
    </>
  );
}
export default function RootLayout() {
  return (
    <AppProvider>
      <Navigator />
    </AppProvider>
  );
}
