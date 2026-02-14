# 🔄 PROJECT RESET & FIX GUIDE

We are doing a clean reset of the connection to fix the blocking issues.

---

## 1️⃣ STEP 1: Apps Script (Backend) - CLEAN INSTALL

1.  Open your **Google Sheet** → **Extensions** → **Apps Script**.
2.  **Delete ALL code** currently there.
3.  **Paste** the fresh code from `google-apps-script/Code.gs` (I just updated it).
4.  **Save** (Ctrl+S).

## 2️⃣ STEP 2: Deploy (THE MOST CRITICAL STEP)

**You MUST create a NEW VERSION.**

1.  Click **Deploy** (Blue button) → **Manage Deployments**.
2.  Click the **Edit (Pencil)** icon.
3.  **Version**: Select **New version** (dropdown).
4.  **Execute as**: **Me**.
5.  **Who has access**: **Anyone**.
6.  Click **Deploy**.

**👉 CHECK THE URL:**
*   Does the URL look like the one in `src/config.ts`?
*   If **YES**: Good.
*   If **NO**: Copy the new URL and update `src/config.ts`.

## 3️⃣ STEP 3: Verify Frontend

I fixed a bug in `src/api.ts` where your URL was being blocked by mistake.

1.  Go to `c:\Users\MT\Desktop\ifter`.
2.  Stop the server (`Ctrl+C`).
3.  Start it again: `npm run dev`.
4.  Open http://localhost:3000.
5.  **Hard Refresh** (Ctrl+F5) to clear any browser caches.

## 4️⃣ STEP 4: Test It

1.  Look at the "Total Registered" counter. Is it loading? (Not 0?)
2.  Try to Submit.

This reset should clear the "Missing Header" and blocking errors.
