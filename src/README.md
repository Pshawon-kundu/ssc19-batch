# SSC 2019 Batch Iftar Party Registration Website 🌙

A beautiful, modern, and production-ready event registration website built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎨 Beautiful UI/UX
- **Ramadan-themed design** with emerald green and golden accents
- **Smooth animations** using Framer Motion
- **Mobile-first responsive** design
- **Soft shadows and rounded cards** for modern look

### 📊 Live Statistics
- Real-time counter for total registered students
- Live tracker for total money collected (in BDT)
- Updates automatically after each registration

### 🍱 Package System
Four registration packages:
1. **Iftar Only** - ৳300
2. **Iftar + Jersey** - ৳700 ⭐ Popular
3. **Iftar + Jersey + Seheri** - ৳900
4. **Only Jersey** - ৳500

### 👕 Jersey Customization
When jersey packages are selected, users can customize:
- **Jersey Size**: S / M / L / XL / XXL
- **Jersey Name**: Up to 15 characters (auto-uppercase)
- **Jersey Number**: 0-99 only

### 💳 Payment Integration
Support for Bangladesh mobile banking:
- **bKash** 📱
- **Nagad** 💳
- **Rocket** 🚀

Payment verification with:
- Transaction ID
- Last 2 digits of phone number

### ✅ Smart Validation
- Bangladesh phone number format (11 digits, starts with 01)
- Conditional jersey fields (only shown when needed)
- Real-time error messages
- Character counter for jersey name
- Number range validation (0-99 for jersey number)

### 🗄️ Google Sheets Integration
- Automatic data collection
- Easy to view and manage registrations
- Export capabilities
- Status tracking (Pending/Confirmed)

### 🎉 Success Modal
After successful registration:
- Celebration animation
- Registration summary
- Jersey details (if applicable)
- Amount paid confirmation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- A code editor (VS Code recommended)
- A Google account (for Sheets integration)

### Installation

1. **Clone or download this project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔧 Configuration

### 1. Update Package Prices

Edit `/App.tsx` and `/components/RegistrationForm.tsx`:

```typescript
const packagePrices = {
  'iftar-only': 300,
  'iftar-jersey': 700,
  'iftar-jersey-seheri': 900, // ← Change this
  'jersey-only': 500,
};
```

### 2. Update Payment Numbers

Edit `/components/PaymentSection.tsx`:

```typescript
const paymentMethods = [
  {
    id: 'bkash',
    name: 'bKash',
    number: '01712-345678', // ← Change to your number
  },
  // ... update Nagad and Rocket
];
```

### 3. Update Event Details

Edit `/components/Hero.tsx` for:
- Event title
- Subtitle
- Date
- Location

Edit `/components/Footer.tsx` for:
- Contact information
- Social media links

## 📊 Google Sheets Setup

Follow the detailed guide in [`google-sheets-setup.md`](./google-sheets-setup.md) to:

1. Create your Google Sheet
2. Set up Apps Script
3. Deploy the web app
4. Connect to your website
5. Test the integration

**Quick Summary:**

1. Create a Google Sheet with these columns:
   - Timestamp, Name, Phone, Package, Jersey Size, Jersey Name, Jersey Number, Payment Method, Transaction ID, Last 2 Digits, Amount, Status

2. Add the Apps Script (provided in setup guide)

3. Deploy as Web App

4. Update `GOOGLE_SCRIPT_URL` in `/App.tsx`

## 🌐 Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

Your site will be live in ~2 minutes.

## 📱 Mobile Testing Checklist

- [ ] Form inputs are easily tappable
- [ ] Package cards are readable
- [ ] Jersey size buttons work well
- [ ] Payment numbers are copyable
- [ ] Submit button is accessible
- [ ] Success modal displays correctly
- [ ] Navigation works smoothly

## 🎨 Customization Guide

### Change Colors

The website uses Tailwind CSS. Main colors:
- **Emerald**: `emerald-600`, `emerald-700` (primary)
- **Amber**: `amber-500`, `amber-600` (accent)
- **Gray**: For text and backgrounds

