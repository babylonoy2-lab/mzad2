# Implementation plan

## Completed scopes

- **Phase 1:** separate minimal RTL shells and pnpm foundation.
- **Phase 2:** authoritative specification, domain/Arabic labels, dependency-free validation, pure rules/tests, fictional comprehensive fixtures, and replaceable mock repositories. All real integrations and full UI remain absent.

## Recommended Phase 3 (only on instruction)

Build a mock-only application/use-case layer and the smallest customer vertical slice: theme foundation (after brand decision), simulated mandatory registration/legal consent, manual vehicles, configuration-driven request creation, repository-backed paginated offers and pure-rule acceptance. Add accessible Arabic RTL tests and poor-network loading/error/empty states. Keep provider/admin products at their shells except interfaces needed to seed the slice.

Later slices may add provider simulation, responsive administration simulation, support/chat, and notification/banner presentations. Supabase/auth/provider integrations and production migrations require a separate explicitly approved production architecture phase.
