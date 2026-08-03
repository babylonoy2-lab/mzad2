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
  maintenance: { title: 'لصيانة السيارة', body: 'أرسل طلب لاستقبال العروض\nمن الورش المختصة' },
  parts: { title: 'قطع الغيار', body: 'أرسل طلب لاستقبال العروض\nمن المتاجر المختصة' },
} as const;

function MainServiceArtwork({ kind, width }: { kind: keyof typeof mainCopy; width: number }) {
  const { theme } = useApp();
  return (
    <View style={[styles.mainArtwork, { width, height: width * 0.73 }]}>
      <View style={[styles.artworkGlow, { backgroundColor: `${theme.primary}16` }]} />
      {kind === 'maintenance' ? (
        <>
          <Icon name="car-side" size={Math.min(68, width * 0.48)} color={theme.primary} />
          <View style={styles.liftRig}>
            <View style={[styles.liftArm, { backgroundColor: theme.primary }]} />
            <View style={[styles.liftPost, { backgroundColor: theme.primaryPressed }]} />
            <View style={[styles.liftArm, { backgroundColor: theme.primary }]} />
          </View>
          <View style={[styles.toolBadge, { backgroundColor: theme.brandNavy }]}>
            <Icon name="wrench" size={16} color={theme.onPrimary} />
          </View>
        </>
      ) : (
        <>
          <View style={styles.partsInside}>
            <Icon name="car-brake-disc" size={34} color={theme.textSecondary} />
            <Icon name="cog" size={31} color={theme.primary} />
          </View>
          <Icon name="basket" size={Math.min(70, width * 0.5)} color={theme.primary} />
        </>
      )}
    </View>
  );
}

