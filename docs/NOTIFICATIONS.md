# Simulated notifications

Models cover in-app and simulated-push channels, immediate/scheduled status, preferences by notification type, per-recipient delivery, and open/read timestamps. Admin targets are all users/customers/providers, one customer/provider, provider activity, area, and explicit selected users. Pure selection resolves fictional customers/providers; empty selected-user targets fail validation.

Customers/providers may disable selected types. Version one stores mock deliveries/opens only: there is no token, SDK, external provider, background job, realtime delivery, key, or network call. Retry/consent/provider mechanics belong to a later production design.
