import { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { EmptyState, Header, Screen, Title } from '../../src/components/ui';
import { RequestCard } from '../../src/components/cards';
import { useApp } from '../../src/store/AppContext';
export default function NewOffers() {
  const { requests, offers, theme } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const items = requests.filter((r) => offers.some((o) => o.requestId === r.id));
  return (
    <Screen scroll={false}>
      <Header title="العروض الجديدة" back={false} />
      <Title sub="تعرض المنصة أول سبعة عروض صالحة لكل طلب">طلبات لديها عروض</Title>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={theme.primary}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 700);
            }}
          />
        }
        contentContainerStyle={{ gap: 12, paddingBottom: 80 }}
      >
        {items.length ? (
          items.map((r) => <RequestCard key={r.id} request={r} />)
        ) : (
          <EmptyState icon="◉" title="لا توجد عروض جديدة" body="ستظهر العروض هنا عند وصولها." />
        )}
      </ScrollView>
    </Screen>
  );
}
