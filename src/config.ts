// ============================================
// PAYMENT CONFIGURATION
// ============================================
//
// UPDATE THESE WITH YOUR ACTUAL PAYMENT NUMBERS
// Format: 11-digit Bangladeshi mobile number (01XXXXXXXXX)

export const PAYMENT_NUMBERS = {
  bkash: "01717529860",
  nagad: "01717529860",
  rocket: "01717529860",
};

// ============================================
// GOOGLE APPS SCRIPT CONFIGURATION
// ============================================
//
// After deploying your Google Apps Script:
// 1. Copy the Web App URL
// 2. Paste it below (replace YOUR_GOOGLE_SCRIPT_URL_HERE)

export const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzbiSNe1Q7qvb4rFGTELCriFj2t1U2L7ynpuLFrOkh2LOzONaMa4dtLUszqk1JUy5U8Bg/exec";

// Example:
// export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';

// ============================================
// PACKAGE PRICING (BDT)
// ============================================

export const PACKAGE_PRICES = {
  "iftar-only": 300,
  "iftar-jersey": 700,
  "iftar-jersey-seheri": 1000, // Change to 1000 if needed
  "jersey-only": 500,
} as const;

// ============================================
// EVENT DETAILS
// ============================================

export const EVENT_INFO = {
  title: "SSC 2019 Batch Iftar Party",
  date: "27th Ramadan",
  location: "School Field",
  year: "Ramadan 1445",
};

// ============================================
// STATS REFRESH INTERVAL
// ============================================
// How often to refresh live counters (in milliseconds)
// 30000 = 30 seconds

export const STATS_REFRESH_INTERVAL = 30000;

// ============================================
// EXPORT COMBINED CONFIG
// ============================================

export const config = {
  googleScriptUrl: GOOGLE_SCRIPT_URL,
  statsRefreshInterval: STATS_REFRESH_INTERVAL,
  packagePrices: PACKAGE_PRICES,
  paymentNumbers: PAYMENT_NUMBERS,
  event: EVENT_INFO,
} as const;
