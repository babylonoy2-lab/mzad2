# Confirmed user flows

## Customer

Welcome/how-it-works → accept Terms and Privacy → mandatory name/phone/mock OTP/area registration → manually manage multiple vehicles → home hierarchy defined in the product specification → select vehicle and configurable service → common request plus conditional service data/location/appointment → receive at most seven active offers → compare/contact providers → irrevocably accept one → simulated asynchronous text conversation and progress → completion → review. Phone changes use mock OTP. Deletion waits 48 hours and can be cancelled within that period.

Customers edit requests only before the first offer, cannot manually close reception, and can cancel from every state with written reason. Towing/mobile collect a full written address and optional simulated coordinates. All other services use area.

## Provider

Accept three documents/instructions → one-user/one-branch registration with mock OTP, business data, multiple activities/brands, location and required fictional document uploads → browse while pending → admin approval → receive only immediately distributed matching-area/activity requests → create one editable offer → acceptance without provider reconfirmation → text conversation/progress → either party completes → provider views/replies to rating.

## Lifecycle

`submitted` → `receiving_offers` → `offer_accepted` → `waiting_customer_contact` → `ready_for_pickup` → `completed`. `cancelled` is reachable with a reason from every state; `expired` follows 6h towing, 72h mobile, or 7d default limits. Five days after ready-for-pickup triggers only a simulated reminder. Accepted prices may be changed after inspection without price history or in-app approval.
