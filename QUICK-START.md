# 🚀 Quick Deployment Guide - Your Google Sheets

You've created Google Sheets! Here's how to connect them to your application in **5 simple steps**.

---

## 📊 Your Google Sheets

You explicitly provided these sheets:
1. **Sheet 1**: https://docs.google.com/spreadsheets/d/1NzGmUdmO9CnPtKxkpIF6-p9jgRFmdXXVHKgVTGSvszw/
2. **Sheet 2**: https://docs.google.com/spreadsheets/d/1qHIa3llYisBIHMG45-eBLkgLr1zBPCbaW4asdBZjNX4/

**I have configured the code to use Sheet 1.**

---

## ✅ STEP 1: Verify Sheet Structure

Open **Sheet 1** and make sure it has these tabs and headers:

### Tab 1: "registrations"

**Row 1 (Headers):**
```
Timestamp | Full Name | Phone | Package | Jersey Size | Jersey Name | Jersey Number | Payment Method | Transaction ID | Last 2 Digit | Amount | Status
```
*(Note: 'Last 2 Digit' - singular, as per your request)*

### Tab 2: "stats"

**Structure:**
```
Row 1: total_students | total_money
Row 2: 0              | 0
```
*(Note: Use the horizontal layout you requested)*


---

## ⚙️ STEP 2: Deploy Google Apps Script

1. **Open your chosen Google Sheet**

2. **Go to Extensions → Apps Script**

3. **Delete any existing code** in the editor

4. **Copy the ENTIRE code** from:
   ```
   c:\Users\MT\Desktop\ifter\google-apps-script\Code.gs
   ```

5. **Paste it** into the Apps Script editor

6. **Save** (Ctrl+S or click the save icon)
   - Name it: "SSC Registration API"

7. **Click Deploy → New deployment**

8. **Click the gear icon** next to "Select type"

9. **Choose "Web app"**

10. **Configure:**
    - Description: `Registration API`
    - Execute as: **Me (your email)**
    - Who has access: **Anyone**

11. **Click Deploy**

12. **Authorize:**
    - Click "Authorize access"
    - Choose your Google account
    - Click "Advanced" → "Go to SSC Registration API (unsafe)"
    - Click "Allow"

13. **COPY THE WEB APP URL** 
    - It looks like: `https://script.google.com/macros/s/AKfycby.../exec`
    - **SAVE THIS URL** - you'll need it in the next step!

---

## 🔗 STEP 3: Update Frontend Configuration

1. **Open** `c:\Users\MT\Desktop\ifter\src\config.ts`

2. **Find this line:**
   ```typescript
   googleScriptUrl: 'YOUR_GOOGLE_SCRIPT_URL_HERE',
   ```

3. **Replace it with your Web App URL:**
   ```typescript
   googleScriptUrl: 'https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec',
   ```

4. **Update payment numbers** (replace with your real numbers):
   ```typescript
   paymentNumbers: {
     bkash: '01712-345678',   // ← Your bKash number
     nagad: '01812-345678',   // ← Your Nagad number
     rocket: '01912-345678',  // ← Your Rocket number
   },
   ```

5. **Save the file** (Ctrl+S)

---

## 🧪 STEP 4: Test Locally

The dev server should already be running at `http://localhost:3000`

1. **Open** http://localhost:3000 in your browser

2. **Fill out the registration form:**
   - Enter a test name
   - Enter a valid 11-digit phone (starts with 01)
   - Select a package
   - If jersey package, fill jersey details
   - Select payment method
   - Enter transaction ID
   - Enter last 2 digits

3. **Click "Complete Registration"**

4. **Check your Google Sheet:**
   - Go to the "registrations" tab
   - You should see a new row with your test data
   - Go to the "stats" tab
   - Numbers should have updated (1 student, amount collected)

5. **Refresh the webpage:**
   - The counters at the top should show updated numbers

---

## 🎉 STEP 5: Deploy to Production (Vercel)

Once local testing works:

```bash
# Build the production version
npm run build

# Deploy to Vercel (if you have Vercel CLI)
vercel

# OR deploy via Vercel dashboard
# 1. Go to vercel.com
# 2. Import your project
# 3. Deploy
```

---

## 🆘 Troubleshooting

### Problem: "Registration failed" error

**Check:**
1. Is the Google Script URL correct in `src/config.ts`?
2. Did you deploy the Apps Script as "Anyone" can access?
3. Open browser console (F12) - any errors?

### Problem: Data not appearing in Google Sheets

**Check:**
1. Did you authorize the Apps Script?
2. Are the sheet names exactly "registrations" and "stats"?
3. Try the test function in Apps Script:
   - In Apps Script editor, select `testDoPost` from dropdown
   - Click Run
   - Check if data appears in sheet

### Problem: Counters showing 0

**Check:**
1. Is the "stats" sheet structured correctly?
2. Row 2 should have `total_students` in column A
3. Row 3 should have `total_money` in column A
4. Try refreshing the page

---

## 📝 Quick Reference

**Your Google Sheet URLs:**
- Sheet 1: `1NzGmUdmO9CnPtKxkpIF6-p9jgRFmdXXVHKgVTGSvszw`
- Sheet 2: `1qHIa3llYisBIHMG45-eBLkgLr1zBPCbaW4asdBZjNX4`

**Files to Update:**
- `src/config.ts` - Add Google Script URL and payment numbers

**What the Backend Does:**
- ✅ Validates all form data
- ✅ Sanitizes inputs to prevent attacks
- ✅ Saves to "registrations" sheet
- ✅ Updates "stats" sheet automatically
- ✅ Returns success/error messages
- ✅ Auto-creates sheets if missing

---

## 🎯 Next Steps After Testing

1. ✅ Test with multiple registrations
2. ✅ Verify all package types work
3. ✅ Test on mobile device
4. ✅ Update payment numbers to real ones
5. ✅ Deploy to Vercel
6. ✅ Share the link with your batch!

---

**Need more help?** Check the full [DEPLOYMENT.md](file:///c:/Users/MT/Desktop/ifter/DEPLOYMENT.md) guide.

**Ready to go live!** 🌙✨
