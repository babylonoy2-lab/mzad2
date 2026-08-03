import { colors, spacing } from '@mzad/design-tokens';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProviderFoundationScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>تطبيق مقدمي الخدمة</Text>
        <Text style={styles.title}>مزاد الصيانة</Text>
        <Text style={styles.description}>
          واجهة عربية مستقلة لمقدمي خدمات السيارات، باتجاه كامل من اليمين إلى اليسار.
        </Text>
        <Text style={styles.status}>النسخة التأسيسية جاهزة</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.providerBackground,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: { backgroundColor: colors.providerSurface, borderRadius: 20, padding: spacing.xl },
  eyebrow: { color: colors.accentSoft, fontSize: 16, textAlign: 'right', writingDirection: 'rtl' },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '700',
    marginTop: spacing.sm,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  description: {
    color: colors.providerText,
    fontSize: 18,
    lineHeight: 30,
    marginTop: spacing.md,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  status: {
    color: colors.accentSoft,
    fontSize: 15,
    marginTop: spacing.lg,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
