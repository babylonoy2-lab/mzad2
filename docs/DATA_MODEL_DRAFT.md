# Shared domain model (simulation)

The implemented model covers `Customer`, account status/deletion, `Provider`, multiple activities/documents/status, `Vehicle`, areas, configurable services/faults, reusable `ServiceRequest` with location/attachments/cancellation, `Offer`, conversations/messages, reviews/replies, complaints/support, notifications/preferences/deliveries, banners/statistics, settings, legal documents, FAQs, and administration report summaries.

Stable English union values are paired with centralized Arabic maps in `shared-types/labels`. Transport time values are ISO strings; money is integer IQD. Customer vehicles are manual text data without image/plate. Location coordinates exist only optionally on requests/providers. Attachments are image-only and requests permit three.

## Invariants represented by pure rules

- Approved provider + matching activity + exact request area, one offer/provider/request, seven active valid offers by default.
- One accepted offer; other active offers become visible `not_accepted` records.
- Request edit before first offer; reason-required cancellation at every state.
- Service-specific expiry; review after completion; reply edit through seven days; deletion cancellation before 48 hours; completion reminder after five days without completion mutation.

Mocks are non-production fixtures and do not imply a database schema. A future database must enforce acceptance and uniqueness atomically and add authorization/RLS. No production migration exists.
