# 🚀 Deployment Guide - SSC 2019 Iftar Registration System

This guide will walk you through deploying your event registration system from start to finish.

---

## 📋 Prerequisites

- Google Account
- Node.js installed (v18 or higher)
- Git (optional, for version control)

---

## Part 1: Google Sheets Setup

### Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Rename it to **"SSC 2019 Iftar Registration"**

### Step 2: Set Up Sheets

#### Create "registrations" Sheet

1. Rename "Sheet1" to **"registrations"**
2. In row 1, add these column headers (A1 to L1):

   | A | B | C | D | E | F | G | H | I | J | K | L |
   |---|---|---|---|---|---|---|---|---|---|---|---|
   | Timestamp | Full Name | Phone | Package | Jersey Size | Jersey Name | Jersey Number | Payment Method | Transaction ID | Last 2 Digits | Amount | Status |

3. **Format the header row:**
   - Select row 1
   - Background color: Green (#34D399)
   - Text color: White
   - Bold text

#### Create "stats" Sheet

1. Click the **+** button at the bottom to add a new sheet
2. Rename it to **"stats"**
3. Add the following data:

   | A | B |
   |---|---|
   | **Metric** | **Value** |
   | total_students | 0 |
   | total_money | 0 |

4. **Format the header row:**
   - Select row 1
   - Background color: Orange (#F59E0B)
   - Text color: White
   - Bold text

---

## Part 2: Google Apps Script Deployment

### Step 1: Open Apps Script Editor

1. In your Google Sheet, click **Extensions → Apps Script**
2. You'll see a new tab with `Code.gs` file

### Step 2: Add the Backend Code

1. Delete any existing code in `Code.gs`
2. Copy the entire contents of `google-apps-script/Code.gs` from your project
3. Paste it into the Apps Script editor
4. Click the **💾 Save** icon (or Ctrl+S)
5. Name your project: **"SSC Registration API"**

### Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the **⚙️ gear icon** next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: `Event Registration API`
   - **Execute as**: `Me (your@email.com)`
   - **Who has access**: `Anyone`
5. Click **Deploy**

### Step 4: Authorize the Script

1. Click **Authorize access**
2. Select your Google account
3. You'll see a warning: "Google hasn't verified this app"
4. Click **Advanced**
5. Click **Go to SSC Registration API (unsafe)**
6. Click **Allow**

### Step 5: Copy the Web App URL

1. After authorization, you'll see a **Web app URL**
2. **IMPORTANT**: Copy this entire URL - it should look like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
3. **Save this URL** - you'll need it in the next step!

---

## Part 3: Frontend Configuration

### Step 1: Update Google Script URL

1. Open `src/config.ts` in your project
2. Find this line:
   ```typescript
   googleScriptUrl: 'YOUR_GOOGLE_SCRIPT_URL_HERE',
   ```
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your actual URL:
   ```typescript
   googleScriptUrl: 'https://script.google.com/macros/s/AKfycbx.../exec',
   ```

### Step 2: Update Payment Numbers

In the same `src/config.ts` file, update the payment numbers:

```typescript
paymentNumbers: {
  bkash: '01712-345678',  // ← Replace with your actual bKash number
  nagad: '01812-345678',  // ← Replace with your actual Nagad number
  rocket: '01912-345678', // ← Replace with your actual Rocket number
},
```

### Step 3: Update Package Prices (Optional)

If you want to change the "Iftar + Jersey + Seheri" price to 1000 BDT:

```typescript
packagePrices: {
  'iftar-only': 300,
  'iftar-jersey': 700,
  'iftar-jersey-seheri': 1000, // ← Changed from 900 to 1000
  'jersey-only': 500,
},
```

---

## Part 4: Local Testing

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Run Development Server

```bash
npm run dev
```

### Step 3: Test the Application

1. Open your browser to `http://localhost:5173`
2. **Test Registration Flow:**
   - Fill out the form completely
   - Select a package
   - If jersey package, fill jersey details
   - Select payment method
   - Enter transaction ID and last 2 digits
   - Click "Complete Registration"

3. **Verify Data in Google Sheets:**
   - Go back to your Google Sheet
   - Check the "registrations" sheet - you should see a new row with your test data
   - Check the "stats" sheet - numbers should have updated

4. **Test Live Counters:**
   - Refresh the page
   - The counters should show the updated numbers from Google Sheets

---

## Part 5: Production Deployment (Vercel)

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended) or email

### Step 2: Prepare for Deployment

```bash
# Build the production version to test
npm run build

# Preview the production build locally
npm run preview
```

### Step 3: Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? ssc-2019-iftar-registration
# - Directory? ./
# - Override settings? No
```

**Option B: Using Vercel Dashboard**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Import your Git repository (or upload folder)
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**

### Step 4: Get Your Live URL

After deployment, Vercel will give you a URL like:
```
https://ssc-2019-iftar-registration.vercel.app
```

### Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings → Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

---

## Part 6: Final Verification Checklist

### ✅ Google Sheets Verification

- [ ] "registrations" sheet has correct headers
- [ ] "stats" sheet exists with initial values (0, 0)
- [ ] Apps Script is deployed as Web App
- [ ] Web App URL is copied

### ✅ Frontend Configuration

- [ ] Google Script URL is updated in `src/config.ts`
- [ ] Payment numbers are updated with real numbers
- [ ] Package prices are correct

### ✅ Functionality Testing

- [ ] Submit a test registration
- [ ] Data appears in "registrations" sheet
- [ ] Stats update in "stats" sheet
- [ ] Live counters show correct numbers
- [ ] Success modal appears after submission
- [ ] Form resets after successful submission

### ✅ Mobile Responsiveness

- [ ] Test on mobile device or Chrome DevTools
- [ ] All buttons are tappable
- [ ] Text is readable
- [ ] Forms are easy to fill

### ✅ Production Deployment

- [ ] Site is live on Vercel
- [ ] All features work on production URL
- [ ] Share the link with your team for testing

---

## 🔧 Configuration Reference

### Changing Payment Numbers

**File**: `src/config.ts`

```typescript
paymentNumbers: {
  bkash: 'YOUR_BKASH_NUMBER',
  nagad: 'YOUR_NAGAD_NUMBER',
  rocket: 'YOUR_ROCKET_NUMBER',
},
```

### Changing Package Prices

**File**: `src/config.ts`

```typescript
packagePrices: {
  'iftar-only': 300,
  'iftar-jersey': 700,
  'iftar-jersey-seheri': 900,
  'jersey-only': 500,
},
```

### Changing Event Details

**File**: `src/config.ts`

```typescript
event: {
  title: 'SSC 2019 Batch Iftar Party',
  date: '27th Ramadan',
  location: 'School Field',
  year: 'Ramadan 1445',
},
```

---

## 🆘 Troubleshooting

### Problem: "Cannot find module 'react'" errors

**Solution**: Run `npm install` to install all dependencies

### Problem: Data not appearing in Google Sheets

**Solutions**:
1. Check that the Google Script URL in `src/config.ts` is correct
2. Verify the script is deployed as "Anyone" can access
3. Check browser console for errors
4. Try redeploying the Apps Script

### Problem: CORS errors in console

**Solution**: This is expected! We use `mode: 'no-cors'` for POST requests. As long as data appears in the sheet, it's working.

### Problem: Stats not updating

**Solutions**:
1. Check that the "stats" sheet exists and has the correct structure
2. Verify column names are exactly: `Metric` and `Value`
3. Check that row 2 has `total_students` and row 3 has `total_money`

### Problem: Counters show 0 even after registrations

**Solutions**:
1. Open Google Sheets and manually check if data is there
2. Try refreshing the page
3. Check browser console for API errors
4. Verify the GET endpoint is working by visiting the script URL directly

### Problem: Build fails on Vercel

**Solutions**:
1. Make sure `package.json` has all dependencies
2. Check that TypeScript errors are resolved
3. Try building locally first: `npm run build`

---

## 📱 Sharing the Registration Link

Once deployed, share your Vercel URL with students:

**Example Message:**
```
🌙 SSC 2019 Batch Iftar Party Registration is NOW OPEN!

📅 Date: 27th Ramadan
📍 Location: School Field

Register here: https://your-app.vercel.app

Packages available:
• Iftar Only - 300 BDT
• Iftar + Jersey - 700 BDT
• Iftar + Jersey + Seheri - 900 BDT
• Jersey Only - 500 BDT

Don't miss out! Register today! 🎉
```

---

## 🔒 Security Notes

- The Apps Script runs with YOUR Google account permissions
- Only you can access and modify the Google Sheet
- The Web App URL is public but data is stored securely in your Google account
- Never share your Apps Script editor access
- Regularly backup your Google Sheet data

---

## 📊 Monitoring Registrations

### View Live Data

1. Open your Google Sheet
2. The "registrations" sheet updates in real-time
3. The "stats" sheet shows totals

### Export Data

1. In Google Sheets: **File → Download → CSV** or **Excel**
2. You can filter, sort, and analyze the data

### Verify Payments

1. Check the "Transaction ID" column
2. Cross-reference with your payment account
3. Update "Status" column from "Pending Verification" to "Verified"

---

## 🎉 You're All Set!

Your event registration system is now live and ready to accept registrations!

**Need help?** Check the troubleshooting section or review the implementation plan.

**Good luck with your event!** 🌙✨
