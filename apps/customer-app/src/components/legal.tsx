import { Text } from 'react-native';
import { Card, Header, Screen, Title } from './ui';
import { useApp } from '../store/AppContext';
const data = {
  terms: {
    title: 'الشروط والأحكام',
    intro: 'مسودة تجريبية غير قانونية',
    sections: [
      ['استخدام النموذج', 'هذا التطبيق محاكاة محلية لتجربة التدفقات ولا يقدم خدمة فعلية.'],
      ['العروض', 'الأسعار ومقدمو الخدمات بيانات وهمية ولا تنشئ التزاماً.'],
    ],
  },
  privacy: {
    title: 'سياسة الخصوصية',
    intro: 'مسودة تجريبية وليست سياسة إنتاجية',
    sections: [
      ['البيانات المحلية', 'تُحفظ حالة النموذج على الجهاز فقط ولا تتصل بخادم.'],
      ['الموقع والصور', 'كل اختيار للموقع والصور محاكى ولا تُطلب صلاحيات.'],
    ],
  },
  usage: {
    title: 'تعليمات الاستخدام',
    intro: 'إرشادات النموذج التجريبي',
    sections: [
      ['إنشاء طلب', 'اختر مركبة وخدمة، أكمل الحقول ثم راجع الطلب وأرسله محلياً.'],
      ['العروض', 'قارن أول سبعة عروض واقبل عرضاً واحداً فقط.'],
      ['الأمان', 'لا تدخل معلومات حقيقية أو حساسة في النموذج.'],
    ],
  },
  faq: {
    title: 'الأسئلة الشائعة',
    intro: 'إجابات مختصرة',
    sections: [
      ['هل توجد دفعات؟', 'لا، لا توجد دفعات أو عمولات أو اشتراكات.'],
      ['هل الرمز حقيقي؟', 'لا، استخدم الرمز 123456 في المحاكاة.'],
      ['هل يُرسل موقعي؟', 'لا، خيار الموقع محاكى ولا يطلب صلاحية.'],
    ],
  },
} as const;
export function LegalPage({ kind }: { kind: keyof typeof data }) {
  const { theme } = useApp();
  const page = data[kind];
  return (
    <Screen>
      <Header title={page.title} />
      <Title sub={page.intro}>{page.title}</Title>
      <Card>
        <Text style={{ color: theme.warning, textAlign: 'right', fontWeight: '900' }}>
          تنبيه: المحتوى مسودة تجريبية وغير معتمد قانونياً.
        </Text>
      </Card>
      {page.sections.map(([title, body]) => (
        <Card key={title}>
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900', textAlign: 'right' }}>
            {title}
          </Text>
          <Text style={{ color: theme.muted, textAlign: 'right', lineHeight: 26 }}>{body}</Text>
        </Card>
      ))}
    </Screen>
  );
}