To change colors, replace class names:
```tsx
// Change from emerald to blue
className="bg-emerald-600" → "bg-blue-600"
```

### Add More Packages

Edit `/components/Packages.tsx`:

```typescript
const packages = [
  // ... existing packages
  {
    id: 'new-package' as PackageType,
    name: 'New Package',
    price: 800,
    icon: '🎁',
    features: [...],
    popular: false,
  },
];
```

Don't forget to:
1. Add to `PackageType` in `/App.tsx`
2. Add price in `packagePrices` objects

## 📋 Form Validation Rules

| Field | Validation |
|-------|-----------|
| Name | Required, any text |
| Phone | 11 digits, starts with 01 |
| Package | Required, one selection |
| Jersey Size | Required if jersey selected |
| Jersey Name | Required if jersey selected, max 15 chars |
| Jersey Number | Required if jersey selected, 0-99 only |
| Payment Method | Required |
| Transaction ID | Required, any text |
| Last 2 Digits | Required, exactly 2 digits |

## 🗂️ Project Structure

```
/
├── App.tsx                          # Main app component
├── components/
│   ├── Navigation.tsx              # Navbar with smooth scroll
│   ├── Hero.tsx                    # Hero section with counters
│   ├── Packages.tsx                # Package selection cards
│   ├── RegistrationForm.tsx        # Main registration form
│   ├── JerseyPreview.tsx           # Jersey preview card
│   ├── PaymentSection.tsx          # Payment method selection
│   ├── SuccessModal.tsx            # Success confirmation modal
│   └── Footer.tsx                  # Footer with contact info
├── google-sheets-setup.md          # Google Sheets integration guide
├── DEPLOYMENT.md                   # Deployment instructions
└── README.md                       # This file
```

## 🐛 Troubleshooting

### Form not submitting
- Check browser console for errors
- Verify Google Script URL is correct
- Ensure all required fields are filled

### Counters not updating
- Check localStorage in browser DevTools
- Verify Google Sheets API is working
- Clear cache and reload

### Jersey fields not showing
- Make sure package selection is working
- Check conditional logic in `RegistrationForm.tsx`
- Verify `needsJerseySize` includes your package

### Styles look broken
- Run `npm install` to ensure all dependencies are installed
- Check that Tailwind CSS is configured correctly
- Clear browser cache

## 📞 Support

For help or questions:
- Email: ssc2019@example.com
- Check the documentation files
- Review browser console for errors

## 🎯 Pre-Launch Checklist

Before going live:

- [ ] Update all package prices
- [ ] Update payment numbers (bKash, Nagad, Rocket)
- [ ] Set up Google Sheets integration
- [ ] Test form submission
- [ ] Update contact information
- [ ] Test on mobile devices
- [ ] Update event date and location
- [ ] Test payment validation
- [ ] Check all links work
- [ ] Verify success modal displays correctly

## 🔒 Security Notes

- All data is stored in your Google Sheet
- Payment details are for reference only
- Never expose API keys in frontend code
- Use environment variables for sensitive data
- The website validates data on both client and server side

## 📈 After Launch

1. **Monitor registrations** in Google Sheets
2. **Verify payments** regularly
3. **Contact registrants** if needed
4. **Update stats** on website
5. **Backup data** regularly

## 🎉 Features Included

✅ Mobile-first responsive design
✅ Smooth animations and transitions
✅ Live registration counters
✅ Package selection system
✅ Conditional jersey customization
✅ Payment method integration
✅ Form validation with error messages
✅ Success confirmation modal
✅ Google Sheets integration
✅ Character counter for jersey name
✅ Number validation for jersey number
✅ Bangladesh phone validation
✅ Auto-uppercase jersey name
✅ Registration summary display
✅ Copy-friendly payment numbers

## 📝 License

This project is created for SSC 2019 Batch Iftar Party.
Feel free to customize and use for your event.

## 💝 Credits

Built with:
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Google Sheets** - Data storage

---

**Made with ❤️ for SSC 2019 Batch**

🌙 Ramadan Mubarak! 🌙
