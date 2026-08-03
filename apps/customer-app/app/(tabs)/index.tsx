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
  maintenance: { title: 'صيانة سيارتك', body: 'أرسل طلب لاستقبال العروض من الورش المختصة' },
  parts: { title: 'قطع الغيار', body: 'أرسل طلب لاستقبال العروض من المتاجر المختصة' },
} as const;

function MainServiceArtwork({ kind }: { kind: keyof typeof mainCopy }) {
  const { theme } = useApp();
  if (kind === 'maintenance') {
    return (
      <View style={styles.artwork}>
        <View style={[styles.artworkHalo, { backgroundColor: `${theme.glow}24` }]} />
        <View style={[styles.artworkPlate, { borderColor: `${theme.glow}70` }]}>
          <View style={[styles.liftTop, { backgroundColor: theme.glow }]} />
          <Icon name="car" size={48} color={theme.onPrimary} />
          <View style={styles.liftAssembly}>
            <View style={[styles.liftArm, { backgroundColor: theme.gold }]} />
            <View style={[styles.liftStem, { backgroundColor: theme.glow }]} />
            <View style={[styles.liftArm, { backgroundColor: theme.gold }]} />
          </View>
          <View
            style={[
              styles.artworkBadge,
              { backgroundColor: theme.onPrimary, shadowColor: theme.shadow },
            ]}
          >
            <Icon name="wrench" size={16} color={theme.primary} />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.artwork}>
      <View style={[styles.artworkHalo, { backgroundColor: `${theme.glow}24` }]} />
      <View style={[styles.artworkPlate, { borderColor: `${theme.glow}70` }]}>
        <View style={styles.partsCluster}>
          <Icon name="cog" size={31} color={theme.glow} />
          <Icon name="car-brake-disc" size={29} color={theme.onPrimary} />
        </View>
        <Icon name="basket" size={57} color={theme.onPrimary} />
        <View
          style={[styles.artworkBadge, { backgroundColor: theme.gold, shadowColor: theme.shadow }]}
        >
          <Icon name="check-bold" size={14} color={theme.brandNavy} />
        </View>
      </View>
    </View>
  );
}

function ServiceArtwork({ name, accent }: { name: IconName; accent: string }) {
  const { theme } = useApp();
  return (
    <View
      style={[
        styles.serviceArtwork,
        { backgroundColor: theme.primarySoft, borderColor: `${accent}42`, shadowColor: accent },
      ]}
    >
      <View style={[styles.serviceGlow, { backgroundColor: `${accent}28` }]} />
      <View style={[styles.serviceDisc, { backgroundColor: `${accent}18` }]}>
        <Icon name={name} size={30} color={accent} />
      </View>
      <View style={[styles.serviceSpark, { backgroundColor: theme.gold }]} />
    </View>
  );
}
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
                <MainServiceArtwork kind={key} />
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
            أرسل طلبا للخدمة التي تحتاجها{`\n`}وانتظر العروض من الورش والمتاجر المختصة
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
                <ServiceArtwork
                  name={serviceInfo[key].icon as IconName}
                  accent={
                    key === 'battery' || key === 'accessories' ? theme.secondary : theme.primary
                  }
                />
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
    minHeight: 252,
    borderRadius: 26,
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
  artwork: {
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artworkHalo: {
    position: 'absolute',
    width: 112,
    height: 74,
    borderRadius: 37,
  },
  artworkPlate: {
    width: 100,
    height: 88,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  liftTop: {
    position: 'absolute',
    width: 54,
    height: 3,
    borderRadius: 2,
    top: 18,
  },
  liftAssembly: {
    position: 'absolute',
    bottom: 13,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  liftArm: { width: 25, height: 3, borderRadius: 2 },
  liftStem: { width: 4, height: 13, borderRadius: 2 },
  partsCluster: {
    position: 'absolute',
    top: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: -7,
    zIndex: 2,
  },
  artworkBadge: {
    position: 'absolute',
    left: 9,
    bottom: 9,
    width: 27,
    height: 27,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  mainTitle: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: ui.spacing.sm,
  },
  mainBody: { fontSize: 14, lineHeight: 23, textAlign: 'right', marginTop: 6 },
  otherHeading: { gap: 4 },
  otherDescription: { fontSize: 15, lineHeight: 24, textAlign: 'right' },
  services: { gap: ui.spacing.xs, paddingLeft: ui.spacing.md, paddingBottom: 4 },
  serviceCard: {
    width: 126,
    minHeight: 132,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: ui.spacing.sm,
    alignItems: 'flex-end',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  serviceArtwork: {
    width: 62,
    height: 62,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceGlow: {
    position: 'absolute',
    width: 55,
    height: 55,
    borderRadius: 28,
    right: -22,
    top: -20,
  },
  serviceDisc: {
    width: 47,
    height: 47,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceSpark: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 4,
    left: 8,
    top: 8,
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
