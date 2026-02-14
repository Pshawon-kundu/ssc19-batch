# 🎉 SSC 2019 Batch Iftar Party - Registration System

A modern, production-ready event registration web application with Google Sheets backend integration.

![Event Registration System](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

---

## ✨ Features

### 🎯 Core Functionality
- **Live Registration Counters** - Real-time display of total registered students and money collected
- **Package Selection** - Multiple package options with dynamic pricing
- **Jersey Customization** - Conditional jersey fields (size, name, number)
- **Payment Integration** - Support for bKash, Nagad, and Rocket
- **Form Validation** - Comprehensive client-side validation
- **Google Sheets Backend** - Automatic data storage and retrieval

### 🎨 User Experience
- **Ramadan-Themed Design** - Beautiful emerald and gold gradient theme
- **Mobile-First Responsive** - Optimized for all devices
- **Smooth Animations** - Framer Motion powered transitions
- **Copy-to-Clipboard** - Easy payment number copying
- **Success Modal** - Confirmation with registration details
- **Auto-Refresh Stats** - Counters update every 30 seconds

### 🔒 Security & Validation
- **Phone Number Validation** - 11-digit BD format (01XXXXXXXXX)
- **Jersey Number Range** - 0-99 only
- **Jersey Name Length** - Max 15 characters
- **Transaction ID Required** - Payment verification
- **Input Sanitization** - Server-side data cleaning

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Google Account
- npm or yarn

### Installation

```bash
# Clone or download the project
cd ifter

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:5173` to see the app running locally.

---

## 📦 Package Options

| Package | Price | Includes |
|---------|-------|----------|
| **Iftar Only** | 300 BDT | Iftar meal |
| **Iftar + Jersey** | 700 BDT | Iftar + Custom jersey |
| **Iftar + Jersey + Seheri** | 900 BDT | Iftar + Jersey + Seheri meal |
| **Jersey Only** | 500 BDT | Custom jersey only |

---

## ⚙️ Configuration

All configuration is centralized in `src/config.ts`:

```typescript
export const config = {
  // Google Apps Script Web App URL
  googleScriptUrl: 'YOUR_GOOGLE_SCRIPT_URL_HERE',
  
  // Package prices (BDT)
  packagePrices: {
    'iftar-only': 300,
    'iftar-jersey': 700,
    'iftar-jersey-seheri': 900,
    'jersey-only': 500,
  },
  
  // Payment numbers
  paymentNumbers: {
    bkash: '01712-345678',
    nagad: '01812-345678',
    rocket: '01912-345678',
  },
  
  // Event details
  event: {
    title: 'SSC 2019 Batch Iftar Party',
    date: '27th Ramadan',
    location: 'School Field',
    year: 'Ramadan 1445',
  },
};
```

**See [CONFIGURATION.md](./CONFIGURATION.md) for detailed configuration guide.**

---

## 🗄️ Google Sheets Setup

### Database Structure

**Sheet 1: `registrations`**
| Column | Description |
|--------|-------------|
| Timestamp | Auto-generated submission time |
| Full Name | Student's full name |
| Phone | 11-digit phone number |
| Package | Selected package type |
| Jersey Size | S/M/L/XL/XXL (if applicable) |
| Jersey Name | Custom name (max 15 chars) |
| Jersey Number | 0-99 (if applicable) |
| Payment Method | bKash/Nagad/Rocket |
| Transaction ID | Payment reference |
| Last 2 Digits | Phone verification |
| Amount | Package price |
| Status | Pending Verification/Verified |

**Sheet 2: `stats`**
| Metric | Value |
|--------|-------|
| total_students | 0 |
| total_money | 0 |

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup instructions.**

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Lucide React** - Icon library
- **Radix UI** - Accessible components

### Backend
- **Google Apps Script** - Serverless backend
- **Google Sheets** - Database
- **Apps Script Web App** - REST API

---

## 📁 Project Structure

```
ifter/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Packages.tsx
│   │   ├── RegistrationForm.tsx
│   │   ├── JerseyPreview.tsx
│   │   ├── PaymentSection.tsx
│   │   ├── SuccessModal.tsx
│   │   └── Footer.tsx
│   ├── api.ts              # API service layer
│   ├── config.ts           # Centralized configuration
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── google-apps-script/
│   └── Code.gs             # Backend API code
├── DEPLOYMENT.md           # Deployment guide
├── CONFIGURATION.md        # Configuration reference
├── package.json
└── README.md
```

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions including:**
- Google Sheets setup
- Apps Script deployment
- Frontend configuration
- Vercel deployment
- Troubleshooting

---

## 🧪 Testing Checklist

Before going live, test the following:

- [ ] Submit a test registration
- [ ] Verify data appears in Google Sheets
- [ ] Check stats update correctly
- [ ] Test all package options
- [ ] Test jersey fields show/hide correctly
- [ ] Test form validation (empty fields, invalid phone, etc.)
- [ ] Test payment number copy button
- [ ] Test success modal displays correct info
- [ ] Test on mobile device
- [ ] Test counter auto-refresh

---

## 🎨 Customization

### Change Colors

Edit `src/index.css` - the theme uses:
- **Emerald** (`emerald-*`) - Primary color
- **Amber** (`amber-*`) - Secondary color
- **Blue** (`blue-*`) - Payment section

### Change Text Content

- **Hero section**: `src/components/Hero.tsx`
- **Package descriptions**: `src/components/Packages.tsx`
- **Form labels**: `src/components/RegistrationForm.tsx`
- **Footer**: `src/components/Footer.tsx`

### Change Prices or Payment Numbers

Edit `src/config.ts` - see [CONFIGURATION.md](./CONFIGURATION.md)

---

## 📊 Monitoring Registrations

### View Live Data
1. Open your Google Sheet
2. "registrations" sheet shows all submissions
3. "stats" sheet shows totals

### Export Data
- **File → Download → CSV** or **Excel**
- Filter and analyze in Excel/Google Sheets

### Verify Payments
1. Check Transaction ID column
2. Cross-reference with payment account
3. Update Status column to "Verified"

---

## 🆘 Troubleshooting

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
Most TypeScript errors will resolve after running `npm install`. The errors you see before installation are expected.

### Data Not Saving to Google Sheets
1. Check `src/config.ts` has correct Google Script URL
2. Verify Apps Script is deployed as "Anyone" can access
3. Check browser console for errors
4. Test the script URL directly in browser

### Counters Not Updating
1. Check Google Sheets has "stats" sheet with correct structure
2. Verify stats sheet has `total_students` and `total_money` rows
3. Try manual refresh

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for more troubleshooting tips.**

---

## 📝 License

This project is created for the SSC 2019 Batch Iftar Party event.

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for the SSC 2019 batch reunion
- Ramadan-themed UI for the holy month

---

## 📞 Support

For issues or questions:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
2. Review [CONFIGURATION.md](./CONFIGURATION.md) for configuration help
3. Check browser console for error messages

---

**Made with ❤️ for SSC 2019 Batch** 🌙✨