import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import {
  Button,
  Card,
  ConfirmModal,
  EmptyState,
  Field,
  Header,
  Icon,
  Screen,
  StatusBadge,
  Title,
  type IconName,
} from '../../src/components/ui';
import { OfferCard } from '../../src/components/cards';
import { requestStateLabels, serviceInfo } from '../../src/constants';
import { providers, useApp } from '../../src/store/AppContext';
export default function RequestDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme, requests, vehicles, offers, cancelRequest } = useApp();
  const request = requests.find((r) => r.id === id);
  const [cancel, setCancel] = useState(false);
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  if (!request)
    return (
      <Screen>
        <Header title="تفاصيل الطلب" />
        <EmptyState title="الطلب غير موجود" body="قد يكون السجل التجريبي قد أُعيد ضبطه." />
      </Screen>
    );
  const vehicle = vehicles.find((v) => v.id === request.vehicleId);
  const list = offers.filter((o) => o.requestId === request.id).slice(0, 7);
  const accepted = list.find((o) => o.id === request.acceptedOfferId);
  const stages = [
    'تم إرسال الطلب',
    'استلام العروض',
    'قبول العرض',
    'بانتظار التواصل',
    'جاهز للاستلام',
    'اكتمل الطلب',
  ];
  const currentStage =
    request.status === 'completed'
      ? 5
      : request.status === 'ready'
        ? 4
        : request.status === 'waiting'
          ? 3
          : request.status === 'accepted'
            ? 2
            : list.length
              ? 1
              : 0;
  return (
    <Screen>
      <Header title="تفاصيل الطلب" />
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title>{request.id}</Title>
        <StatusBadge
          text={requestStateLabels[request.status]}
          tone={
            request.status === 'cancelled'
              ? 'error'
              : request.status === 'completed'
                ? 'success'
                : 'info'
          }
        />
      </View>
      <Card>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 9 }}>
          <Icon
            name={serviceInfo[request.service].icon as IconName}
            size={23}
            color={theme.primary}
          />
          <Text style={{ color: theme.text, fontSize: 19, fontWeight: '700', textAlign: 'right' }}>
            {serviceInfo[request.service].title}
          </Text>
        </View>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>
          {vehicle?.maker} {vehicle?.model} • {request.createdAt}
        </Text>
        <Text style={{ color: theme.text, textAlign: 'right', lineHeight: 25 }}>
          {request.description}
        </Text>
        {Object.entries(request.details).map(([k, v]) => (
          <Text key={k} style={{ color: theme.muted, textAlign: 'right' }}>
            {k}: {v}
          </Text>
        ))}
        <Text style={{ color: theme.muted, textAlign: 'right' }}>
          {request.area}
          {request.address ? ` • ${request.address}` : ''}
        </Text>
        <Text style={{ color: theme.muted, textAlign: 'right' }}>
          {request.images.length ? `${request.images.length} صور تجريبية` : 'لا توجد صور'}
        </Text>
      </Card>
      {request.cancellationReason ? (
        <Card>
          <Text style={{ color: theme.error, fontWeight: '700', textAlign: 'right' }}>
            سبب الإلغاء
          </Text>
          <Text style={{ color: theme.text, textAlign: 'right' }}>
            {request.cancellationReason}
          </Text>
        </Card>
      ) : null}
      <Title>مسار الطلب</Title>
      <Card>
        {stages.map((s, i) => (
          <View
            key={s}
            style={{ flexDirection: 'row-reverse', gap: 10, alignItems: 'center', minHeight: 34 }}
          >
            <Icon
              name={
                i < currentStage
                  ? 'check-circle'
                  : i === currentStage
                    ? 'record-circle'
                    : 'circle-outline'
              }
              size={19}
              color={i <= currentStage ? theme.primary : theme.border}
            />
            <Text
              style={{
                color: i === currentStage ? theme.text : theme.textSecondary,
                textAlign: 'right',
                fontWeight: i === currentStage ? '700' : '400',
              }}
            >
              {s}
            </Text>
          </View>
        ))}
        {request.status === 'cancelled' ? (
          <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 8 }}>
            <Icon name="close-circle-outline" size={19} color={theme.error} />
            <Text style={{ color: theme.error, textAlign: 'right' }}>
              ألغي الطلب مع الاحتفاظ بالسجل
            </Text>
          </View>
        ) : null}
      </Card>
      {accepted ? (
        <Button
          title="فتح المحادثة مع مقدم الخدمة"
          onPress={() =>
            router.push(`/conversation/${request.id}?providerId=${accepted.providerId}`)
          }
        />
      ) : list.length ? (
        <Button
          title="اسأل مقدم خدمة عن عرضه"
          kind="secondary"
          onPress={() =>
            router.push(`/conversation/${request.id}?providerId=${list[0]?.providerId}`)
          }
        />
      ) : null}
      {request.status === 'completed' ? (
        <Button
          title={request.rated ? 'تعديل تقييمك' : 'قيّم مقدم الخدمة'}
          onPress={() => router.push(`/rating/${request.id}`)}
        />
      ) : null}
      <Title
        sub={
          list.length
            ? 'لا يمكن تعديل الطلب بعد وصول أول عرض. يمكنك الإلغاء دائماً.'
            : 'يمكن تعديل الطلب قبل وصول أول عرض.'
        }
      >
        العروض ({list.length})
      </Title>
      {list.length ? (
        list.map((o) => (
          <OfferCard
            key={o.id}
            offer={o}
            provider={providers.find((p) => p.id === o.providerId)!}
          />
        ))
      ) : (
        <EmptyState
          icon="tag-multiple-outline"
          title="بانتظار العروض"
          body="وُزع الطلب فوراً على مقدمي الخدمة المطابقين."
          action={{
            title: 'تعديل الطلب',
            onPress: () =>
              router.push(`/request/new?service=${request.service}&edit=${request.id}`),
          }}
        />
      )}
      {request.status !== 'cancelled' ? (
        <Button title="إلغاء الطلب" kind="danger" onPress={() => setCancel(true)} />
      ) : null}
      <Button
        title="تقديم شكوى مرتبطة"
        kind="text"
        onPress={() => router.push(`/complaints/new?requestId=${request.id}`)}
      />
      <ConfirmModal
        visible={cancel}
        title="إلغاء الطلب"
        body="يمكن الإلغاء في أي حالة، لكن كتابة السبب إلزامية."
        danger
        confirmText="تأكيد الإلغاء"
        onClose={() => setCancel(false)}
        onConfirm={() => {
          if (!reason.trim()) {
            setError('اكتب سبب الإلغاء');
            return;
          }
          cancelRequest(request.id, reason.trim());
          setCancel(false);
        }}
      >
        <Field
          label="سبب الإلغاء *"
          multiline
          value={reason}
          onChangeText={(v) => {
            setReason(v);
            setError('');
          }}
          error={error}
        />
      </ConfirmModal>
    </Screen>
  );
}
