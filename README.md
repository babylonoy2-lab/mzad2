# مزاد الصيانة (Mzad Al-Siyana)

Arabic-only RTL marketplace for automotive services and products across Iraq, with Baghdad as the first launch focus. A customer creates a vehicle-linked request, matching approved providers submit offers, and the customer accepts exactly one. Version one is a **non-production simulation using fictional mock data**.

## Repository before foundation

The Git repository was empty apart from a tracked `.gitkeep`. There was no application, package configuration, documentation, or useful implementation to preserve.

## Structure

```text
apps/
  customer-app/       # independent Expo customer application
  provider-app/       # independent Expo provider application
  admin-web/          # independent React + Vite dashboard
packages/
  shared-types/       # domain contracts and statuses
  shared-validation/  # dependency-free validation rules
  shared-config/      # platform-neutral defaults
  shared-utils/       # small generic helpers
  design-tokens/      # portable colors/spacing
  data-access/        # repository interfaces and empty mock implementations
  business-rules/     # tested pure marketplace decisions
docs/                 # product and architecture decisions
supabase/
  migrations/         # placeholder only; no production migrations
  seed/               # placeholder only; no production seed
```

## Requirements and installation

- Node.js 20 or newer
- pnpm 10 or newer (`corepack enable` can provide it)

```bash
pnpm install
```

## Development commands

| Purpose           | Command             |
| ----------------- | ------------------- |
| Customer Expo app | `pnpm customer`     |
| Provider Expo app | `pnpm provider`     |
| Admin dashboard   | `pnpm admin`        |
| Type checking     | `pnpm typecheck`    |
| Linting           | `pnpm lint`         |
| Apply formatting  | `pnpm format`       |
| Check formatting  | `pnpm format:check` |
| Domain tests      | `pnpm test`         |
| All validation    | `pnpm validate`     |

The Expo terminals offer Android, iOS, and web launch options. The Vite dashboard prints its local URL.

## Current status

Each product remains a single minimal Arabic RTL startup shell. Phase 2 adds comprehensive shared entities and Arabic labels, dependency-free validation, pure business rules/tests, repository ports, cloned paginated mock repositories, realistic fictional Arabic fixtures, simulated report data, and finalized product documentation. Light/dark modes are required for future interfaces; the shells are not the final theme.

## Intentionally not implemented

No final UI flow, real authentication/OTP/SMS, Supabase connection or production migration, realtime chat, map/GPS tracking, real banner statistics/push delivery, payment, commission, subscription, production assets, audit log, or secret is included. Mock URLs and phone numbers are fictional. Continue with Phase 3 only when instructed.

## Workspace installation finding

The workspace uses the public npm registry, valid `workspace:*` references, and no repository `.npmrc`, credential, or fabricated lockfile. In the Codex environment, `pnpm install` returned HTTP 403 from the network proxy for the public registry before resolving packages. This is not caused by a custom repository registry. Retry installation normally in an environment allowed to reach `https://registry.npmjs.org/`; never add tokens, disable TLS, or hand-write a lockfile.
