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
  maintenance: { title: 'صيانة السيارة', icon: 'tools', hint: 'استلم عروضاً من ورش متخصصة' },
  parts: { title: 'قطع الغيار', icon: 'car-cog', hint: 'استلم عروضاً من متاجر متخصصة' },
  mobile: { title: 'خدمة متنقلة', icon: 'car-wrench', hint: 'فني يصل إلى موقعك' },
  towing: { title: 'كرين', icon: 'tow-truck', hint: 'سحب ونقل المركبة' },
  tires: { title: 'إطارات', icon: 'tire', hint: 'إطارات وتركيب' },
  battery: { title: 'بطاريات', icon: 'car-battery', hint: 'اختيار وتركيب البطارية' },
  glass: { title: 'استبدال زجاج', icon: 'car-windshield', hint: 'زجاج أمامي وجانبي' },
  accessories: { title: 'كماليات', icon: 'car-seat', hint: 'تجهيزات وإكسسوارات' },
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
