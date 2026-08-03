# Permanent development rules

- Every user-facing interface is Arabic-only, must render in full RTL, and must support light and dark modes.
- Keep `apps/customer-app` and `apps/provider-app` as genuinely separate Expo applications.
- Keep `apps/admin-web` as a separate React web administration dashboard.
- Do not implement payments, customer in-app payments, commissions, or subscriptions unless the product scope is explicitly changed.
- The first version is a non-production simulation. Use abstractions and mock data only: no real backend, Supabase connection, OTP, SMS, push provider, maps, realtime chat, or production migrations.
- Never commit credentials, API keys, tokens, production identifiers, or other secrets.
- Centralize shared types, validation, configuration, utilities, and business rules; avoid duplicated pages and logic without creating needless abstractions.
- Keep the customer application lightweight: avoid large libraries/assets, video, unnecessary permissions, and eager data loading.
- Do not invent unresolved product or policy decisions. Record them in `docs/OPEN_QUESTIONS.md`.
- Keep platform-specific UI in its application. Shared packages must stay platform-neutral.
- Keep stable English domain values and centralized Arabic label maps; do not duplicate business rules in UI code.
- Run `pnpm validate` before completing every code task and address errors caused by the change.
