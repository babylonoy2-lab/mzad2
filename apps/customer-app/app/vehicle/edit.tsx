import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Button,
  Choice,
  ConfirmModal,
  Field,
  Header,
  Screen,
  Title,
} from '../../src/components/ui';
import { useApp } from '../../src/store/AppContext';
const fuels = ['بنزين', 'ديزل', 'كهربائي', 'هجين'];
export default function VehicleEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { vehicles, saveVehicle, deleteVehicle } = useApp();
  const old = vehicles.find((v) => v.id === id);
  const [maker, setMaker] = useState(old?.maker ?? '');
  const [model, setModel] = useState(old?.model ?? '');
  const [year, setYear] = useState(old?.year ?? '');
  const [engine, setEngine] = useState(old?.engine ?? '');
  const [fuel, setFuel] = useState(old?.fuel ?? '');
  const [vin, setVin] = useState(old?.vin ?? '');
  const [notes, setNotes] = useState(old?.notes ?? '');
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(false);
  const save = () => {
    if (!maker || !model || !year || !engine || !fuel) {
      setError('أكمل جميع الحقول المطلوبة');
      return;
    }
    saveVehicle({
      id: old?.id ?? `v-${Date.now()}`,
      maker,
      model,
      year,
      engine,
      fuel,
      vin: vin || undefined,
      notes: notes || undefined,
    });
    router.back();
  };
  return (
    <Screen>
      <Header title={old ? 'تعديل المركبة' : 'إضافة مركبة'} />
      <Title sub="الأمثلة إرشادية ولا توجد قائمة علامات ثابتة">بيانات المركبة</Title>
      <Field
        label="الشركة المصنّعة *"
        placeholder="مثال: تويوتا، كيا، فورد"
        value={maker}
        onChangeText={setMaker}
      />
      <Field
        label="الموديل *"
        placeholder="مثال: كامري، سورينتو"
        value={model}
        onChangeText={setModel}
      />
      <Field
        label="سنة الصنع *"
        placeholder="مثال: 2018"
        keyboardType="number-pad"
        value={year}
        onChangeText={setYear}
      />
      <Field
        label="حجم المحرك *"
        placeholder="مثال: 2.0 أو 3.0"
        value={engine}
        onChangeText={setEngine}
      />
      {fuels.map((f) => (
        <Choice key={f} label={f} selected={fuel === f} onPress={() => setFuel(f)} />
      ))}
      <Field label="رقم الشاصي (اختياري)" placeholder="اختياري" value={vin} onChangeText={setVin} />
      <Field label="تفاصيل إضافية (اختياري)" multiline value={notes} onChangeText={setNotes} />
      {error ? <Field label="تنبيه" value={error} editable={false} error={error} /> : null}
      <Button title="حفظ المركبة" onPress={save} />
      {old ? <Button title="حذف المركبة" kind="danger" onPress={() => setConfirm(true)} /> : null}
      <ConfirmModal
        visible={confirm}
        title="حذف المركبة؟"
        body="لن تتمكن من اختيارها لطلبات جديدة."
        danger
        confirmText="حذف"
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          deleteVehicle(old!.id);
          router.replace('/vehicle');
        }}
      />
    </Screen>
  );
}
