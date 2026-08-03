import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Choice, EmptyState, Header, Screen, Title } from '../../src/components/ui';
import { RequestCard } from '../../src/components/cards';
import { useApp } from '../../src/store/AppContext';
import type { RequestState } from '../../src/models';
export default function History() {
  const { requests, theme } = useApp();
  const [filter, setFilter] = useState<'all' | RequestState>('all');
  const list = filter === 'all' ? requests : requests.filter((r) => r.status === filter);
  return (
    <Screen scroll={false}>
      <Header title="سجل الطلبات" back={false} />
      <Title sub="تبقى الطلبات الملغاة والمنتهية محفوظة في النموذج">كل طلباتك</Title>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 55 }}
        contentContainerStyle={{ gap: 8 }}
      >
        {[
          ['all', 'الكل'],
          ['receiving', 'جارية'],
          ['accepted', 'مقبولة'],
          ['completed', 'مكتملة'],
          ['cancelled', 'ملغاة'],
        ].map(([id, label]) => (
          <View key={id} style={{ minWidth: 90 }}>
            <Choice
              label={label}
              selected={filter === id}
              onPress={() => setFilter(id as typeof filter)}
            />
          </View>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={{ gap: 12, paddingBottom: 80 }}>
        {list.length ? (
          list.map((r) => <RequestCard key={r.id} request={r} />)
        ) : (
          <EmptyState
            icon="clipboard-text-clock-outline"
            title="لا توجد طلبات"
            body="غيّر المرشح أو أنشئ طلباً جديداً."
          />
        )}
      </ScrollView>
      <Text style={{ color: theme.muted, textAlign: 'center' }}>
        اسحب القائمة لمراجعة جميع السجلات التجريبية
      </Text>
    </Screen>
  );
}
