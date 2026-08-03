import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Field, Header, Screen, Title } from '../src/components/ui';
export default function ChangePhone() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  return (
    <Screen>
      <Header title="تغيير رقم الهاتف" />
      <Title sub="سيتم استخدام رمز تحقق محاكى فقط">الرقم الجديد</Title>
      <Field
        label="رقم الهاتف العراقي *"
        value={phone}
        onChangeText={(v) => {
          setPhone(v);
          setError('');
        }}
        keyboardType="phone-pad"
        placeholder="0790 000 0000"
        error={error}
      />
      <Button
        title="إرسال رمز التحقق"
        onPress={() => {
          if (phone.replace(/\D/g, '').length < 10) {
            setError('أدخل رقماً صحيحاً');
            return;
          }
          router.push({ pathname: '/otp', params: { phone, change: '1' } });
        }}
      />
    </Screen>
  );
}
