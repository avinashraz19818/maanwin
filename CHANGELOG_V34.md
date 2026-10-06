# Dhani Win V34 Changelog

- Repaired manual admin seed/reset so it works even when legacy database ID 1 belongs to another account.
- Repaired the fresh auto-installer user schema so its administrator seed includes the required first-login password column.
- Resolved all 720 local assets referenced by the active frontend graph, including bottom navigation, wheel artwork, theme hash aliases and compatible legacy image names.
- Added 5D issue-route normalization and visibility rules for both compiled timer skins.
- Reconnected every local Live Support entry to Self Service Center and replaced missing service icons.
- Added authenticated work-order fields, history, detail, comments, uploads and bank-list compatibility.
- Added recursive direct/team metrics, dated summaries, three-level bet commission posting and commission claim settlement.
- Corrected invite-wheel prize payload, avatars, spin transaction and cash-out/turnover checks.
- Added official third-party provider configuration, safe disabled fallback, HTTPS host validation, launch sessions and signed idempotent wallet callbacks.
- Added provider management and expanded system-health coverage to the responsive admin panel.
- Added V34 manual migration, deployment guide and regression checks.

## Final requested fixes
- Third-party games without a configured provider now show “Contact your API provider”.
- Invitation wheel now uses a ₹500 target and opens the first gift at ₹450+; later spins are capped at the remaining target amount.
- Lottery gross winnings now have 2% tax deducted (₹100 at 2x credits ₹196).
- Admin author label changed to “Made BY Developer Boy”.
