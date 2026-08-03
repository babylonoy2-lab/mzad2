import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';
import { Button, Choice, Field, Header, Screen, Title } from '../../src/components/ui';
import { useApp } from '../../src/store/AppContext';
const types = ['جودة الخدمة', 'سلوك مقدم الخدمة', 'العرض غير مطابق', 'مشكلة تقنية', 'أخرى'];
export default function ComplaintNew() {
  const { requestId } = useLocalSearchParams<{ requestId?: string }>();
  const { theme, addComplaint } = useApp();
  const [type, setType] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(false);
  const [error, setError] = useState('');
  const submit = () => {
    if (!type || !subject.trim() || !description.trim()) {
      setError('أكمل نوع الشكوى والموضوع والوصف');
      return;
    }
    const id = `CMP-${Date.now()}`;
    addComplaint({
      id,
      type,
      requestId,
      subject,
      description,
      status: 'تم الإرسال',
      createdAt: new Date().toLocaleDateString('ar-IQ'),
    });
    router.replace(`/complaints/${id}`);
  };
  return (
    <Screen>
      <Header title="شكوى جديدة" />
      <Title sub={requestId ? `مرتبطة بالطلب ${requestId}` : 'يمكن تقديم شكوى عامة'}>
        تفاصيل الشكوى
      </Title>
      {types.map((t) => (
        <Choice key={t} label={t} selected={type === t} onPress={() => setType(t)} />
      ))}
      <Field label="الموضوع *" value={subject} onChangeText={setSubject} />
      <Field label="الوصف *" multiline value={description} onChangeText={setDescription} />
      <Button
        title={image ? 'إزالة الصورة التجريبية' : 'إضافة صورة اختيارية'}
        kind="secondary"
        onPress={() => setImage(!image)}
      />
      {error ? <Text style={{ color: theme.error, textAlign: 'right' }}>{error}</Text> : null}
      <Button title="إرسال الشكوى" onPress={submit} />
    </Screen>
  );
}
