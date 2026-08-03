import { router } from 'expo-router';
import type { PropsWithChildren, ReactNode } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { useApp } from '../store/AppContext';
import { ui } from '../theme';
export function Screen({ children, scroll = true }: PropsWithChildren<{ scroll?: boolean }>) {
  const { theme } = useApp();
  const body = scroll ? (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, { flex: 1 }]}>{children}</View>
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.screen, { backgroundColor: theme.background }]}
    >
      {body}
    </KeyboardAvoidingView>
  );
}
export function Header({
  title,
  back = true,
  action,
}: {
  title: string;
  back?: boolean;
  action?: ReactNode;
}) {
  const { theme } = useApp();
  return (
    <View style={styles.header}>
      {back ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <Text style={[styles.back, { color: theme.text }]}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.iconButton} />
      )}
      <Text style={[styles.headerTitle, { color: theme.text }]}>{title}</Text>
      <View style={styles.iconButton}>{action}</View>
    </View>
  );
}
export function Title({ children, sub }: PropsWithChildren<{ sub?: string }>) {
  const { theme } = useApp();
  return (
    <View style={{ gap: 6 }}>
      <Text style={[styles.title, { color: theme.text }]}>{children}</Text>
      {sub ? <Text style={[styles.body, { color: theme.muted }]}>{sub}</Text> : null}
    </View>
  );
}
export function Card({
  children,
  onPress,
  style,
}: PropsWithChildren<{ onPress?: () => void; style?: object }>) {
  const { theme } = useApp();
  const content = (
    <View
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }, style]}
    >
      {children}
    </View>
  );
  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
}
export function Button({
  title,
  onPress,
  disabled,
  loading,
  kind = 'primary',
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  kind?: 'primary' | 'secondary' | 'danger' | 'text';
}) {
  const { theme } = useApp();
  const backgroundColor =
    kind === 'primary'
      ? theme.primary
      : kind === 'danger'
        ? theme.error
        : kind === 'secondary'
          ? theme.surfaceAlt
          : 'transparent';
  const color =
    kind === 'primary' || kind === 'danger'
      ? theme === undefined
        ? '#fff'
        : theme.background
      : kind === 'text'
        ? theme.primary
        : theme.text;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor: kind === 'secondary' ? theme.border : backgroundColor,
          opacity: disabled ? 0.45 : pressed ? 0.8 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <Text style={[styles.buttonText, { color }]}>{title}</Text>
      )}
    </Pressable>
  );
}
export function Field({
  label,
  error,
  multiline,
  ...props
}: TextInputProps & { label: string; error?: string }) {
  const { theme } = useApp();
  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <TextInput
        placeholderTextColor={theme.muted}
        multiline={multiline}
        textAlign="right"
        style={[
          styles.input,
          multiline && styles.textarea,
          {
            color: theme.text,
            backgroundColor: theme.surface,
            borderColor: error ? theme.error : theme.border,
          },
        ]}
        {...props}
      />
      {error ? <Text style={[styles.error, { color: theme.error }]}>{error}</Text> : null}
    </View>
  );
}
export function Choice({
  label,
  selected,
  onPress,
  multiple,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  multiple?: boolean;
}) {
  const { theme } = useApp();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.choice,
        {
          borderColor: selected ? theme.primary : theme.border,
          backgroundColor: selected ? theme.primarySoft : theme.surface,
        },
      ]}
    >
      <Text
        style={{ color: selected ? theme.primary : theme.text, fontSize: 16, textAlign: 'right' }}
      >
        {selected ? (multiple ? '✓ ' : '● ') : multiple ? '□ ' : '○ '}
        {label}
      </Text>
    </Pressable>
  );
}
export function StatusBadge({
  text,
  tone = 'info',
}: {
  text: string;
  tone?: 'info' | 'success' | 'warning' | 'error';
}) {
  const { theme } = useApp();
  const color = theme[tone];
  return (
    <View style={[styles.badge, { backgroundColor: `${color}22` }]}>
      <Text style={{ color, fontWeight: '700' }}>{text}</Text>
    </View>
  );
}
export function EmptyState({
  icon = '○',
  title,
  body,
  action,
}: {
  icon?: string;
  title: string;
  body: string;
  action?: { title: string; onPress: () => void };
}) {
  const { theme } = useApp();
  return (
    <View style={styles.empty}>
      <Text style={{ fontSize: 40 }}>{icon}</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.body, { color: theme.muted, textAlign: 'center' }]}>{body}</Text>
      {action ? <Button title={action.title} onPress={action.onPress} kind="secondary" /> : null}
    </View>
  );
}
export function ConfirmModal({
  visible,
  title,
  body,
  children,
  confirmText = 'تأكيد',
  danger,
  onConfirm,
  onClose,
}: PropsWithChildren<{
  visible: boolean;
  title: string;
  body: string;
  confirmText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}>) {
  const { theme } = useApp();
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={[styles.modalOverlay, { backgroundColor: theme.overlay }]}>
        <View style={[styles.modal, { backgroundColor: theme.surface }]}>
          <Text style={[styles.subtitle, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.body, { color: theme.muted }]}>{body}</Text>
          {children}
          <Button title={confirmText} onPress={onConfirm} kind={danger ? 'danger' : 'primary'} />
          <Button title="رجوع" onPress={onClose} kind="text" />
        </View>
      </View>
    </Modal>
  );
}
export function Progress({ step, total = 3 }: { step: number; total?: number }) {
  const { theme } = useApp();
  return (
    <View style={styles.progress}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={[
            styles.progressItem,
            { backgroundColor: i < step ? theme.primary : theme.border },
          ]}
        />
      ))}
    </View>
  );
}
export function Stars({ value, onChange }: { value: number; onChange?: (value: number) => void }) {
  const { theme } = useApp();
  return (
    <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', gap: 8 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable key={star} disabled={!onChange} onPress={() => onChange?.(star)}>
          <Text style={{ fontSize: 34, color: star <= value ? theme.secondary : theme.border }}>
            ★
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 18, paddingTop: 54, paddingBottom: 40, gap: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
  },
  iconButton: { width: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  back: { fontSize: 38, lineHeight: 38 },
  headerTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'right' },
  subtitle: { fontSize: 20, fontWeight: '700', textAlign: 'right' },
  body: { fontSize: 15, lineHeight: 24, textAlign: 'right', writingDirection: 'rtl' },
  card: { borderWidth: 1, borderRadius: ui.radius.md, padding: 16, gap: 10 },
  button: {
    minHeight: ui.buttonHeight,
    borderRadius: ui.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderWidth: 1,
  },
  buttonText: { fontSize: 16, fontWeight: '800' },
  fieldWrap: { gap: 7 },
  label: { fontSize: 15, fontWeight: '700', textAlign: 'right' },
  input: {
    borderWidth: 1,
    minHeight: 52,
    borderRadius: ui.radius.sm,
    paddingHorizontal: 14,
    fontSize: 16,
    writingDirection: 'rtl',
  },
  textarea: { minHeight: 110, paddingTop: 14, textAlignVertical: 'top' },
  error: { fontSize: 13, textAlign: 'right' },
  choice: {
    minHeight: 48,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 99 },
  empty: { alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 48 },
  modalOverlay: { flex: 1, justifyContent: 'center', padding: 22 },
  modal: { borderRadius: 20, padding: 20, gap: 14 },
  progress: { flexDirection: 'row-reverse', gap: 6 },
  progressItem: { height: 5, flex: 1, borderRadius: 4 },
});
