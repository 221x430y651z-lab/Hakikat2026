function doGet() {
  var sayfa = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sayfa.appendRow([new Date(), "Ziyaretçi Geldi"]);
  return ContentService.createTextOutput("Tamam");
}
