import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Button, Choice, Field, Header, Screen, Title } from '../src/components/ui';
import { areas } from '../src/constants';
import { useApp } from '../src/store/AppContext';
export default function Profile() {
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const { finishOnboarding } = useApp();
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [error, setError] = useState('');
  const done = () => {
    if (!name.trim() || !area) {
      setError('الاسم والمنطقة مطلوبان');
      return;
    }
    finishOnboarding({ name: name.trim(), phone: phone ?? '', area });
    router.replace('/(tabs)');
  };
  return (
    <Screen>
      <Header title="إكمال الحساب" />
      <Title sub="لا نطلب صورة أو عنواناً دقيقاً أو موقعاً جغرافياً">معلومات الزبون</Title>
      <Field label="الاسم *" value={name} onChangeText={setName} placeholder="مثال: سارة" />
      <Field label="رقم الهاتف" value={phone ?? ''} editable={false} />
      {areas.map((item) => (
        <Choice key={item} label={item} selected={area === item} onPress={() => setArea(item)} />
      ))}
      {error ? <Field label="تنبيه" value={error} editable={false} error={error} /> : null}
      <Button title="إكمال وفتح الرئيسية" onPress={done} />
    </Screen>
  );
}
