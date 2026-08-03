import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Field, Header, Screen, Title } from '../src/components/ui';
export default function Phone() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const next = () => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setError('أدخل رقم هاتف عراقي صحيحاً');
      return;
    }
    router.push({ pathname: '/otp', params: { phone } });
  };
  return (
    <Screen>
      <Header title="رقم الهاتف" />
      <Title sub="سنستخدم رمز تحقق تجريبي ولن نرسل رسالة حقيقية">التسجيل برقم عراقي</Title>
      <Field
        label="رقم الهاتف *"
        value={phone}
        onChangeText={(v) => {
          setPhone(v);
          setError('');
        }}
        keyboardType="phone-pad"
        placeholder="مثال: 0790 000 0000"
        error={error}
      />
      <Button title="إرسال رمز تجريبي" onPress={next} />
    </Screen>
  );
}
