# Administration modules

Version one has one administrator role and a future responsive desktop/mobile dashboard. No multiple permission levels or audit logs are included.

- Customers/providers: view; temporary/permanent suspension; approval/rejection and document reason.
- Marketplace: view every request/offer; edit, close, or cancel requests; filter accepted/completed/cancelled/expired states.
- Trust/support: reviews (hide/delete abuse), complaints, reports, and support conversations.
- Catalog/geography: add/remove/activate/deactivate/reorder services and fault categories; provider vehicle-brand reference lists; Iraq governorates/areas.
- Configuration/content: expiry settings, maximum offers, general/app text, Terms, Privacy, usage instructions, and FAQ.
- Advertising: admin-only customer/provider/both targets, eligibility, ordering/rotation, and simulated counts.
- Notifications: immediate/scheduled targeted in-app and simulated push, preferences, delivery/open summaries.
- Reports: all metrics in `AdminReportSummary`; future Excel/PDF export, no charts/pages in Phase 2.

All administration operations in version one act only on mock repositories. Destructive operations and bulk communications should later require confirmation and backend authorization.
