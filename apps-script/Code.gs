/**
 * Google Apps Script — deploy as Web App for Glam Room bookings
 *
 * Setup:
 * 1. Create a Google Sheet with headers in row 1:
 *    Timestamp | Full Name | Phone | Email | Location | Service | Date | Time | Notes | Status
 * 2. Extensions → Apps Script → paste this file
 * 3. Set SHEET_NAME below to your sheet tab name
 * 4. Deploy → New deployment → Web app
 *    Execute as: Me | Who has access: Anyone
 * 5. Copy the Web App URL into data.js → booking.googleScriptUrl
 */

const SHEET_NAME = 'Bookings';

function doGet(e) {
  const action = e.parameter.action;
  const date = e.parameter.date;

  if (action === 'get' && date) {
    return jsonResponse({ bookedTimes: getBookedTimesForDate(date) });
  }

  return jsonResponse({ ok: true, message: 'Glam Room booking API' });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.action === 'add') {
      addBooking(data);
      return jsonResponse({ ok: true });
    }

    return jsonResponse({ ok: false, error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Full Name', 'Phone', 'Email', 'Location', 'Service', 'Date', 'Time', 'Notes', 'Status']);
  }
  return sheet;
}

function addBooking(data) {
  const sheet = getSheet();
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.fullName || '',
    data.phone || '',
    data.email || '',
    data.location || '',
    data.service || '',
    data.date || '',
    data.time || '',
    data.notes || '',
    data.status || 'Pending',
  ]);
}

function getBookedTimesForDate(date) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const booked = [];

  for (let i = 1; i < rows.length; i++) {
    const rowDate = formatDate(rows[i][6]);
    const rowTime = rows[i][7];
    if (rowDate === date && rowTime) {
      booked.push(String(rowTime));
    }
  }

  return booked;
}

function formatDate(value) {
  if (!value) return '';
  if (value instanceof Date) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return String(value).substring(0, 10);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
