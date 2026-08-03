import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Card, Icon, SectionTitle, type IconName } from '../../src/components/ui';
import { serviceInfo } from '../../src/constants';
import { banners } from '../../src/mock';
import { useApp } from '../../src/store/AppContext';
import { ui } from '../../src/theme';
export default function Home() {
  const { width: screenWidth } = useWindowDimensions();
  const bannerWidth = screenWidth - ui.spacing.md * 2;
  const { theme, profile, notifications, requests } = useApp();
  const ref = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () =>
        setPage((current) => {
          const next = (current + 1) % banners.length;
          ref.current?.scrollTo({ x: next * bannerWidth, animated: true });
          return next;
        }),
      5000,
    );
    return () => clearInterval(timer);
  }, [bannerWidth]);
  const openService = (key: string) => router.push(`/request/new?service=${key}` as never);
  const latest = requests[0];
  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.brandRow}>
          <View style={styles.greeting}>
            <View style={[styles.brandMark, { backgroundColor: theme.primary }]}>
              <Icon name="car-wrench" size={22} color={theme.onPrimary} />
            </View>
            <View>
              <Text style={[styles.brandName, { color: theme.text }]}>مزاد الصيانة</Text>
              <Text style={[styles.welcome, { color: theme.textSecondary }]}>
                أهلاً، {profile.name}
              </Text>
            </View>
          </View>
          <Pressable
            accessibilityLabel="الإشعارات"
            onPress={() => router.push('/notifications')}
            style={({ pressed }) => [
              styles.bell,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <Icon name="bell-outline" size={23} color={theme.text} />
            {notifications.some((item) => !item.read) ? (
              <View
                style={[
                  styles.unread,
                  { backgroundColor: theme.secondary, borderColor: theme.surface },
                ]}
              />
            ) : null}
          </Pressable>
        </View>
        <ScrollView
          ref={ref}
          horizontal
          pagingEnabled
          decelerationRate="fast"
          snapToInterval={bannerWidth}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) =>
            setPage(Math.round(event.nativeEvent.contentOffset.x / bannerWidth))
          }
        >
          {banners.map((banner, index) => (
            <Pressable
              key={banner.id}
              onPress={() => router.push(banner.action as never)}
              style={({ pressed }) => [{ width: bannerWidth }, pressed && { opacity: 0.93 }]}
            >
              <View
                style={[
                  styles.banner,
                  {
                    backgroundColor: index === 1 ? theme.surfaceAlt : theme.primary,
                    borderColor: index === 1 ? theme.border : theme.primary,
                  },
                ]}
              >
                <View style={styles.bannerCopy}>
                  <Text
                    style={[
                      styles.bannerEyebrow,
                      { color: index === 1 ? theme.secondary : theme.onPrimary },
                    ]}
                  >
                    خدمة موثوقة، بخطوات أبسط
                  </Text>
                  <Text
                    style={[
                      styles.bannerTitle,
                      { color: index === 1 ? theme.text : theme.onPrimary },
                    ]}
                  >
                    {banner.title}
                  </Text>
                  <Text
                    style={[
                      styles.bannerBody,
                      { color: index === 1 ? theme.textSecondary : `${theme.onPrimary}CC` },
                    ]}
                  >
                    {banner.description}
                  </Text>
                  <View style={styles.bannerAction}>
                    <Text
                      style={[
                        styles.bannerLink,
                        { color: index === 1 ? theme.primary : theme.onPrimary },
                      ]}
                    >
                      اعرف المزيد
                    </Text>
                    <Icon
                      name="arrow-left"
                      size={17}
                      color={index === 1 ? theme.primary : theme.onPrimary}
                    />
                  </View>
                </View>
                <View
                  style={[
                    styles.bannerVisual,
                    { backgroundColor: index === 1 ? theme.primarySoft : `${theme.onPrimary}16` },
                  ]}
                >
                  <Icon
                    name={banner.icon as IconName}
                    size={39}
                    color={index === 1 ? theme.primary : theme.onPrimary}
                  />
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.dots}>
          {banners.map((banner, index) => (
            <View
              key={banner.id}
              style={[
                styles.dot,
                {
                  width: index === page ? 24 : 6,
                  backgroundColor: index === page ? theme.secondary : theme.border,
                },
              ]}
            />
          ))}
        </View>
        <SectionTitle>اطلب عروضاً</SectionTitle>
        <View style={styles.primaryGrid}>
          {(['maintenance', 'parts'] as const).map((key, index) => (
            <Pressable
              key={key}
              onPress={() => openService(key)}
              style={({ pressed }) => [
                styles.primaryPressable,
                pressed && { transform: [{ scale: 0.985 }] },
              ]}
            >
              <View
                style={[
                  styles.primaryCard,
                  ui.shadow.card,
                  {
                    backgroundColor: index === 0 ? theme.primary : theme.elevated,
                    borderColor: index === 0 ? theme.primary : theme.border,
                    shadowColor: theme.shadow,
                  },
                ]}
              >
                <View
                  style={[
                    styles.primaryIcon,
                    { backgroundColor: index === 0 ? `${theme.onPrimary}18` : theme.primarySoft },
                  ]}
                >
                  <Icon
                    name={serviceInfo[key].icon as IconName}
                    size={30}
                    color={index === 0 ? theme.onPrimary : theme.primary}
                  />
                </View>
                <Text
                  style={[
                    styles.primaryTitle,
                    { color: index === 0 ? theme.onPrimary : theme.text },
                  ]}
                >
                  طلب عروض لـ{serviceInfo[key].title}
                </Text>
                <Text
                  style={[
                    styles.primaryBody,
                    { color: index === 0 ? `${theme.onPrimary}C7` : theme.textSecondary },
                  ]}
                >
                  {serviceInfo[key].hint}
                </Text>
                <View
                  style={[
                    styles.primaryArrow,
                    { borderColor: index === 0 ? `${theme.onPrimary}40` : theme.border },
                  ]}
                >
                  <Icon
                    name="arrow-left"
                    size={18}
                    color={index === 0 ? theme.onPrimary : theme.primary}
                  />
                </View>
              </View>
            </Pressable>
          ))}
        </View>
        <SectionTitle>خدمات إضافية</SectionTitle>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.services}
        >
          {(['mobile', 'towing', 'tires', 'battery', 'glass', 'accessories'] as const).map(
            (key) => (
              <Pressable
                key={key}
                onPress={() => openService(key)}
                style={({ pressed }) => [
                  styles.serviceCard,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                  pressed && { backgroundColor: theme.surfaceAlt },
                ]}
              >
                <View style={[styles.serviceIcon, { backgroundColor: theme.primarySoft }]}>
                  <Icon name={serviceInfo[key].icon as IconName} size={24} color={theme.primary} />
                </View>
                <Text numberOfLines={1} style={[styles.serviceTitle, { color: theme.text }]}>
                  {serviceInfo[key].title}
                </Text>
                <Text numberOfLines={2} style={[styles.serviceHint, { color: theme.muted }]}>
                  {serviceInfo[key].hint}
                </Text>
              </Pressable>
            ),
          )}
        </ScrollView>
        {latest ? (
          <>
            <SectionTitle>آخر نشاط</SectionTitle>
            <Card onPress={() => router.push(`/request/${latest.id}`)}>
              <View style={styles.activityRow}>
                <View style={[styles.activityIcon, { backgroundColor: theme.primarySoft }]}>
                  <Icon
                    name={serviceInfo[latest.service].icon as IconName}
                    size={22}
                    color={theme.primary}
                  />
                </View>
                <View style={styles.flex}>
                  <Text style={[styles.activityTitle, { color: theme.text }]}>
                    {serviceInfo[latest.service].title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[styles.activityBody, { color: theme.textSecondary }]}
                  >
                    {latest.description}
                  </Text>
                </View>
                <Icon name="chevron-left" size={22} color={theme.muted} />
              </View>
            </Card>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1 },
  flex: { flex: 1 },
  content: {
    paddingHorizontal: ui.spacing.md,
    paddingTop: ui.spacing.lg,
    paddingBottom: 112,
    gap: ui.spacing.md,
  },
  brandRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  greeting: { flexDirection: 'row-reverse', alignItems: 'center', gap: ui.spacing.sm },
  brandMark: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: { fontSize: ui.font.subtitle, fontWeight: '700', textAlign: 'right' },
  welcome: { fontSize: ui.font.small, marginTop: 2, textAlign: 'right' },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unread: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 2,
  },
  banner: {
    minHeight: 158,
    borderRadius: ui.radius.large,
    borderWidth: StyleSheet.hairlineWidth,
    padding: ui.spacing.lg,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerCopy: { flex: 1, gap: 5 },
  bannerEyebrow: { fontSize: ui.font.caption, fontWeight: '700', textAlign: 'right' },
  bannerTitle: {
    fontSize: ui.font.subtitle,
    lineHeight: 27,
    fontWeight: '700',
    textAlign: 'right',
  },
  bannerBody: { fontSize: ui.font.small, lineHeight: 20, textAlign: 'right' },
  bannerAction: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4, marginTop: 4 },
  bannerLink: { fontSize: ui.font.small, fontWeight: '700' },
  bannerVisual: {
    width: 68,
    height: 68,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ui.spacing.sm,
  },
  dots: { flexDirection: 'row-reverse', justifyContent: 'center', gap: 6 },
  dot: { height: 6, borderRadius: 3 },
  primaryGrid: { flexDirection: 'row-reverse', gap: ui.spacing.sm },
  primaryPressable: { flex: 1 },
  primaryCard: {
    minHeight: 202,
    borderRadius: ui.radius.card,
    borderWidth: StyleSheet.hairlineWidth,
    padding: ui.spacing.md,
  },
  primaryIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryTitle: {
    fontSize: ui.font.body,
    lineHeight: 24,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: ui.spacing.md,
  },
  primaryBody: { fontSize: ui.font.small, lineHeight: 20, textAlign: 'right', marginTop: 5 },
  primaryArrow: {
    width: 34,
    height: 34,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    alignSelf: 'flex-start',
  },
  services: { gap: ui.spacing.xs, paddingLeft: ui.spacing.md },
  serviceCard: {
    width: 118,
    minHeight: 132,
    borderRadius: ui.radius.card,
    borderWidth: StyleSheet.hairlineWidth,
    padding: ui.spacing.sm,
  },
  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTitle: {
    fontSize: ui.font.small,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: ui.spacing.xs,
  },
  serviceHint: { fontSize: ui.font.caption, lineHeight: 17, textAlign: 'right', marginTop: 3 },
  activityRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: ui.spacing.sm },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: { fontSize: ui.font.body, fontWeight: '700', textAlign: 'right' },
  activityBody: { fontSize: ui.font.small, textAlign: 'right', marginTop: 3 },
});
