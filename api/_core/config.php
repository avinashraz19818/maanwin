<?php
// ===============================
// Dhani Win Backend Config
// cPanel MySQL details yaha set hain.
// AUTO_INSTALL_TABLES=true hone par pehli API request par tables automatic create/seed ho jayengi.
// ===============================

define('DB_HOST', getenv('DW_DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DW_DB_NAME') ?: 'club532583_maanwin');
define('DB_USER', getenv('DW_DB_USER') ?: 'club532583_maanwin');
define('DB_PASS', getenv('DW_DB_PASS') ?: 'club532583_maanwin');

define('AUTO_INSTALL_TABLES', true);
define('AUTO_INSTALL_VERSION', '2026_07_22_v34_support_team_wheel');

define('APP_TENANT_ID', 6007);
define('APP_CURRENCY', 'INR');
define('APP_CURRENCY_SIGN', '₹');
define('APP_SECRET', getenv('DW_APP_SECRET') ?: 'b887fd8e108ea8bdd2587747c6cc1eec91806544edb76abe99d9ec703d8a23ad');
define('APP_TIMEZONE', 'Asia/Kolkata');

// true = project/demo virtual wallet only. Real-money payment gateway/live settlement connected nahi hai.
define('DEMO_MODE', true);

@date_default_timezone_set(APP_TIMEZONE);
