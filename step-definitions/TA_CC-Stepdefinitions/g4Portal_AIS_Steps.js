import { Given, When, Then } from '@cucumber/cucumber';
import G4portal from '../../page-objects/g4Portal_AIS_PageObjects';
import JeeFourPortal from '../../page-objects/CCModUpsellObject'

When(/^I navigate to G4 portal$/, async () => {
  await JeeFourPortal.navigateToG4portal()
});

When(/^I validate site$/, async () => {
  await G4portal.siteIssues();
  await G4portal.authIssue();
});

When(/^I select "(.+)"$/, async (app) => {
  if (process.env.ENV.includes("prod") && app.includes("AIS")) {
    await G4portal.selectAIS();
  } else if (process.env.ENV.includes("prod") && app.includes("MOD")) {
    await G4portal.selectMOD();
  } else {
    await G4portal.selectAppFromG4Portal(app);
  }
});

When(/^I validate Transancation$/, async function () {
  // await browser.pause(10000)
  // if (process.env.ENV.includes("okd") && !process.env.tag.includes("prod")&& !process.env.ENV.includes("qatcustjny")) {
  //   if (process.env.ENV.includes("qatnexusg4.okd")) {
  //     process.env.atl = "PCWVXX"
  //   } else if (process.env.ENV.includes("intnexusg4.okd")) {
  //     process.env.atl = "HDY49R"
  //   }
  //   await G4portal.ATLTranscation();
  // }

});

When(/^I verify the MOD access$/, async () => {
  await G4portal.accessMOD();
});
When(/^I verify the SVT access$/, async () => {
  await G4portal.accessSVT();
});
When(/^I verify the BAG access$/, async () => {
  await G4portal.accessBag();
});
When(/^I verify the PB access$/, async () => {
  await G4portal.accessPB();
});
When(/^I verify the TF access$/, async () => {
  await G4portal.accessTF();
});
When(/^I verify the CAR access$/, async () => {
  await G4portal.accessCAR();
});
When(/^I verify the HOT access$/, async () => {
  await G4portal.accessHOT();
});
When(/^I verify the ATL access$/, async () => {
  await G4portal.accessATL();
});
When(/^I verify the STS access$/, async () => {
  await G4portal.accessSTS();
});
When(/^I verify the ESP access$/, async () => {
  await G4portal.accessESP();
});
When(/^I verify the CL access$/, async () => {
  await G4portal.accessCL();
});
When(/^I verify the RQ access$/, async () => {
  await G4portal.accessRQ();
});
When(/^I click Reservation$/, async () => {
  await G4portal.selectReservation();
});
When(/^I click Print manifest$/, async () => {
  await G4portal.selectPrintManifest();
});
When(/^I select a flight for a particular location$/, async () => {
  await G4portal.selectFlight();
});
When(/^I verify the flight manifest for All Passenger tick mark and the passenger details table$/, async () => {
  await G4portal.verifyPrintManifest();
});
When(/^I click Flight information$/, async () => {
  await G4portal.flightInformation()
});
When(/^I click Flight flow$/, async () => {
  await G4portal.selectFlightFlow()
});
When(/^I select aircraft group and click submit button$/, async () => {
  await G4portal.selectGroup()
});
When(/^I verify the display of flight flow table$/, async () => {
  await G4portal.flowTable()
});
When(/^I select Kayak Console$/, async () => {
  await G4portal.selectKayakConsole()
});
When(/^I verify and edit Kayak Console$/, async () => {
  await G4portal.editKayakConsole()
});
When(/^I click Inventory$/, async () => {
  await G4portal.selectInventory()
});
When(/^I click Inventory Maintenance$/, async () => {
  await G4portal.selectInventoryMaintenance()
});
When(/^I select first Inventory$/, async () => {
  await G4portal.selectAnyInventory()
});
When(/^I click Transaction Tab$/, async () => {
  await G4portal.transactionTab()
});
When(/^I verify the Inventory Transactions$/, async () => {
  await G4portal.verifyTransactions()
});
When(/^I click Flight following$/, async () => {
  await G4portal.selectFlightFollowing()
});
When(/^I select the first flight in the grid$/, async () => {
  await G4portal.selectingFlight()
});
When(/^I verify the flight number is reflected in the header$/, async () => {
  await G4portal.verifyFlightInformation()
});
When(/^I click Maintenance and Engineering$/, async () => {
  await G4portal.selectMaintenanceAndEngineering()
});
When(/^I click on modules "(.+)"$/, async (types) => {
  await G4portal.selectingSubModules(types)
});
When(/^I click Reports$/, async () => {
  await G4portal.selectReports()
});
When(/^I click Flight log$/, async () => {
  await G4portal.selectFlightLog()
});
When(/^I provide tail number and click on Run Report$/, async () => {
  await G4portal.fillReportOption()
});
When(/^I verify the results in all the report of "([^"]*)"$/, async (types) => {
  await G4portal.verifyReports(types)
});
When(/^I click Maintenance operation$/, async () => {
  await G4portal.Maintenance_operation()
});
When(/^I click Aircraft records$/, async () => {
  await G4portal.selectAircraftRecord()
});
When(/^I click Lookup button in the lookup Options window$/, async () => {
  await G4portal.clickLookupButton()
});
When(/^I verify the results in Aircraft records table$/, async () => {
  await G4portal.lookupAircraftPart()
});
When(/^I select MX and Engr$/, async () => {
  await G4portal.selectMXandEngr()
});
When(/^I select MX Records$/, async () => {
  await G4portal.selectMXRecords()
});
When(/^I verify lookup Action Request$/, async () => {
  await G4portal.lookupActionRequest()
});
When(/^I click Account payable$/, async () => {
  await G4portal.accountsPayable()
});
When(/^I click Account payable maintenance$/, async () => {
  await G4portal.selectAccountPayableMaintenance()
});
When(/^I fill lookup with Vendor id, Status and location$/, async () => {
  await G4portal.fillVendorLookup()
});
When(/^I click submit button$/, async () => {
  await G4portal.payableSubmit()
});
When(/^I select the vendor00005$/, async () => {
  await G4portal.selectVendor()
});
When(/^I click analysis tab to take order number and type$/, async () => {
  await G4portal.selectAnalysisTab()
});
When(/^I verify the lookup invoice, order and payment in transaction tab$/, async () => {
  await G4portal.verifyOrders()
});