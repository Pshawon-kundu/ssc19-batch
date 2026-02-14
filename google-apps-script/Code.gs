// --------------------------------------------------
// CONFIG: Your new sheet ID
// --------------------------------------------------
const SHEET_ID = "PASTE_YOUR_NEW_SPREADSHEET_ID_HERE";

// ------------------ Setup Sheets ------------------
function setup() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  
  // 1. Registrations Sheet
  let regSheet = spreadsheet.getSheetByName("registrations");
  if (!regSheet) {
    regSheet = spreadsheet.insertSheet("registrations");
    // Header for registrations
    regSheet.appendRow([
      "Timestamp", "Full Name", "Phone", "Package", "Jersey Size", 
      "Jersey Name", "Jersey Number", "Payment Method", 
      "Transaction ID", "Last 2 Digit", "Amount", "Status"
    ]);
    regSheet.setFrozenRows(1);
    Logger.log("Created 'registrations' sheet.");
  }

  // 2. Stats Sheet
  let statsSheet = spreadsheet.getSheetByName("stats");
  if (!statsSheet) {
    statsSheet = spreadsheet.insertSheet("stats");
    // Header for stats
    statsSheet.appendRow(["total_students", "total_money"]);
    // Initial values
    statsSheet.appendRow([0, 0]);
    Logger.log("Created 'stats' sheet.");
  }

  // 3. Logs Sheet
  let logsSheet = spreadsheet.getSheetByName("logs");
  if (!logsSheet) {
    logsSheet = spreadsheet.insertSheet("logs");
    logsSheet.appendRow(["Timestamp", "Type", "Content"]);
    Logger.log("Created 'logs' sheet.");
  }

  Logger.log("✅ Setup complete! Links to your spreadsheet.");
}

// ------------------ Helper: JSON Response ------------------
function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ------------------ Helper: Log ------------------
function logError(e, context) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    const logs = sheet.getSheetByName("logs");
    if (logs) {
      logs.appendRow([new Date(), "ERROR", context + ": " + e.toString()]);
    }
  } catch (err) {
    console.error("Logging failed: " + err);
  }
}

// ------------------ ACTION: Update Stats ------------------
// Recalculates total students and money from the registrations sheet
function updateStatsRecursive() {
  const doc = SpreadsheetApp.openById(SHEET_ID);
  const regSheet = doc.getSheetByName("registrations");
  const statsSheet = doc.getSheetByName("stats");

  if (!regSheet || !statsSheet) return { total_students: 0, total_money: 0 };

  const lastRow = regSheet.getLastRow();
  // If only header exists or empty
  if (lastRow < 2) {
    statsSheet.getRange("A2").setValue(0);
    statsSheet.getRange("B2").setValue(0);
    return { total_students: 0, total_money: 0 };
  }

  // Get all data columns (column 11 is Amount, index 10)
  // Data range: Row 2 to LastRow
  const data = regSheet.getRange(2, 1, lastRow - 1, 11).getValues();

  let totalStudents = 0;
  let totalMoney = 0;

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    // Check if row has valid name/phone to be counted
    if (row[1] && row[2]) {
      totalStudents++;
      const amount = parseFloat(row[10]); // Column K is index 10
      if (!isNaN(amount)) {
        totalMoney += amount;
      }
    }
  }

  // Update Stats Sheet
  statsSheet.getRange("A2").setValue(totalStudents);
  statsSheet.getRange("B2").setValue(totalMoney);

  return { total_students: totalStudents, total_money: totalMoney };
}

// ------------------ Web App: GET ------------------
function doGet(e) {
  try {
    const stats = updateStatsRecursive();
    return json(stats);
  } catch (err) {
    return json({ error: err.toString() });
  }
}

// ------------------ Web App: POST ------------------
// ------------------ Web App: POST ------------------
function doPost(e) {
  // Lock to prevent race conditions on stats updates
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); 
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: "Server busy, please try again." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const doc = SpreadsheetApp.openById(SHEET_ID);
    const regSheet = doc.getSheetByName("registrations");
    
    if (!regSheet) throw new Error("Registrations sheet not found. Run setup() first.");

    // 👇 IMPORTANT: get parameters from e.parameter instead of JSON
    // When using FormData, Apps Script populates e.parameter
    const data = e.parameter;

    // Validation
    if (!data.name || !data.phone || !data.amount) {
      throw new Error("Missing required fields: name, phone, or amount");
    }

    // Append Row
    regSheet.appendRow([
      new Date(),
      data.name,
      "'" + data.phone, // Force string for phone
      data.package || "",
      data.jerseySize || "",
      data.jerseyName || "",
      data.jerseyNumber || "",
      data.paymentMethod || "",
      data.transactionId || "",
      data.lastTwoDigit || "",
      Number(data.amount) || 0,
      "Confirmed"
    ]);

    // Update Stats Immediately
    const newStats = updateStatsRecursive();

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, stats: newStats }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    logError(err, "doPost");
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
