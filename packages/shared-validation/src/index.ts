import type {
  AccountDeletionRequest,
  AdvertisingBanner,
  NotificationTarget,
  Offer,
  Provider,
  ServiceRequest,
  Vehicle,
} from '@mzad/shared-types';

export type ValidationIssue = { field: string; message: string };
export type ValidationResult<T = unknown> =
  | { valid: true; value?: T }
  | { valid: false; issues: ValidationIssue[] };
const valid = <T>(value?: T): ValidationResult<T> =>
  value === undefined ? { valid: true } : { valid: true, value };
const invalid = (...issues: ValidationIssue[]): ValidationResult<never> => ({
  valid: false,
  issues,
});
const required = (value: string) => value.trim().length > 0;
const isoIsValid = (value: string) => !Number.isNaN(Date.parse(value));

export function normalizeIraqiPhone(value: string): string | null {
  const digits = value.replace(/[\s()-]/g, '');
  const local = digits.startsWith('+964')
    ? `0${digits.slice(4)}`
    : digits.startsWith('00964')
      ? `0${digits.slice(5)}`
      : digits.startsWith('964')
        ? `0${digits.slice(3)}`
        : digits;
  return /^07[3-9]\d{8}$/.test(local) ? `+964${local.slice(1)}` : null;
}
export function validateIraqiPhone(value: string): ValidationResult<string> {
  const normalized = normalizeIraqiPhone(value);
  return normalized
    ? valid(normalized)
    : invalid({ field: 'phone', message: 'أدخل رقم هاتف عراقي صحيحاً' });
}
export interface CustomerRegistrationInput {
  name: string;
  phone: string;
  areaId: string;
  otpVerified: boolean;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
}
export function validateCustomerRegistration(input: CustomerRegistrationInput): ValidationResult {
  const issues: ValidationIssue[] = [];
  if (!required(input.name)) issues.push({ field: 'name', message: 'اسم الزبون مطلوب' });
  if (!normalizeIraqiPhone(input.phone))
    issues.push({ field: 'phone', message: 'رقم الهاتف غير صحيح' });
  if (!required(input.areaId)) issues.push({ field: 'areaId', message: 'المنطقة مطلوبة' });
  if (!input.otpVerified)
    issues.push({ field: 'otpVerified', message: 'يجب إكمال التحقق التجريبي' });
  if (!input.acceptedTerms)
    issues.push({ field: 'acceptedTerms', message: 'يجب قبول الشروط والأحكام' });
  if (!input.acceptedPrivacy)
    issues.push({ field: 'acceptedPrivacy', message: 'يجب قبول سياسة الخصوصية' });
  return issues.length ? { valid: false, issues } : valid();
}
export type ProviderRegistrationInput = Pick<
  Provider,
  | 'responsiblePersonName'
  | 'businessName'
  | 'phone'
  | 'phoneVerified'
  | 'activityIds'
  | 'areaId'
  | 'fullAddress'
  | 'workingHours'
  | 'businessImageUrls'
