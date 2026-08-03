import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, Card, Choice, Screen, Title } from '../src/components/ui';
import { useApp } from '../src/store/AppContext';
const steps = [
  ['١', 'أنشئ طلبك', 'اختر الخدمة المطلوبة واشرح المشكلة.'],
  ['٢', 'استلم العروض', 'تصلك عروض من الورش أو المتاجر المناسبة.'],
  ['٣', 'اختر العرض الأفضل', 'قارن السعر والتقييم والموعد والتفاصيل.'],
  ['٤', 'قيّم مقدم الخدمة', 'شارك تقييمك بعد اكتمال الخدمة.'],
];
export default function Welcome() {
  const { theme } = useApp();
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  return (
    <Screen>
      <Title sub="منصة عراقية تجريبية تربطك بمقدمي خدمات السيارات">مزاد الصيانة</Title>
      <Card>
        <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700', textAlign: 'right' }}>
          كيف تعمل المنصة؟
        </Text>
        {steps.map(([n, t, b]) => (
          <View key={n} style={{ flexDirection: 'row-reverse', gap: 12 }}>
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: theme.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: theme.background, fontWeight: '700' }}>{n}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontWeight: '700', textAlign: 'right' }}>{t}</Text>
              <Text style={{ color: theme.muted, textAlign: 'right', lineHeight: 22 }}>{b}</Text>
            </View>
          </View>
        ))}
      </Card>
      <Choice
        label="أوافق على الشروط والأحكام"
        selected={terms}
        multiple
        onPress={() => setTerms(!terms)}
      />
      <Pressable onPress={() => router.push('/legal/terms')}>
        <Text style={{ color: theme.primary, textAlign: 'right' }}>قراءة الشروط والأحكام</Text>
      </Pressable>
      <Choice
        label="أوافق على سياسة الخصوصية"
        selected={privacy}
        multiple
        onPress={() => setPrivacy(!privacy)}
      />
      <Pressable onPress={() => router.push('/legal/privacy')}>
        <Text style={{ color: theme.primary, textAlign: 'right' }}>قراءة سياسة الخصوصية</Text>
      </Pressable>
      <Button
        title="متابعة التسجيل"
        disabled={!terms || !privacy}
        onPress={() => router.push('/phone')}
      />
      <Text style={{ color: theme.muted, textAlign: 'center' }}>
        هذه نسخة محاكاة وليست خدمة إنتاجية.
      </Text>
    </Screen>
  );
}
