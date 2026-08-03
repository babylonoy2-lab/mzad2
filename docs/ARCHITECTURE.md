# Architecture

The pnpm workspace preserves three deployment boundaries: two separate Expo/Expo Router native applications and one responsive React/Vite administration application. Native and DOM UI are never shared. All are Arabic-only RTL and will support application-owned light/dark presentations.

## Shared layers

- `shared-types`: transport-safe entities, English stable values, pagination, and centralized Arabic labels.
- `shared-validation`: dependency-free validation and Iraqi phone normalization.
- `business-rules`: pure marketplace, expiry, acceptance, deletion, banner, and notification decisions with Node tests.
- `data-access`: repository ports, fictional fixtures, and in-memory read repositories.
- `shared-config`, `shared-utils`, `design-tokens`: neutral settings/helpers/tokens.

Dependency direction is UI → use cases/rules → repository ports → mock adapters. Shared packages contain no React, React Native, Expo, DOM, network, or storage imports. Repository results are cloned and lists are pagination-ready. Future Supabase adapters must implement the same ports; production atomic uniqueness and RLS are deferred, with no migration or connection now.

All transport dates are ISO strings, Iraqi-dinar money is integer, IDs are explicit fictional strings, and mocks use `mock://` assets. Version one simulates OTP, delayed chat, push/in-app notifications, maps, banner analytics, and activity. It is not production-ready.

The registry investigation found repository registry resolution is the normal `https://registry.npmjs.org/`, with no repository `.npmrc`, token, or lockfile. The Codex proxy returned HTTP 403 before dependency resolution; no unsafe override or fake lockfile is used.
