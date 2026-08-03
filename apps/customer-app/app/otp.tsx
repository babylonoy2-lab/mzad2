import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Field, Header, Screen, Title } from '../src/components/ui';
import { MOCK_OTP } from '../src/constants';
import { useApp } from '../src/store/AppContext';
export default function Otp() {
  const { phone, change } = useLocalSearchParams<{ phone?: string; change?: string }>();
  const { theme, updatePhone } = useApp();
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [error, setError] = useState('');
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);
  const verify = () => {
    if (code !== MOCK_OTP) {
      setError('الرمز غير صحيح. استخدم 123456');
      return;
    }
    if (change === '1') {
      updatePhone(phone ?? '');
      router.replace('/settings-phone-success');
    } else router.replace({ pathname: '/profile', params: { phone } });
  };
  return (
    <Screen>
      <Header title="رمز التحقق" />
      <Title sub={`أدخل الرمز المكوّن من ستة أرقام للرقم ${phone ?? ''}`}>التحقق التجريبي</Title>
      <Field
        label="رمز التحقق *"
        value={code}
        onChangeText={(v) => {
          setCode(v.replace(/\D/g, '').slice(0, 6));
          setError('');
        }}
        keyboardType="number-pad"
        maxLength={6}
        placeholder="••••••"
        error={error}
      />
      <Text style={{ color: theme.info, textAlign: 'right' }}>رمز النموذج: 123456</Text>
      <Button title="تحقق ومتابعة" disabled={code.length !== 6} onPress={verify} />
      <Button
        title={seconds ? `إعادة الإرسال بعد ${seconds} ثانية` : 'إعادة إرسال الرمز'}
        disabled={seconds > 0}
        kind="secondary"
        onPress={() => setSeconds(30)}
      />
      <Button title="تغيير رقم الهاتف" kind="text" onPress={() => router.back()} />
    </Screen>
  );
}
