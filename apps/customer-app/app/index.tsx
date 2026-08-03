import { colors, spacing } from '@mzad/design-tokens';
import { StatusBar } from 'expo-status-bar';
import { I18nManager, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomerFoundationScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>تطبيق الزبائن</Text>
        <Text style={styles.title}>مزاد الصيانة</Text>
        <Text style={styles.description}>
          الواجهة العربية واتجاه الكتابة من اليمين إلى اليسار يعملان بنجاح.
        </Text>
        <Text style={styles.status}>النسخة التأسيسية جاهزة</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eyebrow: { color: colors.accent, fontSize: 16, textAlign: 'right', writingDirection: 'rtl' },
  title: {
    color: colors.ink,
    fontSize: 32,
    fontWeight: '700',
    marginTop: spacing.sm,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  description: {
    color: colors.muted,
    fontSize: 18,
    lineHeight: 30,
    marginTop: spacing.md,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  status: {
    color: colors.success,
    fontSize: 15,
    marginTop: spacing.lg,
    textAlign: I18nManager.isRTL ? 'right' : 'right',
    writingDirection: 'rtl',
  },
});
