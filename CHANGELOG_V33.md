# Dhani Win V33 Changelog

Release date: July 22, 2026

## User application

- Added local home-category icons and daily check-in artwork.
- Added persisted daily check-in rewards with one claim per user per day.
- Fixed K3 three-dice output and bundled all six dice-face images.
- Added compatible 5D and TRX public result fields and 10-minute game variants.
- Removed the unavailable-domain alert and excluded admin paths from service-worker routing.
- Retained V32 gift timestamps, detailed balance records and deposit-turnover withdrawal lock.

## Admin

- Rebuilt the interface as a responsive purple Dhani Win dashboard.
- Added live issue/countdown controls for WinGo, K3, 5D and TRX variants.
- Added manual SET, safe UNSET and pending-settlement controls.
- Added UPI/USDT rate, address, network, image and deposit/withdraw switches.
- Added demo users, banned-user overview, same-IP scan and daily agent salary.
- Added all requested finance workflow shortcuts and live dashboard statistics.

## Database upgrade

- Fresh site: import `database.sql`.
- Existing V32 site: back up first, then import `database_v33_migration.sql`.
- Existing V31/older site: import `database_v32_migration.sql` and then `database_v33_migration.sql`.
