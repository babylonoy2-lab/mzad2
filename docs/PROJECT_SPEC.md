# Authoritative product specification

## Product and release boundary

**مزاد الصيانة** serves all Iraq, launching first with primary focus on Baghdad. It has an Arabic-only, full-RTL customer mobile app, separate provider mobile app, and responsive administration web dashboard. All three support light and dark modes, share only platform-neutral domain packages, and will eventually use one shared backend/database.

Version one is a complete **mock-data simulation**, is not production-ready, and contains no Supabase connection. OTP, messaging, maps, notifications, banner statistics, and application activity are simulated. There is no online payment, commission, subscription, or other monetization in version one.

## Customer account and vehicles

Registration is mandatory and requires name, Iraqi phone, mock OTP, governorate/area, Terms acceptance, and Privacy acceptance. There is no profile image or required coordinates. Multiple-device sign-in is allowed. A phone change requires another mock OTP. Deletion waits 48 hours and is reversible during that window; deleted-account data may be retained six months. Data download is unavailable in version one.

Customers can store multiple manually entered vehicles. Manufacturer, model, year, engine size and fuel type are required; VIN and notes are optional. A request must select a vehicle. There is no vehicle image, plate number, fixed customer brand/model selector, or maintenance reminder. Future fields show examples such as Toyota/Kia/Ford, Camry/Sorento, and 2.0/3.0.

## Services and requests

The configurable customer services are maintenance/repair, spare parts, mobile service, towing/transport, tires, batteries, car glass, and accessories—**not car washing**. The future home shows a rotating banner; large maintenance card right and parts card left; remaining services in a horizontal strip; new offers, history, settings, and top notification icon. “How it works” appears only in welcome.

One reusable request model provides conditional fields. Maintenance permits multiple configurable fault categories plus description and up to three optional images; no video/voice. Categories include unknown, engine, electrical, cooling/AC, brakes, suspension/steering, transmission, inspection/diagnostics, periodic maintenance, painting/body, wrapping/upholstery, performance exhaust/engine tuning, and other.

Area defaults from the account and can change per request. Normal requests need an area only; towing/mobile need written address and optional coordinates (simulated map). There is no customer radius. Preferred appointment is optional. Parts options are installation included, parts only, offers with/without parts, or unknown.

## Providers and distribution

One provider app supports all types. Registration requires mock OTP and all three agreements; responsible person/business names; multiple activities; area, full address, optional location; hours; business images/logo; identity, practice licence, and location images; plus supported vehicle brands. A provider has one branch/user, no employees/subscription/availability toggle/radius/category pause. Phone change needs mock OTP. Pending providers may browse but cannot receive actionable requests or offer.

Submitted requests distribute immediately without admin approval to **approved** providers matching activity and governorate/city. At seven valid offers (admin-configurable), unseen requests disappear for providers who have not offered; stored offers remain. Towing expires in 6 hours, mobile service in 72 hours, and other requests in 7 days. Customers cannot close reception; may edit only before the first offer; may cancel in every state with written reason.

## Offers, fulfillment, chat, and reviews

One provider offer per request; editable until any offer acceptance. It supports fixed/estimated price, appointment, duration, parts inclusion, warranty, message, images, and conditions. Acceptance needs no provider confirmation and cannot be undone. The accepted offer becomes accepted; others remain customer-visible as not accepted and inactive for providers. Cancellation with reason remains possible.

Customers may see provider business/profile/contact actions before and after acceptance; providers cannot see private customer contact before acceptance. Core statuses are submitted, receiving offers, offer accepted, waiting customer contact, ready for pickup, completed, cancelled, expired. Either party can perform permitted completion actions. An inspected price may change without in-app approval, special notification, or price history. After five unconfirmed days send a simulated reminder—never auto-complete.

Request chat is delayed asynchronous text only: no images after acceptance, realtime service, or Supabase Realtime. Reviews require completion, use 1–5 stars and optional comment, are customer-editable, allow one provider reply editable for seven days, and may be hidden/deleted by administration.

## Support, administration, advertising, and notification

Simulation support includes complaint form/conversation, FAQ, usage instructions, and user/provider reports linked as applicable. There is one administrator role, no audit logs, and future Excel/PDF exports. Administration controls users, verification, marketplace records, reviews/support, configurable catalogs/geography/settings, legal/app text, banners, and immediate/scheduled notifications.

Only admins create banners. One is shown at a time while eligible banners rotate every few seconds by order. Targets are customer/provider/both and optional user type; all counts are simulated. Notifications can target all/users by type, one account, provider activity, area, or selected users; use in-app/simulated push delivery and preferences.
