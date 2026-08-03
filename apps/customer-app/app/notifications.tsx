import { Header, EmptyState, Button, Screen, Title } from '../src/components/ui';
import { NotificationCard } from '../src/components/cards';
import { useApp } from '../src/store/AppContext';
export default function Notifications() {
  const { notifications, markAllRead } = useApp();
  return (
    <Screen>
      <Header title="مركز الإشعارات" />
      <Title sub={`${notifications.filter((n) => !n.read).length} غير مقروءة`}>إشعاراتك</Title>
      {notifications.length ? (
        notifications.map((n) => <NotificationCard key={n.id} item={n} />)
      ) : (
        <EmptyState icon="🔔" title="لا توجد إشعارات" body="ستظهر تحديثات الطلبات هنا." />
      )}
      <Button title="تعليم الكل كمقروء" kind="secondary" onPress={markAllRead} />
    </Screen>
  );
}
