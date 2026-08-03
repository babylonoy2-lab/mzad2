import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import { banners } from '../../src/mock';
import { Card, Screen, Title } from '../../src/components/ui';
import { serviceInfo } from '../../src/constants';
import { useApp } from '../../src/store/AppContext';
const width = Dimensions.get('window').width - 36;
export default function Home() {
  const { theme, profile, notifications, requests } = useApp();
  const ref = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () =>
        setPage((p) => {
          const next = (p + 1) % banners.length;
          ref.current?.scrollTo({ x: next * width, animated: true });
          return next;
        }),
      5000,
    );
    return () => clearInterval(t);
  }, []);
  const service = (key: string) => router.push(`/request/new?service=${key}` as never);
  return (
    <Screen>
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={{ color: theme.muted, textAlign: 'right' }}>أهلاً بك</Text>
          <Text style={{ color: theme.text, fontSize: 25, fontWeight: '900' }}>{profile.name}</Text>
        </View>
        <Pressable
          accessibilityLabel="الإشعارات"
          onPress={() => router.push('/notifications')}
          style={{
            width: 48,
            height: 48,
            borderRadius: 16,
            backgroundColor: theme.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 23 }}>🔔</Text>
          {notifications.some((n) => !n.read) ? (
            <View
              style={{
                position: 'absolute',
                top: 7,
                right: 7,
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: theme.error,
              }}
            />
          ) : null}
        </Pressable>
      </View>
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / width))}
        style={{ marginHorizontal: -18 }}
        contentContainerStyle={{ paddingHorizontal: 18 }}
      >
        {banners.map((b) => (
          <Pressable
            key={b.id}
            style={{ width, paddingRight: 12 }}
            onPress={() => router.push(b.action as never)}
          >
            <View
              style={{
                backgroundColor: theme.primarySoft,
                minHeight: 152,
                borderRadius: 22,
                padding: 20,
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 34 }}>{b.icon}</Text>
              <Text
                style={{ color: theme.text, fontSize: 21, fontWeight: '900', textAlign: 'right' }}
              >
                {b.title}
              </Text>
              <Text style={{ color: theme.muted, textAlign: 'right', lineHeight: 22 }}>
                {b.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', gap: 6 }}>
        {banners.map((b, i) => (
          <View
            key={b.id}
            style={{
              width: i === page ? 22 : 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: i === page ? theme.primary : theme.border,
            }}
          />
        ))}
      </View>
      <Title>اطلب عروضاً</Title>
      <View style={{ flexDirection: 'row-reverse', gap: 10 }}>
        {(['maintenance', 'parts'] as const).map((key) => (
          <Pressable key={key} onPress={() => service(key)} style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: key === 'maintenance' ? theme.primary : theme.secondary,
                borderRadius: 20,
                padding: 16,
                minHeight: 180,
              }}
            >
              <Text style={{ fontSize: 32 }}>{serviceInfo[key].icon}</Text>
              <Text
                style={{
                  color: key === 'maintenance' ? theme.background : '#2B210F',
                  fontSize: 19,
                  fontWeight: '900',
                  textAlign: 'right',
                  marginTop: 15,
                }}
              >
                طلب عروض لـ{serviceInfo[key].title}
              </Text>
              <Text
                style={{
                  color: key === 'maintenance' ? theme.background : '#49300B',
                  textAlign: 'right',
                  lineHeight: 21,
                  marginTop: 5,
                }}
              >
                {serviceInfo[key].hint}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <Title>خدمات إضافية</Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {(['mobile', 'towing', 'tires', 'battery', 'glass', 'accessories'] as const).map((key) => (
          <Pressable key={key} onPress={() => service(key)} style={{ width: 125, marginLeft: 10 }}>
            <View
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border,
                borderWidth: 1,
                borderRadius: 16,
                padding: 13,
                minHeight: 126,
              }}
            >
              <Text style={{ fontSize: 28 }}>{serviceInfo[key].icon}</Text>
              <Text
                style={{ color: theme.text, fontWeight: '800', textAlign: 'right', marginTop: 8 }}
              >
                {serviceInfo[key].title}
              </Text>
              <Text style={{ color: theme.muted, fontSize: 12, textAlign: 'right' }}>
                {serviceInfo[key].hint}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Card onPress={() => router.push('/request/' + requests[0]?.id)}>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: '800', textAlign: 'right' }}>
          آخر نشاط
        </Text>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>
          لديك طلب قيد استقبال العروض. اضغط لمتابعته.
        </Text>
      </Card>
    </Screen>
  );
}
