import { router } from 'expo-router';
import { Button, EmptyState, Header, Screen, Title } from '../../src/components/ui';
import { VehicleCard } from '../../src/components/cards';
import { useApp } from '../../src/store/AppContext';
export default function Vehicles() {
  const { vehicles } = useApp();
  return (
    <Screen>
      <Header title="مركباتي" />
      <Title sub="أدخل بيانات المركبة يدوياً، ولا نطلب صورة أو رقم لوحة">المركبات المحفوظة</Title>
      <Button title="إضافة مركبة" onPress={() => router.push('/vehicle/edit')} />
      {vehicles.length ? (
        vehicles.map((v) => (
          <VehicleCard
            key={v.id}
            vehicle={v}
            onEdit={() => router.push(`/vehicle/edit?id=${v.id}`)}
          />
        ))
      ) : (
        <EmptyState
          icon="🚙"
          title="لا توجد مركبات"
          body="أضف مركبتك الأولى لتتمكن من إنشاء طلب."
          action={{ title: 'إضافة مركبة', onPress: () => router.push('/vehicle/edit') }}
        />
      )}
    </Screen>
  );
}
