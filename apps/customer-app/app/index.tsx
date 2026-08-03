import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useApp } from '../src/store/AppContext';
export default function Entry() {
  const { hydrated, onboarded, theme } = useApp();
  if (!hydrated)
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  return <Redirect href={onboarded ? '/(tabs)' : '/welcome'} />;
}
