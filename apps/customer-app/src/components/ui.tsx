import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';
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
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { ui } from '../theme';
export type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];
export function Icon({
  name,
  size = ui.icon.medium,
  color,
}: {
  name: IconName;
  size?: number;
  color: string;
}) {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}
export function Screen({ children, scroll = true }: PropsWithChildren<{ scroll?: boolean }>) {
  const { theme } = useApp();
  const body = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, styles.flex]}>{children}</View>
  );
  return (
    <SafeAreaView edges={['top']} style={[styles.screen, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        {body}
      </KeyboardAvoidingView>
    </SafeAreaView>
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
          accessibilityLabel="رجوع"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.iconButton,
            { backgroundColor: pressed ? theme.surfaceAlt : 'transparent' },
          ]}
        >
          <Icon name="chevron-right" size={28} color={theme.text} />
        </Pressable>
      ) : (
        <View style={styles.iconButton} />
      )}
      <Text numberOfLines={1} style={[styles.headerTitle, { color: theme.text }]}>
        {title}
      </Text>
      <View style={styles.iconButton}>{action}</View>
    </View>
  );
}
export function Title({ children, sub }: PropsWithChildren<{ sub?: string }>) {
  const { theme } = useApp();
  return (
    <View style={styles.titleGroup}>
      <Text style={[styles.title, { color: theme.text }]}>{children}</Text>
      {sub ? <Text style={[styles.body, { color: theme.textSecondary }]}>{sub}</Text> : null}
    </View>
  );
}
export function SectionTitle({ children, action }: PropsWithChildren<{ action?: ReactNode }>) {
  const { theme } = useApp();
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{children}</Text>
      {action}
    </View>
  );
}
export function Card({
  children,
  onPress,
  style,
  selected,
}: PropsWithChildren<{ onPress?: () => void; style?: StyleProp<ViewStyle>; selected?: boolean }>) {
  const { theme } = useApp();
  const cardStyle = [
    styles.card,
    ui.shadow.card,
    {
      backgroundColor: selected ? theme.primarySoft : theme.surface,
      borderColor: selected ? theme.primary : theme.border,
      shadowColor: theme.shadow,
    },
    style,
  ];
  return onPress ? (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        cardStyle,
        pressed && { opacity: 0.92, transform: [{ scale: 0.993 }] },
      ]}
    >
      {children}
    </Pressable>
  ) : (
    <View style={cardStyle}>{children}</View>
  );
}
export function Button({
  title,
  onPress,
  disabled,
  loading,
  kind = 'primary',
  icon,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  kind?: 'primary' | 'secondary' | 'danger' | 'text';
  icon?: IconName;
}) {
  const { theme } = useApp();
  const backgroundColor = disabled
    ? theme.disabled
    : kind === 'primary'
      ? theme.primary
      : kind === 'danger'
        ? theme.error
        : kind === 'secondary'
          ? theme.surface
          : 'transparent';
  const color =
    kind === 'primary' || kind === 'danger'
      ? theme.onPrimary
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
          backgroundColor:
            pressed && !disabled
              ? kind === 'primary'
                ? theme.primaryPressed
                : backgroundColor
              : backgroundColor,
          borderColor: kind === 'secondary' ? theme.border : backgroundColor,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <View style={styles.buttonContent}>
          {icon ? <Icon name={icon} size={19} color={color} /> : null}
          <Text numberOfLines={2} style={[styles.buttonText, { color }]}>
            {title}
          </Text>
        </View>
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
      <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      <TextInput
        placeholderTextColor={theme.muted}
        selectionColor={theme.primary}
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
      {error ? (
        <View style={styles.validation}>
          <Icon name="alert-circle-outline" size={15} color={theme.error} />
          <Text style={[styles.error, { color: theme.error }]}>{error}</Text>
        </View>
      ) : null}
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
      accessibilityRole={multiple ? 'checkbox' : 'radio'}
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.choice,
        {
          borderColor: selected ? theme.primary : theme.border,
          backgroundColor: selected ? theme.primarySoft : theme.surface,
          opacity: pressed ? 0.82 : 1,
        },
      ]}
    >
      <Icon
        name={
          multiple
            ? selected
              ? 'checkbox-marked'
              : 'checkbox-blank-outline'
            : selected
              ? 'radiobox-marked'
              : 'radiobox-blank'
        }
        size={21}
        color={selected ? theme.primary : theme.muted}
      />
      <Text style={[styles.choiceText, { color: selected ? theme.text : theme.textSecondary }]}>
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
  const icons = {
    info: 'clock-outline',
    success: 'check-circle-outline',
    warning: 'alert-outline',
    error: 'close-circle-outline',
  } as const;
  return (
    <View style={[styles.badge, { backgroundColor: `${color}18` }]}>
      <Icon name={icons[tone]} size={14} color={color} />
      <Text style={[styles.badgeText, { color }]}>{text}</Text>
    </View>
  );
}
export function EmptyState({
  icon = 'inbox-outline',
  title,
  body,
  action,
}: {
  icon?: IconName;
  title: string;
  body: string;
  action?: { title: string; onPress: () => void };
}) {
  const { theme } = useApp();
  return (
    <View style={styles.empty}>
      <View style={[styles.emptyIcon, { backgroundColor: theme.primarySoft }]}>
        <Icon name={icon} size={32} color={theme.primary} />
      </View>
      <Text style={[styles.subtitle, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.emptyBody, { color: theme.textSecondary }]}>{body}</Text>
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
        <View
          style={[
            styles.modal,
            ui.shadow.modal,
            { backgroundColor: theme.elevated, shadowColor: theme.shadow },
          ]}
        >
          <View
            style={[
              styles.modalIcon,
              { backgroundColor: danger ? `${theme.error}18` : theme.primarySoft },
            ]}
          >
            <Icon
              name={danger ? 'alert-outline' : 'check-circle-outline'}
              size={26}
              color={danger ? theme.error : theme.primary}
            />
          </View>
          <Text style={[styles.modalTitle, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.modalBody, { color: theme.textSecondary }]}>{body}</Text>
          {children}
          <View style={styles.modalActions}>
            <View style={styles.flex}>
              <Button
                title={confirmText}
                onPress={onConfirm}
                kind={danger ? 'danger' : 'primary'}
              />
            </View>
            <View style={styles.flex}>
              <Button title="رجوع" onPress={onClose} kind="secondary" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export function Progress({ step, total = 3 }: { step: number; total?: number }) {
  const { theme } = useApp();
  return (
    <View>
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
      <Text style={[styles.progressLabel, { color: theme.muted }]}>
        الخطوة {step} من {total}
      </Text>
    </View>
  );
}
export function Stars({ value, onChange }: { value: number; onChange?: (value: number) => void }) {
  const { theme } = useApp();
  return (
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable
          key={star}
          accessibilityLabel={`${star} نجوم`}
          disabled={!onChange}
          onPress={() => onChange?.(star)}
          style={styles.starButton}
        >
          <Icon
            name={star <= value ? 'star' : 'star-outline'}
            size={31}
            color={star <= value ? theme.secondary : theme.border}
          />
        </Pressable>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1 },
  content: {
    paddingHorizontal: ui.spacing.md,
    paddingTop: ui.spacing.sm,
    paddingBottom: 104,
    gap: ui.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
    marginBottom: ui.spacing.xs,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { flex: 1, fontSize: ui.font.subtitle, fontWeight: '700', textAlign: 'center' },
  titleGroup: { gap: ui.spacing.xxs },
  title: {
    fontSize: ui.font.title,
    lineHeight: ui.lineHeight.title,
    fontWeight: '700',
    textAlign: 'right',
  },
  subtitle: { fontSize: ui.font.subtitle, fontWeight: '700', textAlign: 'center' },
  sectionHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: ui.spacing.xs,
  },
  sectionTitle: { fontSize: ui.font.subtitle, fontWeight: '700', textAlign: 'right' },
  body: {
    fontSize: ui.font.small,
    lineHeight: ui.lineHeight.small,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: ui.radius.card,
    padding: ui.spacing.md,
    gap: ui.spacing.sm,
  },
  button: {
    minHeight: ui.buttonHeight,
    borderRadius: ui.radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ui.spacing.md,
    borderWidth: 1,
  },
  buttonContent: {
    flexDirection: 'row-reverse',
    gap: ui.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontSize: ui.font.body, fontWeight: '700', textAlign: 'center' },
  fieldWrap: { gap: 7 },
  label: { fontSize: ui.font.small, fontWeight: '600', textAlign: 'right' },
  input: {
    borderWidth: 1,
    minHeight: ui.inputHeight,
    borderRadius: ui.radius.input,
    paddingHorizontal: ui.spacing.sm,
    fontSize: ui.font.body,
    writingDirection: 'rtl',
  },
  textarea: { minHeight: 104, paddingTop: ui.spacing.sm, textAlignVertical: 'top' },
  validation: { flexDirection: 'row-reverse', alignItems: 'center', gap: 5 },
  error: { flex: 1, fontSize: ui.font.caption, lineHeight: 18, textAlign: 'right' },
  choice: {
    minHeight: 48,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: ui.spacing.xs,
    borderWidth: 1,
    borderRadius: ui.radius.input,
    paddingHorizontal: ui.spacing.sm,
  },
  choiceText: { flex: 1, fontSize: ui.font.body, lineHeight: 22, textAlign: 'right' },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: ui.radius.pill,
  },
  badgeText: { fontSize: ui.font.caption, fontWeight: '700' },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: ui.spacing.xs,
    paddingVertical: ui.spacing.xxl,
    paddingHorizontal: ui.spacing.lg,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ui.spacing.xs,
  },
  emptyBody: { fontSize: ui.font.small, lineHeight: ui.lineHeight.small, textAlign: 'center' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', padding: ui.spacing.sm },
  modal: {
    borderRadius: ui.radius.large,
    padding: ui.spacing.lg,
    gap: ui.spacing.sm,
    marginBottom: ui.spacing.xs,
  },
  modalIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  modalTitle: { fontSize: ui.font.subtitle, fontWeight: '700', textAlign: 'right' },
  modalBody: { fontSize: ui.font.small, lineHeight: ui.lineHeight.small, textAlign: 'right' },
  modalActions: { flexDirection: 'row-reverse', gap: ui.spacing.xs, marginTop: ui.spacing.xs },
  progress: { flexDirection: 'row-reverse', gap: 6 },
  progressItem: { height: 4, flex: 1, borderRadius: 4 },
  progressLabel: { marginTop: 6, fontSize: ui.font.caption, textAlign: 'right' },
  stars: { flexDirection: 'row-reverse', justifyContent: 'center', gap: ui.spacing.xs },
  starButton: { width: 40, height: 44, alignItems: 'center', justifyContent: 'center' },
});
