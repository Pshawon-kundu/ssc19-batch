# Google Sheets Integration Setup

This guide will help you connect your event registration website to Google Sheets for automatic data collection.

## 📋 Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "SSC 2019 Iftar Registration"
3. In the first row, add these column headers:
   - Timestamp
   - Name
   - Phone
   - Package
   - Jersey Size
   - Jersey Name
   - Jersey Number
   - Payment Method
   - Transaction ID
   - Last 2 Digits
   - Amount
   - Status

## 🔧 Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code
3. Copy and paste the following code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append data to sheet
    sheet.appendRow([
      new Date(),
      data.name,
      data.phone,
      data.package,
      data.jerseySize || 'N/A',
      data.jerseyName || 'N/A',
      data.jerseyNumber || 'N/A',
      data.paymentMethod,
      data.transactionId,
      data.lastTwoDigits,
      data.amount,
      'Pending Verification'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Registration successful'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    // Skip header row
    var registrations = data.slice(1);
    var totalRegistered = registrations.length;
    var totalMoney = 0;
    
    // Calculate total money (amount is in column 11, index 10)
    for (var i = 0; i < registrations.length; i++) {
      totalMoney += Number(registrations[i][10]) || 0;
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'totalRegistered': totalRegistered,
      'totalMoney': totalMoney
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon)
5. Name your project: "SSC Registration API"

## 🚀 Step 3: Deploy the Script

1. Click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: "Event Registration API"
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Copy the Web App URL** - you'll need this!
7. Click **Authorize access** if prompted
8. Select your Google account
9. Click **Advanced → Go to [Project Name] (unsafe)**
10. Click **Allow**

## 🔗 Step 4: Connect to Your Website

1. Open `/App.tsx` in your project
2. Find the `submitToGoogleSheets` function
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your Web App URL
4. Uncomment the fetch code:

```typescript
const submitToGoogleSheets = async (data: any) => {
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
  
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
```

## 📊 Step 5: Fetch Live Stats (Optional)

To display live counters on your website:

1. Add this function to fetch stats:

```typescript
const fetchStats = async () => {
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
  
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    const data = await response.json();
    
    if (data.status === 'success') {
      setTotalRegistered(data.totalRegistered);
      setTotalMoney(data.totalMoney);
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
};
```

2. Call this function in `useEffect`:

```typescript
useEffect(() => {
  fetchStats();
  // Optional: Refresh every 30 seconds
  const interval = setInterval(fetchStats, 30000);
  return () => clearInterval(interval);
}, []);
```

## ✏️ Customize Package Prices

To change the price for "Iftar + Jersey + Seheri":

1. Open `/App.tsx`
2. Find the `packagePrices` object in `handleRegistrationSubmit`
3. Change the value:

```typescript
const packagePrices = {
  'iftar-only': 300,
  'iftar-jersey': 700,
  'iftar-jersey-seheri': 1000, // ← Change this
  'jersey-only': 500,
};
```

4. Also update in `/components/RegistrationForm.tsx`:

```typescript
const packagePrices = {
  'iftar-only': 300,
  'iftar-jersey': 700,
  'iftar-jersey-seheri': 1000, // ← Change this
  'jersey-only': 500,
};
```

## 💳 Update Payment Numbers

To change bKash/Nagad/Rocket numbers:

1. Open `/components/PaymentSection.tsx`
2. Update the `paymentMethods` array:

```typescript
const paymentMethods = [
  {
    id: 'bkash',
    name: 'bKash',
    icon: '📱',
    color: 'from-pink-500 to-pink-600',
    number: '01712-345678', // ← Change this
  },
  // ... update others
];
```

## 🧪 Testing

1. Submit a test registration
2. Check your Google Sheet - a new row should appear
3. Verify all data is captured correctly
4. Test the stats counter

## 🔒 Security Notes

- The Apps Script runs with your permissions
- Data is stored in your Google Sheet
- Use `mode: 'no-cors'` for POST requests
- Never share your Script URL publicly with write access

## 🆘 Troubleshooting

**Problem**: Data not appearing in sheet
- Check that the Script URL is correct
- Verify the script is deployed as "Anyone"
- Check browser console for errors

**Problem**: CORS errors
- Make sure `mode: 'no-cors'` is set
- For GET requests, regular fetch works

**Problem**: Stats not updating
- Verify the column indices in `doGet()`
- Check that amount is in the correct column

## 📱 Mobile Testing

Test on mobile devices to ensure:
- Form fields are easily tappable
- Payment numbers are readable
- Jersey size buttons work well
- Submit button is accessible

---

**Need Help?** Contact the development team at ssc2019@example.com