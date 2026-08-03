import type { ServiceKey } from './models';
export const MOCK_OTP = '123456';
export const areas = [
  'الكرادة - بغداد',
  'المنصور - بغداد',
  'الكاظمية - بغداد',
  'أربيل',
  'البصرة',
  'النجف',
];
export const serviceInfo: Record<ServiceKey, { title: string; icon: string; hint: string }> = {
  maintenance: { title: 'صيانة السيارة', icon: '🔧', hint: 'استلم عروضاً من ورش متخصصة' },
  parts: { title: 'قطع الغيار', icon: '⚙️', hint: 'استلم عروضاً من متاجر متخصصة' },
  mobile: { title: 'الخدمة المتنقلة', icon: '🚐', hint: 'فني يصل إلى موقعك' },
  towing: { title: 'كرين', icon: '🚚', hint: 'سحب ونقل المركبة' },
  tires: { title: 'إطارات', icon: '⭕', hint: 'إطارات وتركيب' },
  battery: { title: 'بطاريات', icon: '🔋', hint: 'اختيار وتركيب البطارية' },
  glass: { title: 'استبدال زجاج', icon: '◇', hint: 'زجاج أمامي وجانبي' },
  accessories: { title: 'كماليات', icon: '✦', hint: 'تجهيزات وإكسسوارات' },
};
export const requestStateLabels = {
  receiving: 'استقبال العروض',
  accepted: 'تم قبول عرض',
  waiting: 'بانتظار التواصل',
  ready: 'جاهز للاستلام',
  completed: 'مكتمل',
  cancelled: 'ملغي',
  expired: 'منتهي',
} as const;
export const faultOptions = [
  'المحرك',
  'النظام الكهربائي',
  'التبريد والتكييف',
  'الفرامل',
  'التعليق والتوجيه',
  'الهيكل والصبغ',
  'تغليف وتجليد السيارة',
  'نظام العادم وتزويد المحرك',
  'أعطال أخرى',
];
