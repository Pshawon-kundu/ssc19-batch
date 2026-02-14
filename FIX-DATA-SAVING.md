# 🛠️ HOW TO FIX "DATA NOT SAVING"

I've updated the backend code to **automatically create** the Google Sheets for you.

Follow these 4 steps exactly to fix everything.

---

## 1️⃣ STEP 1: Update Backend Code

1. Go to your **Google Sheet**: [Click Here](https://docs.google.com/spreadsheets/d/1NzGmUdmO9CnPtKxkpIF6-p9jgRFmdXXVHKgVTGSvszw/)
2. Click **Extensions** → **Apps Script**
3. **DELETE EVERYTHING** in the editor.
4. **PASTE** the new code from: 
   `google-apps-script/Code.gs`

---

## 2️⃣ STEP 2: Run the Setup (New!)

I added a tool to build the sheet for you.

1. In the Apps Script toolbar, find the dropdown menu that says `doPost`.
2. Change it to **`setup`**.
3. Click the **▷ Run** button.
4. It will ask for permission → Click **Review Permissions** → Choose Account → **Advanced** → **Go to (Unsafe)** → **Allow**.
5. Wait for the log to say: `✅ Setup Complete!`

**👉 Now check your Google Sheet tabs - "registrations" and "stats" are created!**

---

## 3️⃣ STEP 3: Deploy Correctly (Critical!)

This is usually where it breaks. Do this exactly:

1. Click **Deploy** (blue button) → **New deployment**.
2. **Select type**: choose **Web App**.
3. **Description**: `v2 fix`
4. **Execute as**: `Me` (This is very important!)
5. **Who has access**: `Anyone` (This is also very important!)
6. Click **Deploy**.
7. **COPY THE WEB APP URL**.

---

## 4️⃣ STEP 4: Update Your React App

1. Open `src/config.ts`
2. Replace `googleScriptUrl` with your **NEW** Web App URL.
   ```typescript
   export const config = {
     googleScriptUrl: 'https://script.google.com/macros/s/AKfycb.../exec', 
     // ... other settings
   }
   ```
3. Save the file.

---

## ✅ Try it now!

1. Go to http://localhost:3000
2. Refresh the page.
3. Submit a registration.
4. Check the Google Sheet - data should be there! 🚀
