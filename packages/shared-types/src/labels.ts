import type {
  ComplaintReason,
  CustomerAccountStatus,
  FaultCode,
  FuelType,
  NotificationType,
  OfferStatus,
  ProviderStatus,
  RequestStatus,
  ServiceCode,
  SparePartOption,
} from './index.ts';

export const serviceLabels: Record<ServiceCode, string> = {
  maintenance: 'صيانة وتصليح السيارات',
  spare_parts: 'قطع الغيار',
  mobile_service: 'خدمة متنقلة',
  towing: 'سحب ونقل السيارات',
  tires: 'الإطارات',
  batteries: 'البطاريات',
  car_glass: 'زجاج السيارات',
  accessories: 'الإكسسوارات',
};
export const faultLabels: Record<FaultCode, string> = {
  unknown: 'لا أعرف نوع العطل',
  engine: 'المحرك',
  electrical: 'النظام الكهربائي',
  cooling_ac: 'التبريد والتكييف',
  brakes: 'الفرامل',
  suspension_steering: 'التعليق والتوجيه',
  transmission: 'ناقل الحركة',
  inspection_diagnostics: 'الفحص والتشخيص',
  periodic_maintenance: 'الصيانة الدورية',
  painting_body: 'الصبغ وتصليح الهيكل',
  wrapping_upholstery: 'تغليف وتجليد السيارة',
  exhaust_performance: 'نظام العادم وتزويد المحرك للسيارات الرياضية',
  other: 'عطل آخر',
};
export const requestStatusLabels: Record<RequestStatus, string> = {
  submitted: 'تم الإرسال',
  receiving_offers: 'استقبال العروض',
  offer_accepted: 'تم قبول العرض',
  waiting_customer_contact: 'بانتظار تواصل الزبون',
  ready_for_pickup: 'جاهز للاستلام',
  completed: 'مكتمل',
  cancelled: 'ملغي',
  expired: 'منتهي',
};
export const offerStatusLabels: Record<OfferStatus, string> = {
  active: 'نشط',
  accepted: 'مقبول',
  not_accepted: 'غير مقبول',
  withdrawn: 'مسحوب',
  expired: 'منتهي',
};
export const providerStatusLabels: Record<ProviderStatus, string> = {
  pending: 'بانتظار الموافقة',
  approved: 'معتمد',
  rejected: 'مرفوض',
  temporarily_suspended: 'موقوف مؤقتاً',
  permanently_suspended: 'موقوف نهائياً',
};
export const customerStatusLabels: Record<CustomerAccountStatus, string> = {
  active: 'نشط',
  temporarily_suspended: 'موقوف مؤقتاً',
  permanently_suspended: 'موقوف نهائياً',
  deletion_pending: 'بانتظار الحذف',
  deleted: 'محذوف',
};
export const sparePartOptionLabels: Record<SparePartOption, string> = {
  parts_with_installation: 'قطع مع التركيب',
  parts_only: 'قطع فقط',
  offers_with_or_without_parts: 'استلام عروض مع القطع وبدونها',
  unknown: 'لا أعرف',
};
export const fuelTypeLabels: Record<FuelType, string> = {
  petrol: 'بنزين',
  diesel: 'ديزل',
  hybrid: 'هجين',
  electric: 'كهربائي',
  other: 'أخرى',
};
export const notificationTypeLabels: Record<NotificationType, string> = {
  request_update: 'تحديث الطلب',
  new_offer: 'عرض جديد',
  message: 'رسالة',
  completion_reminder: 'تذكير إكمال',
  administration: 'رسالة الإدارة',
  marketing: 'إعلان',
};
export const complaintReasonLabels: Record<ComplaintReason, string> = {
  service_quality: 'جودة الخدمة',
  provider_conduct: 'سلوك مقدم الخدمة',
  customer_conduct: 'سلوك الزبون',
  offer_mismatch: 'العرض غير مطابق',
  abusive_content: 'محتوى مسيء',
  other: 'سبب آخر',
};
