import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Button, Field, Header, Screen, Stars, Title } from '../../src/components/ui';
import { useApp } from '../../src/store/AppContext';
export default function Rating() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { rateRequest } = useApp();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  return (
    <Screen>
      <Header title="تقييم مقدم الخدمة" />
      <Title sub="يمكن تعديل التقييم في هذا النموذج، ولا توجد صور أو فئات منفصلة">
        شارك تجربتك
      </Title>
      <Stars
        value={rating}
        onChange={(v) => {
          setRating(v);
          setError('');
        }}
      />
      <Field
        label="تعليق (اختياري)"
        multiline
        value={comment}
        onChangeText={setComment}
        placeholder="اكتب ملاحظتك باحترام"
        error={error}
      />
      <Button
        title="حفظ التقييم"
        onPress={() => {
          if (!rating) {
            setError('اختر من نجمة إلى خمس نجوم');
            return;
          }
          rateRequest(id);
          Alert.alert('شكراً لك', 'تم حفظ التقييم محلياً.', [
            { text: 'فتح الطلب', onPress: () => router.replace(`/request/${id}`) },
          ]);
        }}
      />
    </Screen>
  );
}
