# ⚙️ Configuration Guide

Quick reference for updating your event registration system configuration.

---

## 📍 Configuration File Location

All configuration is centralized in: **`src/config.ts`**

---

## 🔗 Google Apps Script URL

**When to update**: After deploying your Google Apps Script

```typescript
googleScriptUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
```

**How to get this URL**:
1. Open Google Sheet
2. Extensions → Apps Script
3. Deploy → New deployment → Web app
4. Copy the "Web app URL"

---

## 💳 Payment Numbers

**When to update**: Before going live with real payment accounts

```typescript
paymentNumbers: {
  bkash: '01712-345678',  // Update this
  nagad: '01812-345678',  // Update this
  rocket: '01912-345678', // Update this
},
```

**Format**: 11-digit Bangladeshi mobile number (starts with 01)

---

## 💰 Package Prices

**When to update**: If you need to change event pricing

```typescript
packagePrices: {
  'iftar-only': 300,              // Iftar Only
  'iftar-jersey': 700,            // Iftar + Jersey
  'iftar-jersey-seheri': 900,     // Iftar + Jersey + Seheri
  'jersey-only': 500,             // Jersey Only
},
```

**Note**: Prices are in BDT (Bangladeshi Taka)

---

## 📅 Event Details

**When to update**: For different events or date changes

```typescript
event: {
  title: 'SSC 2019 Batch Iftar Party',
  date: '27th Ramadan',
  location: 'School Field',
  year: 'Ramadan 1445',
},
```

**Note**: These are currently displayed in the Hero section

---

## ⏱️ Stats Refresh Interval

**When to update**: If you want counters to refresh more/less frequently

```typescript
statsRefreshInterval: 30000, // 30 seconds (in milliseconds)
```

**Common values**:
- `15000` = 15 seconds (more frequent)
- `30000` = 30 seconds (default)
- `60000` = 1 minute (less frequent)

---

## 🔄 After Making Changes

### For Local Development

```bash
# The dev server will auto-reload
npm run dev
```

### For Production

```bash
# Rebuild and redeploy
npm run build
vercel --prod
```

Or if using Vercel Git integration, just push to your repository:

```bash
git add .
git commit -m "Updated configuration"
git push
```

Vercel will automatically rebuild and deploy.

---

## ✅ Configuration Checklist

Before going live, make sure you've updated:

- [ ] Google Apps Script URL
- [ ] bKash payment number
- [ ] Nagad payment number
- [ ] Rocket payment number
- [ ] Package prices (if different from defaults)
- [ ] Event details (title, date, location)

---

## 🎨 Customizing Beyond Config

### Changing Colors

Colors are defined in `src/index.css` using Tailwind CSS. The main theme colors are:

- **Emerald** (primary): Registration buttons, counters
- **Amber** (secondary): Money counter, accents
- **Blue**: Payment section

### Changing Text Content

Most text content is in the component files:

- **Hero section**: `src/components/Hero.tsx`
- **Package descriptions**: `src/components/Packages.tsx`
- **Form labels**: `src/components/RegistrationForm.tsx`
- **Footer**: `src/components/Footer.tsx`

---

## 📝 Example: Complete Configuration

```typescript
export const config = {
  googleScriptUrl: 'https://script.google.com/macros/s/AKfycbxXXXXXX/exec',
  statsRefreshInterval: 30000,
  
  packagePrices: {
    'iftar-only': 300,
    'iftar-jersey': 700,
    'iftar-jersey-seheri': 1000, // Changed to 1000
    'jersey-only': 500,
  },
  
  paymentNumbers: {
    bkash: '01712345678',  // Real number
    nagad: '01812345678',  // Real number
    rocket: '01912345678', // Real number
  },
  
  event: {
    title: 'SSC 2019 Batch Iftar Party',
    date: '27th Ramadan',
    location: 'School Field',
    year: 'Ramadan 1445',
  },
};
```

---

Need help? Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide or the troubleshooting section.