function ServiceArtwork({ service }: { service: keyof typeof serviceInfo }) {
  const { theme } = useApp();
  return (
    <View style={[styles.serviceArtwork, { backgroundColor: theme.primarySoft }]}>
      <View style={[styles.serviceGloss, { backgroundColor: `${theme.onPrimary}8F` }]} />
      <Icon name={serviceInfo[service].icon as IconName} size={39} color={theme.primary} />
    </View>
  );
}
export default function Home() {
  const { width: screenWidth } = useWindowDimensions();
  const bannerWidth = screenWidth - ui.spacing.md * 2;
  const { theme, notifications, requests } = useApp();
  const mainArtworkWidth = Math.min(142, (screenWidth - ui.spacing.md * 3) / 2 - ui.spacing.md);
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
          <View style={styles.centerBrand}>
            <View style={styles.carRoof}>
              <View style={[styles.roofLine, { borderColor: theme.primary }]} />
            </View>
            <Text style={[styles.brandName, { color: theme.text }]}>مزاد الصيانة</Text>
            <Text style={[styles.brandSubtitle, { color: theme.textSecondary }]}>
              عروض تصليح السيارات
            </Text>
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
          {banners.map((banner) => (
            <Pressable
              key={banner.id}
              onPress={() => router.push(banner.action as never)}
              style={({ pressed }) => [{ width: bannerWidth }, pressed && { opacity: 0.94 }]}
            >
              <View
                style={[
                  styles.banner,
                  {
                    backgroundColor: theme.brandNavy,
                    borderColor: theme.accentBlue,
                    shadowColor: theme.glow,
                  },
                ]}
              >
                <View style={[styles.bannerGlow, { backgroundColor: `${theme.glow}2E` }]} />
                <View style={[styles.bannerOrb, { borderColor: `${theme.glow}45` }]} />
                <View style={styles.bannerCopy}>
                  <Text style={[styles.bannerEyebrow, { color: theme.gold }]}>عروض مميزة</Text>
                  <Text style={[styles.bannerTitle, { color: theme.onPrimary }]}>
                    {banner.title}
                  </Text>
                  <Text style={[styles.bannerBody, { color: `${theme.onPrimary}D9` }]}>
                    {banner.description}
                  </Text>
                  <View style={[styles.bannerButton, { backgroundColor: theme.primary }]}>
                    <Text style={[styles.bannerButtonText, { color: theme.onPrimary }]}>
                      العروض الجديدة
                    </Text>
                  </View>
                </View>
                <View style={styles.promoVisual}>
                  <View style={[styles.promoPlate, { borderColor: `${theme.glow}70` }]}>
                    <Icon name={banner.icon as IconName} size={48} color={theme.onPrimary} />
                  </View>
                  <View style={[styles.promoPart, { backgroundColor: theme.primary }]}>
                    <Icon name="tire" size={25} color={theme.onPrimary} />
                  </View>
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

        <Text style={[styles.maintenanceHeading, { color: theme.text }]}>الصيانة</Text>
        <View style={styles.mainGrid}>
          {(['parts', 'maintenance'] as const).map((key) => (
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
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    shadowColor: theme.shadow,
                  },
                ]}
              >
                <MainServiceArtwork kind={key} width={mainArtworkWidth} />
                <Text style={[styles.requestLabel, { color: theme.text }]}>طلب عرض</Text>
                <Text style={[styles.mainTitle, { color: theme.primary }]}>
                  {mainCopy[key].title}
                </Text>
                <View style={[styles.mainCta, { backgroundColor: theme.primary }]}>
                  <Text style={[styles.mainBody, { color: theme.onPrimary }]}>
                    {mainCopy[key].body}
                  </Text>
                </View>
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
          {(['accessories', 'glass', 'tires', 'battery', 'towing', 'mobile'] as const).map(
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
                <ServiceArtwork service={key} />
                <Text style={[styles.serviceTitle, { color: theme.text }]}>
                  {serviceInfo[key].title}
                </Text>
                <View style={[styles.serviceUnderline, { backgroundColor: theme.primary }]} />
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
    paddingTop: ui.spacing.xs,
    paddingBottom: 112,
    gap: ui.spacing.sm,
  },
  header: {
    height: 104,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerBrand: { alignItems: 'center', justifyContent: 'center', gap: 1 },
  carRoof: { width: 84, height: 20, overflow: 'hidden' },
  roofLine: {
    width: 82,
    height: 40,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderRadius: 42,
    transform: [{ scaleY: 0.45 }],
    top: 4,
  },
  brandName: { fontSize: 24, lineHeight: 30, fontWeight: '800', textAlign: 'center' },
  brandSubtitle: { fontSize: 13, lineHeight: 19, fontWeight: '500', textAlign: 'center' },
  bell: {
    position: 'absolute',
    right: 0,
    top: 28,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unread: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  banner: {
    minHeight: 194,
    borderRadius: 20,
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
  bannerOrb: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1,
    right: -75,
    top: -90,
  },
  bannerCopy: { flex: 1, gap: 6, zIndex: 2 },
  bannerEyebrow: { fontSize: 12, lineHeight: 18, fontWeight: '700', textAlign: 'right' },
  bannerTitle: { fontSize: 20, lineHeight: 29, fontWeight: '700', textAlign: 'right' },
  bannerBody: { fontSize: 14, lineHeight: 21, textAlign: 'right' },
  bannerButton: {
    minHeight: 38,
    alignSelf: 'flex-start',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 5,
  },
  bannerButtonText: { fontSize: 13, lineHeight: 18, fontWeight: '700' },
  promoVisual: { width: 102, height: 126, alignItems: 'center', justifyContent: 'center' },
  promoPlate: {
    width: 91,
    height: 91,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  promoPart: {
    position: 'absolute',
    width: 44,
    height: 44,
    left: -1,
    bottom: 2,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: { flexDirection: 'row-reverse', justifyContent: 'center', gap: 6 },
  dot: { height: 6, borderRadius: 3 },
  maintenanceHeading: {
    fontSize: 23,
    lineHeight: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: ui.spacing.xs,
  },
  mainGrid: { flexDirection: 'row', gap: ui.spacing.sm },
  mainPressable: { flex: 1 },
  mainCard: {
    minHeight: 286,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: ui.spacing.sm,
    paddingVertical: ui.spacing.md,
    alignItems: 'center',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 3,
  },
  mainArtwork: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  artworkGlow: {
    position: 'absolute',
    width: '90%',
    height: '76%',
    borderRadius: 32,
    bottom: 3,
  },
  liftRig: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  liftArm: { width: 31, height: 4, borderRadius: 2 },
  liftPost: { width: 5, height: 18, borderRadius: 2 },
  toolBadge: {
    position: 'absolute',
    right: 9,
    bottom: 7,
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partsInside: {
    position: 'absolute',
    top: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: -6,
    zIndex: 2,
  },
  requestLabel: { fontSize: 14, lineHeight: 20, textAlign: 'center', marginTop: 5 },
  mainTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 1,
  },
  mainCta: {
    width: '100%',
    minHeight: 64,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginTop: ui.spacing.sm,
  },
  mainBody: { fontSize: 13, lineHeight: 20, fontWeight: '600', textAlign: 'center' },
  otherHeading: { gap: 2, marginTop: ui.spacing.md },
  otherDescription: { fontSize: 15, lineHeight: 23, textAlign: 'right' },
  services: { gap: 8, paddingLeft: ui.spacing.md, paddingBottom: 6 },
  serviceCard: {
    width: 105,
    minHeight: 136,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 6,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 9,
    elevation: 2,
  },
  serviceArtwork: {
    width: 88,
    height: 82,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  serviceGloss: {
    position: 'absolute',
    width: 100,
    height: 24,
    top: -9,
    transform: [{ rotate: '-8deg' }],
  },
  serviceTitle: {
    width: '100%',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 7,
  },
  serviceUnderline: { width: 20, height: 2, borderRadius: 1, marginTop: 'auto' },
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