> & {
  logoUrl?: string;
  identityDocument: boolean;
  practiceLicense: boolean;
  businessLocationImages: string[];
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  acceptedUsageInstructions: boolean;
};
export function validateProviderRegistration(input: ProviderRegistrationInput): ValidationResult {
  const issues: ValidationIssue[] = [];
  for (const [field, value] of [
    ['responsiblePersonName', input.responsiblePersonName],
    ['businessName', input.businessName],
    ['areaId', input.areaId],
    ['fullAddress', input.fullAddress],
  ] as const)
    if (!required(value)) issues.push({ field, message: 'هذا الحقل مطلوب' });
  if (!normalizeIraqiPhone(input.phone))
    issues.push({ field: 'phone', message: 'رقم الهاتف غير صحيح' });
  if (!input.phoneVerified)
    issues.push({ field: 'phoneVerified', message: 'التحقق التجريبي مطلوب' });
  if (!input.activityIds.length)
    issues.push({ field: 'activityIds', message: 'اختر نشاطاً واحداً على الأقل' });
  if (!input.workingHours.length)
    issues.push({ field: 'workingHours', message: 'ساعات العمل مطلوبة' });
  if (!input.businessImageUrls.length || !input.logoUrl || !input.businessLocationImages.length)
    issues.push({ field: 'images', message: 'صور النشاط والشعار والموقع مطلوبة' });
  if (!input.identityDocument || !input.practiceLicense)
    issues.push({ field: 'documents', message: 'وثائق الهوية وإجازة الممارسة مطلوبة' });
  if (!input.acceptedTerms || !input.acceptedPrivacy || !input.acceptedUsageInstructions)
    issues.push({ field: 'agreements', message: 'يجب قبول جميع الاتفاقيات' });
  return issues.length ? { valid: false, issues } : valid();
}
export function validateVehicle(input: Omit<Vehicle, 'id' | 'createdAt'>): ValidationResult {
  const issues: ValidationIssue[] = [];
  for (const [field, value] of [
    ['customerId', input.customerId],
    ['manufacturer', input.manufacturer],
    ['model', input.model],
    ['engineSize', input.engineSize],
  ] as const)
    if (!required(value)) issues.push({ field, message: 'هذا الحقل مطلوب' });
  const year = new Date().getUTCFullYear();
  if (input.manufacturingYear < 1886 || input.manufacturingYear > year + 1)
    issues.push({ field: 'manufacturingYear', message: 'سنة الصنع غير صحيحة' });
  return issues.length ? { valid: false, issues } : valid();
}
export function validateRequestAttachments(
  attachments: ServiceRequest['attachments'],
): ValidationResult {
  return attachments.length <= 3
    ? valid()
    : invalid({ field: 'attachments', message: 'الحد الأقصى ثلاث صور' });
}
export function validateRequest(
  input: Omit<ServiceRequest, 'id' | 'status' | 'submittedAt' | 'expiresAt'>,
): ValidationResult {
  const issues: ValidationIssue[] = [];
  if (
    !required(input.customerId) ||
    !required(input.vehicleId) ||
    !required(input.serviceCategoryId)
  )
    issues.push({ field: 'identity', message: 'الزبون والمركبة والخدمة مطلوبة' });
  if (!required(input.description))
    issues.push({ field: 'description', message: 'وصف الطلب مطلوب' });
  if (!required(input.location.areaId))
    issues.push({ field: 'location.areaId', message: 'المنطقة مطلوبة' });
  const attachments = validateRequestAttachments(input.attachments);
  if (!attachments.valid) issues.push(...attachments.issues);
  return issues.length ? { valid: false, issues } : valid();
}
export function validateOffer(
  input: Omit<Offer, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
): ValidationResult {
  const amounts =
    input.price.kind === 'fixed'
      ? [input.price.amountIqd]
      : [input.price.minimumIqd, input.price.maximumIqd];
  const issues = amounts.some((amount) => !Number.isInteger(amount) || amount < 0)
    ? [{ field: 'price', message: 'السعر يجب أن يكون مبلغاً صحيحاً بالدينار' }]
    : [];
  if (input.price.kind === 'estimated' && input.price.minimumIqd > input.price.maximumIqd)
    issues.push({ field: 'price', message: 'الحد الأدنى أكبر من الحد الأعلى' });
  return issues.length ? { valid: false, issues } : valid();
}
export function validateCancellationReason(reason: string): ValidationResult {
  return required(reason)
    ? valid()
    : invalid({ field: 'reason', message: 'سبب الإلغاء المكتوب مطلوب' });
}
export function validateRating(rating: number): ValidationResult {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5
    ? valid()
    : invalid({ field: 'rating', message: 'التقييم من نجمة إلى خمس نجوم' });
}
export function validateBannerDates(
  banner: Pick<AdvertisingBanner, 'startsAt' | 'endsAt'>,
): ValidationResult {
  return isoIsValid(banner.startsAt) &&
    isoIsValid(banner.endsAt) &&
    Date.parse(banner.startsAt) < Date.parse(banner.endsAt)
    ? valid()
    : invalid({ field: 'dates', message: 'تاريخا الإعلان غير صحيحين' });
}
export function validateNotificationTarget(target: NotificationTarget): ValidationResult {
  return target.kind === 'selected_users' && !target.recipients.length
    ? invalid({ field: 'target', message: 'اختر مستخدماً واحداً على الأقل' })
    : valid();
}
export function validateAccountDeletionRequest(
  input: Pick<
    AccountDeletionRequest,
    'customerId' | 'reason' | 'requestedAt' | 'scheduledDeletionAt'
  >,
): ValidationResult {
  return required(input.customerId) &&
    required(input.reason) &&
    isoIsValid(input.requestedAt) &&
    Date.parse(input.scheduledDeletionAt) > Date.parse(input.requestedAt)
    ? valid()
    : invalid({ field: 'deletionRequest', message: 'طلب حذف الحساب غير مكتمل' });
}
