import { useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, ConfirmModal, Header, Screen, Title } from '../src/components/ui';
import { useApp } from '../src/store/AppContext';
export default function DeleteAccount() {
  const { theme, deletionRequestedAt, requestDeletion, cancelDeletion } = useApp();
  const [confirm, setConfirm] = useState(false);
  return (
    <Screen>
      <Header title="حذف الحساب" />
      <Title sub="لن نحذف بيانات النموذج نهائياً">فترة انتظار ٤٨ ساعة</Title>
      <Card>
        <Text style={{ color: theme.error, fontWeight: '800', textAlign: 'right' }}>تنبيه مهم</Text>
        <Text style={{ color: theme.text, textAlign: 'right', lineHeight: 25 }}>
          يدخل الحساب فترة انتظار لمدة ٤٨ ساعة. يمكنك إلغاء الطلب خلالها. هذا السلوك محاكى محلياً.
        </Text>
      </Card>
      {deletionRequestedAt ? (
        <>
          <Card>
            <Text style={{ color: theme.warning, textAlign: 'right', fontWeight: '800' }}>
              طلب الحذف قيد الانتظار
            </Text>
            <Text style={{ color: theme.muted, textAlign: 'right' }}>
              تاريخ الطلب: {new Date(deletionRequestedAt).toLocaleString('ar-IQ')}
            </Text>
            <Text style={{ color: theme.text, textAlign: 'right' }}>
              الوقت المتبقي التجريبي: أقل من ٤٨ ساعة
            </Text>
          </Card>
          <Button title="إلغاء طلب الحذف" onPress={cancelDeletion} kind="secondary" />
        </>
      ) : (
        <Button title="طلب حذف الحساب" onPress={() => setConfirm(true)} kind="danger" />
      )}
      <ConfirmModal
        visible={confirm}
        title="تأكيد طلب الحذف"
        body="هل تريد بدء فترة الانتظار؟ يمكنك التراجع خلال ٤٨ ساعة."
        danger
        confirmText="ابدأ فترة الانتظار"
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          requestDeletion();
          setConfirm(false);
        }}
      />
    </Screen>
  );
}
