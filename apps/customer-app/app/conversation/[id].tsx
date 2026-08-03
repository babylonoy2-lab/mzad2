import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Card, EmptyState, Header, Screen, Title } from '../../src/components/ui';
import { providers, useApp } from '../../src/store/AppContext';
export default function Conversation() {
  const { id, providerId } = useLocalSearchParams<{ id: string; providerId?: string }>();
  const { theme, messages, sendMessage } = useApp();
  const actualProvider = providerId ?? 'support';
  const provider = providers.find((p) => p.id === actualProvider);
  const [text, setText] = useState('');
  const list = messages.filter((m) => m.requestId === id && m.providerId === actualProvider);
  const send = () => {
    if (!text.trim()) return;
    sendMessage(id, actualProvider, text.trim());
    setText('');
  };
  return (
    <Screen scroll={false}>
      <Header title={id === 'support' ? 'محادثة الدعم' : 'اسأل مقدم الخدمة'} />
      <Title sub={`سياق الطلب: ${id}`}>{provider?.name ?? 'الدعم التجريبي'}</Title>
      <View style={{ flex: 1, gap: 10 }}>
        {list.length ? (
          list.map((m) => (
            <View
              key={m.id}
              style={{
                alignSelf: m.mine ? 'flex-start' : 'flex-end',
                maxWidth: '82%',
                backgroundColor: m.mine ? theme.primary : theme.surface,
                borderColor: theme.border,
                borderWidth: 1,
                borderRadius: 16,
                padding: 12,
              }}
            >
              <Text style={{ color: m.mine ? theme.background : theme.text, textAlign: 'right' }}>
                {m.text}
              </Text>
              <Text style={{ color: m.mine ? theme.background : theme.muted, fontSize: 11 }}>
                {m.time}
              </Text>
            </View>
          ))
        ) : (
          <EmptyState
            icon="✉"
            title="لا توجد رسائل"
            body="ابدأ محادثة نصية محاكية. لا توجد ملفات أو اتصال فوري."
          />
        )}
      </View>
      <Card>
        <View style={{ flexDirection: 'row-reverse', gap: 8, alignItems: 'center' }}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="اكتب رسالتك"
            placeholderTextColor={theme.muted}
            style={{ flex: 1, minHeight: 48, color: theme.text, textAlign: 'right' }}
          />
          <Pressable
            onPress={send}
            style={{
              width: 52,
              height: 48,
              borderRadius: 14,
              backgroundColor: theme.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: theme.background, fontWeight: '900' }}>إرسال</Text>
          </Pressable>
        </View>
      </Card>
    </Screen>
  );
}
