# 🎯 Deployment Checklist

Use this checklist to deploy your event registration system step by step.

---

## ✅ Pre-Deployment Checklist

### Google Sheets Setup
- [ ] Choose which Google Sheet to use (recommend Sheet 1)
- [ ] Verify "registrations" sheet exists with correct headers
- [ ] Verify "stats" sheet exists with correct structure
- [ ] Sheet URLs:
  - Sheet 1: `1NzGmUdmO9CnPtKxkpIF6-p9jgRFmdXXVHKgVTGSvszw`
  - Sheet 2: `1qHIa3llYisBIHMG45-eBLkgLr1zBPCbaW4asdBZjNX4`

### Google Apps Script Deployment
- [ ] Open Google Sheet → Extensions → Apps Script
- [ ] Copy code from `google-apps-script/Code.gs`
- [ ] Paste into Apps Script editor
- [ ] Save project as "SSC Registration API"
- [ ] Deploy → New deployment → Web app
- [ ] Configure: Execute as "Me", Access "Anyone"
- [ ] Authorize the script
- [ ] **Copy Web App URL**: `_______________________________`

### Frontend Configuration
- [ ] Open `src/config.ts`
- [ ] Paste Google Script URL into `GOOGLE_SCRIPT_URL`
- [ ] Update bKash number: `_______________________________`
- [ ] Update Nagad number: `_______________________________`
- [ ] Update Rocket number: `_______________________________`
- [ ] Save file

---

## 🧪 Testing Checklist

### Local Testing (http://localhost:3000)
- [ ] Dev server is running (`npm run dev`)
- [ ] Page loads without errors
- [ ] Counters are visible (may show 0)
- [ ] Package cards display correctly
- [ ] Registration form is visible

### Form Validation Testing
- [ ] Try submitting empty form (should show errors)
- [ ] Try invalid phone number (should reject)
- [ ] Try jersey number > 99 (should reject)
- [ ] Try jersey name > 15 chars (should reject)

### Registration Flow Testing
- [ ] Fill complete form with valid data
- [ ] Submit registration
- [ ] Success modal appears
- [ ] Check Google Sheet "registrations" tab (new row appears)
- [ ] Check Google Sheet "stats" tab (numbers updated)
- [ ] Refresh page - counters show updated numbers
- [ ] Form has reset

### Package Testing
- [ ] Test "Iftar Only" package (300 BDT, no jersey fields)
- [ ] Test "Iftar + Jersey" package (700 BDT, jersey fields appear)
- [ ] Test "Iftar + Jersey + Seheri" (900 BDT, jersey fields appear)
- [ ] Test "Jersey Only" package (500 BDT, jersey fields appear)

### Payment Method Testing
- [ ] Test bKash payment selection
- [ ] Test Nagad payment selection
- [ ] Test Rocket payment selection
- [ ] Verify payment number displays correctly
- [ ] Test copy button (should show "Copied!")

### Mobile Testing
- [ ] Open Chrome DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Test on iPhone view
- [ ] Test on Android view
- [ ] All buttons are tappable
- [ ] Text is readable
- [ ] Forms are easy to fill

---

## 🚀 Production Deployment

### Build & Deploy
- [ ] Run `npm run build` (should complete without errors)
- [ ] Test production build: `npm run preview`
- [ ] Deploy to Vercel: `vercel` or via dashboard
- [ ] **Production URL**: `_______________________________`

### Production Testing
- [ ] Open production URL
- [ ] Submit test registration
- [ ] Verify data in Google Sheets
- [ ] Test on actual mobile device
- [ ] Share with 2-3 friends for testing

---

## 📊 Go Live Checklist

### Final Verification
- [ ] All payment numbers are REAL (not test numbers)
- [ ] Google Sheet is accessible
- [ ] Apps Script is deployed and authorized
- [ ] Production site is live
- [ ] Mobile view works perfectly
- [ ] Test registration successful

### Launch
- [ ] Create announcement message
- [ ] Share registration link with batch
- [ ] Monitor first few registrations
- [ ] Verify payments are being received
- [ ] Update registration status in Google Sheet

---

## 📱 Announcement Template

Copy and customize this message:

```
🌙 SSC 2019 Batch Iftar Party Registration is NOW OPEN!

📅 Date: 27th Ramadan
📍 Location: School Field

🔗 Register here: [YOUR_PRODUCTION_URL]

📦 Packages:
• Iftar Only - 300 BDT
• Iftar + Jersey - 700 BDT
• Iftar + Jersey + Seheri - 900 BDT
• Jersey Only - 500 BDT

💳 Payment: bKash/Nagad/Rocket
✅ Instant confirmation
🎽 Custom jersey with your name & number

Don't miss out! Register today! 🎉
```

---

## 🆘 Emergency Contacts

If something goes wrong:

1. **Check browser console** (F12 → Console tab)
2. **Check Google Sheet** - is data appearing?
3. **Check Apps Script logs** - Extensions → Apps Script → Executions
4. **Review QUICK-START.md** for troubleshooting

---

## 📈 Monitoring

### Daily Tasks
- [ ] Check Google Sheet for new registrations
- [ ] Verify transaction IDs with payment accounts
- [ ] Update "Status" column to "Verified" after confirmation
- [ ] Monitor total money collected

### Weekly Tasks
- [ ] Export data backup (File → Download → Excel)
- [ ] Send reminder to unregistered students
- [ ] Update jersey order count

---

**Last Updated**: [Add date when you complete deployment]

**Status**: [ ] Not Started | [ ] In Progress | [ ] Testing | [ ] Live

---

Good luck with your event! 🌙✨
