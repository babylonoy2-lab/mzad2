import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Icon, SectionTitle, type IconName } from '../../src/components/ui';
import { serviceInfo } from '../../src/constants';
import { banners } from '../../src/mock';
import { useApp } from '../../src/store/AppContext';
import { ui } from '../../src/theme';
const mainCopy = {
  maintenance: { title: 'صيانة سيارتك', body: 'ارسل طلب لاستقبال العروض من الورش المختصه' },
  parts: { title: 'قطع الغيار', body: 'ارسل طلب لاستقبال العروض من المتاجر المختصه' },
} as const;
export default function Home() {
  const { width: screenWidth } = useWindowDimensions();
  const bannerWidth = screenWidth - ui.spacing.md * 2;
  const { theme, profile, notifications, requests } = useApp();
  const bannerRef = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () =>
        setPage((current) => {
          const next = (current + 1) % banners.length;
          bannerRef.current?.scrollTo({ x: next * bannerWidth, animated: true });
          return next;
        }),
      5000,
    );
    return () => clearInterval(timer);
  }, [bannerWidth]);
  const openService = (key: string) => router.push(`/request/new?service=${key}` as never);
  const latest = requests[0];
  return (
    <SafeAreaView edges={['top']} style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.identity}>
            <View
              style={[
                styles.brandMark,
                { backgroundColor: theme.primary, shadowColor: theme.glow },
              ]}
            >
              <View style={[styles.brandShine, { backgroundColor: `${theme.onPrimary}22` }]} />
              <Icon name="car-wrench" size={23} color={theme.onPrimary} />
            </View>
            <View>
              <Text style={[styles.brandName, { color: theme.text }]}>مزاد الصيانة</Text>
              <Text style={[styles.greeting, { color: theme.textSecondary }]}>
                مرحباً {profile.name}
              </Text>
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="الإشعارات"
            onPress={() => router.push('/notifications')}
            style={({ pressed }) => [
              styles.bell,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
                shadowColor: theme.shadow,
                opacity: pressed ? 0.76 : 1,
              },
            ]}
          >
            <Icon name="bell-outline" size={23} color={theme.primary} />
            {notifications.some((item) => !item.read) ? (
              <View
                style={[styles.unread, { backgroundColor: theme.gold, borderColor: theme.surface }]}
              />
            ) : null}
          </Pressable>
        </View>

        <ScrollView
          ref={bannerRef}
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
              style={({ pressed }) => [{ width: bannerWidth }, pressed && { opacity: 0.94 }]}
            >
              <View
                style={[
                  styles.banner,
                  {
                    backgroundColor: index === 1 ? theme.primary : theme.brandNavy,
                    borderColor: theme.accentBlue,
                    shadowColor: theme.glow,
                  },
                ]}
              >
                <View style={[styles.bannerGlow, { backgroundColor: `${theme.glow}24` }]} />
                <View style={[styles.bannerSheen, { backgroundColor: `${theme.onPrimary}0D` }]} />
                <View style={styles.bannerCopy}>
                  <Text style={[styles.bannerEyebrow, { color: theme.gold }]}>
                    خدمات سيارات بثقة ووضوح
                  </Text>
                  <Text style={[styles.bannerTitle, { color: theme.onPrimary }]}>
                    {banner.title}
                  </Text>
                  <Text style={[styles.bannerBody, { color: `${theme.onPrimary}D9` }]}>
                    {banner.description}
                  </Text>
                  <View style={styles.bannerAction}>
                    <Text style={[styles.bannerLink, { color: theme.onPrimary }]}>اعرف المزيد</Text>
                    <Icon name="arrow-left" size={17} color={theme.onPrimary} />
                  </View>
                </View>
                <View
                  style={[
                    styles.bannerVisual,
                    { backgroundColor: `${theme.onPrimary}16`, borderColor: `${theme.glow}70` },
                  ]}
                >
                  <View style={[styles.visualShine, { backgroundColor: `${theme.onPrimary}1F` }]} />
                  <Icon name={banner.icon as IconName} size={39} color={theme.onPrimary} />
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
                  backgroundColor: index === page ? theme.primary : theme.border,
                },
              ]}
            />
          ))}
        </View>

        <SectionTitle>الخدمات الرئيسية</SectionTitle>
        <View style={styles.mainGrid}>
          {(['maintenance', 'parts'] as const).map((key, index) => (
            <Pressable
              key={key}
              onPress={() => openService(key)}
              style={({ pressed }) => [
                styles.mainPressable,
                pressed && { transform: [{ scale: 0.982 }] },
              ]}
            >
              <View
                style={[
                  styles.mainCard,
                  {
                    backgroundColor: index === 0 ? theme.brandNavy : theme.primary,
                    borderColor: index === 0 ? theme.accentBlue : theme.glow,
                    shadowColor: theme.shadow,
                  },
                ]}
              >
                <View style={[styles.cardGlow, { backgroundColor: `${theme.glow}20` }]} />
                <View
                  style={[
                    styles.mainIcon,
                    { backgroundColor: `${theme.onPrimary}16`, borderColor: `${theme.glow}55` },
                  ]}
                >
                  <View
                    style={[styles.iconReflection, { backgroundColor: `${theme.onPrimary}20` }]}
                  />
                  <Icon
                    name={serviceInfo[key].icon as IconName}
                    size={31}
                    color={theme.onPrimary}
                  />
                </View>
                <Text style={[styles.mainTitle, { color: theme.onPrimary }]}>
                  {mainCopy[key].title}
                </Text>
                <Text style={[styles.mainBody, { color: `${theme.onPrimary}DF` }]}>
                  {mainCopy[key].body}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.otherHeading}>
          <SectionTitle>خدمات أخرى</SectionTitle>
          <Text style={[styles.otherDescription, { color: theme.textSecondary }]}>
            ارسل طلبا للخدمه التي تحتاجها{`\n`}وانتظر العروض من الورش والمتاجر المختصه
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.services}
        >
          {(['mobile', 'towing', 'battery', 'tires', 'glass', 'accessories'] as const).map(
            (key) => (
              <Pressable
                key={key}
                onPress={() => openService(key)}
                style={({ pressed }) => [
                  styles.serviceCard,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    shadowColor: theme.shadow,
                  },
                  pressed && { backgroundColor: theme.surfaceAlt, transform: [{ scale: 0.985 }] },
                ]}
              >
                <View
                  style={[
                    styles.serviceIcon,
                    { backgroundColor: theme.primarySoft, borderColor: `${theme.accentBlue}35` },
                  ]}
                >
                  <View
                    style={[styles.serviceShine, { backgroundColor: `${theme.onPrimary}80` }]}
                  />
                  <Icon name={serviceInfo[key].icon as IconName} size={25} color={theme.primary} />
                </View>
                <Text style={[styles.serviceTitle, { color: theme.text }]}>
                  {serviceInfo[key].title}
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
                <Icon name="chevron-left" size={22} color={theme.primary} />
              </View>
            </Card>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1 },
  flex: { flex: 1 },
  content: {
    paddingHorizontal: ui.spacing.md,
    paddingTop: ui.spacing.sm,
    paddingBottom: 112,
    gap: ui.spacing.md,
  },
  header: {
    minHeight: 58,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  identity: { flexDirection: 'row-reverse', alignItems: 'center', gap: ui.spacing.sm },
  brandMark: {
    width: 47,
    height: 47,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 5,
  },
  brandShine: {
    position: 'absolute',
    width: 60,
    height: 23,
    top: -8,
    left: -5,
    transform: [{ rotate: '-12deg' }],
  },
  brandName: { fontSize: 20, lineHeight: 27, fontWeight: '700', textAlign: 'right' },
  greeting: { fontSize: 14, lineHeight: 20, textAlign: 'right' },
  bell: {
    width: 47,
    height: 47,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  unread: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  banner: {
    minHeight: 172,
    borderRadius: 27,
    borderWidth: 1,
    padding: ui.spacing.lg,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 5,
  },
  bannerGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    left: -65,
    bottom: -90,
  },
  bannerSheen: {
    position: 'absolute',
    width: 250,
    height: 44,
    top: -20,
    right: -20,
    transform: [{ rotate: '-8deg' }],
  },
  bannerCopy: { flex: 1, gap: 6, zIndex: 2 },
  bannerEyebrow: { fontSize: 12, lineHeight: 18, fontWeight: '700', textAlign: 'right' },
  bannerTitle: { fontSize: 20, lineHeight: 29, fontWeight: '700', textAlign: 'right' },
  bannerBody: { fontSize: 14, lineHeight: 21, textAlign: 'right' },
  bannerAction: { flexDirection: 'row-reverse', alignItems: 'center', gap: 5, marginTop: 3 },
  bannerLink: { fontSize: 14, fontWeight: '700' },
  bannerVisual: {
    width: 72,
    height: 72,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ui.spacing.sm,
    overflow: 'hidden',
  },
  visualShine: {
    position: 'absolute',
    width: 80,
    height: 25,
    top: -8,
    transform: [{ rotate: '-12deg' }],
  },
  dots: { flexDirection: 'row-reverse', justifyContent: 'center', gap: 6 },
  dot: { height: 6, borderRadius: 3 },
  mainGrid: { flexDirection: 'row-reverse', gap: ui.spacing.sm },
  mainPressable: { flex: 1 },
  mainCard: {
    minHeight: 216,
    borderRadius: 23,
    borderWidth: 1,
    padding: ui.spacing.md,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 5,
  },
  cardGlow: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    left: -65,
    bottom: -55,
  },
  mainIcon: {
    width: 57,
    height: 57,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconReflection: {
    position: 'absolute',
    height: 18,
    width: 70,
    top: -4,
    transform: [{ rotate: '-10deg' }],
  },
  mainTitle: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: ui.spacing.md,
  },
  mainBody: { fontSize: 14, lineHeight: 23, textAlign: 'right', marginTop: 6 },
  otherHeading: { gap: 4 },
  otherDescription: { fontSize: 15, lineHeight: 24, textAlign: 'right' },
  services: { gap: ui.spacing.xs, paddingLeft: ui.spacing.md, paddingBottom: 4 },
  serviceCard: {
    width: 122,
    minHeight: 116,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: ui.spacing.sm,
    alignItems: 'flex-end',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  serviceShine: {
    position: 'absolute',
    width: 55,
    height: 15,
    top: -4,
    transform: [{ rotate: '-10deg' }],
  },
  serviceTitle: {
    width: '100%',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: 10,
  },
  activityRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: ui.spacing.sm },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: { fontSize: 16, fontWeight: '700', textAlign: 'right' },
  activityBody: { fontSize: 14, textAlign: 'right', marginTop: 3 },
});
