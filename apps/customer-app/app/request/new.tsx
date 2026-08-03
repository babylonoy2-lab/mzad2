import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Choice, Field, Header, Progress, Screen, Title } from '../../src/components/ui';
import { VehicleCard } from '../../src/components/cards';
import { areas, faultOptions, serviceInfo } from '../../src/constants';
import type { RequestDraft, ServiceKey } from '../../src/models';
import { useApp } from '../../src/store/AppContext';
const defaults = (service: ServiceKey, area: string): RequestDraft => ({
  service,
  vehicleId: '',
  description: '',
  area,
  address: '',
  details: {},
  selected: [],
  images: [],
});
export default function NewRequest() {
  const params = useLocalSearchParams<{ service?: ServiceKey; edit?: string }>();
  const { theme, vehicles, profile, draft, setDraft, requests } = useApp();
  const editing = requests.find((request) => request.id === params.edit);
  const service = params.service ?? editing?.service ?? 'maintenance';
  const [data, setData] = useState<RequestDraft>(
    editing
      ? {
          editingRequestId: editing.id,
          service: editing.service,
          vehicleId: editing.vehicleId,
          description: editing.description,
          area: editing.area,
          address: editing.address ?? '',
          details: editing.details,
          selected: editing.details['العطل']?.split('، ') ?? [],
          images: editing.images,
        }
      : draft?.service === service
        ? draft
        : defaults(service, profile.area),
  );
  const [error, setError] = useState('');
  useEffect(() => setDraft(data), [data, setDraft]);
  const update = (key: string, value: string) =>
    setData((d) => ({ ...d, details: { ...d.details, [key]: value } }));
  const toggle = (value: string) =>
    setData((d) => ({
      ...d,
      selected: d.selected.includes(value)
        ? d.selected.filter((x) => x !== value)
        : [...d.selected, value],
    }));
  const addImage = () => {
    if (data.images.length >= 3) {
      setError('الحد الأقصى ثلاث صور');
      return;
    }
    setData((d) => ({ ...d, images: [...d.images, `صورة تجريبية ${d.images.length + 1}`] }));
  };
  const validate = () => {
    if (!data.vehicleId) {
      setError('اختر مركبة');
      return;
    }
    if (!data.description.trim()) {
      setError('الوصف مطلوب');
      return;
    }
    if ((service === 'mobile' || service === 'towing') && !data.address.trim()) {
      setError('العنوان الكامل مطلوب لهذه الخدمة');
      return;
    }
    if (service === 'maintenance' && !data.selected.length) {
      setError('اختر فئة عطل واحدة على الأقل');
      return;
    }
    const requiredDetail: Partial<Record<ServiceKey, string[]>> = {
      parts: ['القطعة'],
      towing: ['موقع الاستلام', 'الوجهة'],
      tires: ['القياس'],
      battery: ['المواصفات'],
      glass: ['مكان الزجاج'],
      accessories: ['الكمالية', 'الفئة'],
    };
    if (requiredDetail[service]?.some((key) => !data.details[key]?.trim())) {
      setError('أكمل معلومات الخدمة المطلوبة');
      return;
    }
    setError('');
    router.push('/request/review');
  };
  return (
    <Screen>
      <Header title={`طلب ${serviceInfo[service].title}`} />
      <Progress step={2} />
      <Title sub="تُحفظ المدخلات محلياً عند الرجوع">١. اختر المركبة</Title>
      {vehicles.length ? (
        vehicles.map((v) => (
          <VehicleCard
            key={v.id}
            vehicle={v}
            selectable
            selected={data.vehicleId === v.id}
            onSelect={() => setData((d) => ({ ...d, vehicleId: v.id }))}
          />
        ))
      ) : (
        <Button title="إضافة مركبة أولاً" onPress={() => router.push('/vehicle/edit')} />
      )}
      <Button title="إضافة مركبة أخرى" kind="text" onPress={() => router.push('/vehicle/edit')} />
      <Title>٢. تفاصيل الخدمة</Title>
      {service === 'maintenance'
        ? faultOptions.map((f) => (
            <Choice
              key={f}
              label={f}
              selected={data.selected.includes(f)}
              multiple
              onPress={() => toggle(f)}
            />
          ))
        : null}
      {service === 'parts' ? (
        <>
          <Field
            label="اسم القطعة *"
            value={data.details['القطعة'] ?? ''}
            onChangeText={(v) => update('القطعة', v)}
            placeholder="مثال: مضخة ماء"
          />
          <Field
            label="تفاصيل القطعة"
            value={data.details['التفاصيل'] ?? ''}
            onChangeText={(v) => update('التفاصيل', v)}
          />
          <Field
            label="الكمية"
            keyboardType="number-pad"
            value={data.details['الكمية'] ?? ''}
            onChangeText={(v) => update('الكمية', v)}
          />
          <Field
            label="الشركة المفضلة (اختياري)"
            value={data.details['الشركة المفضلة'] ?? ''}
            onChangeText={(v) => update('الشركة المفضلة', v)}
          />
          {['عروض تشمل القطع', 'عروض بدون القطع', 'أظهر النوعين', 'لا أعرف'].map((v) => (
            <Choice
              key={v}
              label={v}
              selected={data.details['مصدر القطعة'] === v}
              onPress={() => update('مصدر القطعة', v)}
            />
          ))}
        </>
      ) : null}
      {service === 'towing' ? (
        <>
          <Field
            label="موقع الاستلام *"
            value={data.details['موقع الاستلام'] ?? ''}
            onChangeText={(v) => update('موقع الاستلام', v)}
          />
          <Field
            label="الوجهة *"
            value={data.details['الوجهة'] ?? ''}
            onChangeText={(v) => update('الوجهة', v)}
          />
          <Field
            label="حالة المركبة"
            value={data.details['حالة المركبة'] ?? ''}
            onChangeText={(v) => update('حالة المركبة', v)}
            placeholder="مثال: لا تعمل"
          />
        </>
      ) : null}
      {service === 'tires' ? (
        <>
          <Field
            label="قياس الإطار *"
            value={data.details['القياس'] ?? ''}
            onChangeText={(v) => update('القياس', v)}
            placeholder="مثال: 215/55 R17"
          />
          <Field
            label="عدد الإطارات"
            keyboardType="number-pad"
            value={data.details['العدد'] ?? ''}
            onChangeText={(v) => update('العدد', v)}
          />
          {['مع التركيب', 'بدون تركيب'].map((v) => (
            <Choice
              key={v}
              label={v}
              selected={data.details['التركيب'] === v}
              onPress={() => update('التركيب', v)}
            />
          ))}
        </>
      ) : null}
      {service === 'battery' ? (
        <>
          {['أعرف مواصفات البطارية', 'لا أعرف، أريد توصية'].map((v) => (
            <Choice
              key={v}
              label={v}
              selected={data.details['المواصفات'] === v}
              onPress={() => update('المواصفات', v)}
            />
          ))}
          <Field
            label="تفاصيل البطارية إن عُرفت"
            value={data.details['تفاصيل البطارية'] ?? ''}
            onChangeText={(v) => update('تفاصيل البطارية', v)}
          />
          {['تركيب في الورشة', 'تركيب متنقل', 'بدون تركيب'].map((v) => (
            <Choice
              key={v}
              label={v}
              selected={data.details['التركيب'] === v}
              onPress={() => update('التركيب', v)}
            />
          ))}
        </>
      ) : null}
      {service === 'glass'
        ? ['الزجاج الأمامي', 'الزجاج الخلفي', 'الزجاج الأيمن', 'الزجاج الأيسر', 'أخرى'].map((v) => (
            <Choice
              key={v}
              label={v}
              selected={data.details['مكان الزجاج'] === v}
              onPress={() => update('مكان الزجاج', v)}
            />
          ))
        : null}
      {service === 'accessories' ? (
        <>
          <Field
            label="اسم الكمالية *"
            value={data.details['الكمالية'] ?? ''}
            onChangeText={(v) => update('الكمالية', v)}
          />
          {['داخلية', 'خارجية', 'إلكترونيات', 'أخرى'].map((v) => (
            <Choice
              key={v}
              label={v}
              selected={data.details['الفئة'] === v}
              onPress={() => update('الفئة', v)}
            />
          ))}
          {['مع التركيب', 'بدون تركيب'].map((v) => (
            <Choice
              key={v}
              label={v}
              selected={data.details['التركيب'] === v}
              onPress={() => update('التركيب', v)}
            />
          ))}
        </>
      ) : null}
      {service === 'mobile'
        ? faultOptions
            .slice(0, 6)
            .map((v) => (
              <Choice
                key={v}
                label={v}
                selected={data.selected.includes(v)}
                multiple
                onPress={() => toggle(v)}
              />
            ))
        : null}
      <Field
        label="وصف المشكلة أو الطلب *"
        multiline
        value={data.description}
        onChangeText={(v) => setData((d) => ({ ...d, description: v }))}
        placeholder="اكتب وصفاً واضحاً ومختصراً"
      />
      <Title>٣. الصور والموقع</Title>
      <View style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 8 }}>
        {data.images.map((img, i) => (
          <Choice
            key={img}
            label={`${img} ×`}
            selected
            onPress={() => setData((d) => ({ ...d, images: d.images.filter((_, x) => x !== i) }))}
          />
        ))}
      </View>
      <Button
        title={`إضافة صورة تجريبية (${data.images.length}/٣)`}
        kind="secondary"
        disabled={data.images.length >= 3}
        onPress={addImage}
      />
      {areas.map((a) => (
        <Choice
          key={a}
          label={a}
          selected={data.area === a}
          onPress={() => setData((d) => ({ ...d, area: a }))}
        />
      ))}
      {service === 'mobile' || service === 'towing' ? (
        <>
          <Field
            label="العنوان الكامل *"
            multiline
            value={data.address}
            onChangeText={(v) => setData((d) => ({ ...d, address: v }))}
            placeholder="اكتب علامة دالة وعنواناً واضحاً"
          />
          <Button
            title="استخدام موقع تجريبي (لا توجد صلاحية)"
            kind="secondary"
            onPress={() =>
              setData((d) => ({ ...d, address: d.address || 'موقع تجريبي قرب علامة عامة' }))
            }
          />
        </>
      ) : null}
      {error ? (
        <Text style={{ color: theme.error, textAlign: 'right', fontWeight: '700' }}>{error}</Text>
      ) : null}
      <Button title="مراجعة الطلب" onPress={validate} />
    </Screen>
  );
}
