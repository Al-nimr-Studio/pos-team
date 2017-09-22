import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { DeskboardComponent } from "../components/deskboard.component";
import { AppMainComponent } from "../components/app-main.component";

import { SupplierComponent } from "../components/Supplier/Supplier";//  add azhar
import { InventoryItemReadComponent } from "../components/InventoryItem/InventoryItemRead";

// faheem
import { CustomerReadComponent } from "../components/Customer/Customer";

import { SalesQuoteReadComponent } from "../components/SalesQuote/SalesQuote";
import { SalesQuoteEditComponent } from "../components/SalesQuote/SalesQuoteEdit";
import { SalesQuoteviewComponent } from "../components/SalesQuote/SalesQuoteRead";
import { NewSalesQuoteReadComponent } from "../components/SalesQuote/NewSalesQuote";

// sales Order AppMainComponent
import { SalesOrderReadComponent } from "../components/SalesOrder/SalesOrder";
import { SalesOrderEditComponent } from "../components/SalesOrder/SalesOrderEdit";
import { SalesOrderviewComponent } from "../components/SalesOrder/SalesOrderRead";
import { NewSalesOrderReadComponent } from "../components/SalesOrder/NewSalesOrder";

// sales Invoice AppMainComponent
import { SalesInvoiceReadComponent } from "../components/SalesInvoice/SalesInvoice";
import { SalesInvoiceEditComponent } from "../components/SalesInvoice/SalesInvoiceEdit";
import { SalesInvoiceviewComponent } from "../components/SalesInvoice/SalesInvoiceRead";
import { NewSalesInvoiceReadComponent } from "../components/SalesInvoice/NewSalesInvoice";

// Delivery Notes AppMainComponent
import { DeliveryNotesReadComponent } from "../components/DeliveryNotes/DeliveryNotes";
import { DeliveryNotesEditComponent } from "../components/DeliveryNotes/DeliveryNotesEdit";
import { DeliveryNotesviewComponent } from "../components/DeliveryNotes/DeliveryNotesRead";
import { NewDeliveryNotesReadComponent } from "../components/DeliveryNotes/NewDeliveryNotes";

// Purchase Order AppMainComponent
import { PurchaseOrderReadComponent } from "../components/PurchaseOrder/PurchaseOrder";
import { PurchaseOrderEditComponent } from "../components/PurchaseOrder/PurchaseOrderEdit";
import { PurchaseOrderviewComponent } from "../components/PurchaseOrder/PurchaseOrderRead";
import { NewPurchaseOrderReadComponent } from "../components/PurchaseOrder/NewPurchaseOrder";

// Purchase Invoice AppMainComponent
import { PurchaseInvoiceReadComponent } from "../components/PurchaseInvoice/PurchaseInvoice";
import { PurchaseInvoiceEditComponent } from "../components/PurchaseInvoice/PurchaseInvoiceEdit";
import { PurchaseInvoiceviewComponent } from "../components/PurchaseInvoice/PurchaseInvoiceRead";
import { NewPurchaseInvoiceReadComponent } from "../components/PurchaseInvoice/NewPurchaseInvoice";

// Journal Entry components
import { JournalEntryReadComponent } from "../components/JournalEntry/JournalEntry";
import { JournalEntryEditComponent } from "../components/JournalEntry/JournalEntryEdit";
import { JournalEntryviewComponent } from "../components/JournalEntry/JournalEntryRead";
import { NewJournalEntryReadComponent } from "../components/JournalEntry/NewJournalEntry";

// summary report setting business detail
import { SummaryReadComponent } from "../components/Summary/Summary";
import {ReportsReadComponent } from "../components/Reports/Reports";
import {SettingsReadComponent } from "../components/Settings/Settings";
import {BusinessDetail } from "../components/Settings/BusinessDetail";

// Expense  Component
import { ExpenseReadComponent } from "../components/Expense/Expense";
import { ExpenseEditComponent } from "../components/Expense/ExpenseEdit";
import { ExpenseviewComponent } from "../components/Expense/ExpenseRead";
import { NewExpenseReadComponent } from "../components/Expense/NewExpense";

// expense category component
import { ExpenseCategories } from "../components/ExpenseCategories/ExpenseCategories";




const AppRoutes: Routes = [
    { path: '', redirectTo: '/deskboard', pathMatch: 'full' },
    { path: 'deskboard', component: DeskboardComponent },


    //azhar
    { path: 'SupplierComponent', component: SupplierComponent },
    { path: 'InventoryItemRead', component: InventoryItemReadComponent },
    { path: 'PurchaseInvoiceRead', component: PurchaseInvoiceReadComponent },


    //faheem
    { path: 'Customer', component: CustomerReadComponent },


    //              Sales Quotes Component

    { path: 'SalesQuote', component: SalesQuoteReadComponent },
    { path: 'SalesQuoteRead/:id', component: SalesQuoteviewComponent },
    { path: 'NewSalesQuote', component: NewSalesQuoteReadComponent },
    { path: 'SalesQuoteEdit/:id', component: SalesQuoteEditComponent },

    //              Sales Order

    { path: 'SalesOrder', component: SalesOrderReadComponent },
    { path: 'SalesOrderRead/:id', component: SalesOrderviewComponent },
    { path: 'NewSalesOrder', component: NewSalesOrderReadComponent },
    { path: 'SalesOrderEdit/:id', component: SalesOrderEditComponent },

    //              Sales Invoice

    { path: 'SalesInvoice', component: SalesInvoiceReadComponent },
    { path: 'SalesInvoiceRead/:id', component: SalesInvoiceviewComponent },
    { path: 'NewSalesInvoice', component: NewSalesInvoiceReadComponent },
    { path: 'SalesInvoiceEdit/:id', component: SalesInvoiceEditComponent },

    //              Delivery Notes

    { path: 'DeliveryNotes', component: DeliveryNotesReadComponent },
    { path: 'DeliveryNotesRead/:id', component: DeliveryNotesviewComponent },
    { path: 'NewDeliveryNotes', component: NewDeliveryNotesReadComponent },
    { path: 'DeliveryNotesEdit/:id', component: DeliveryNotesEditComponent },


    //              Purchase Order

    { path: 'PurchaseOrder', component: PurchaseOrderReadComponent },
    { path: 'PurchaseOrderRead/:id', component: PurchaseOrderviewComponent },
    { path: 'NewPurchaseOrder', component: NewPurchaseOrderReadComponent },
    { path: 'PurchaseOrderEdit/:id', component: PurchaseOrderEditComponent },


    //              Sales Invoice

    { path: 'SalesInvoice', component: SalesInvoiceReadComponent },
    { path: 'SalesInvoiceRead/:id', component: SalesInvoiceviewComponent },
    { path: 'NewSalesInvoice', component: NewSalesInvoiceReadComponent },
    { path: 'SalesInvoiceEdit/:id', component: SalesInvoiceEditComponent },


    //              Purchase Invoice

    { path: 'PurchaseInvoice', component: PurchaseInvoiceReadComponent },
    { path: 'PurchaseInvoiceRead/:id', component: PurchaseInvoiceviewComponent },
    { path: 'NewPurchaseInvoice', component: NewPurchaseInvoiceReadComponent },
    { path: 'PurchaseInvoiceEdit/:id', component: PurchaseInvoiceEditComponent },

    //            Journal Entry
    { path: 'JournalEntry', component: JournalEntryReadComponent },
    { path: 'JournalEntryRead/:id', component: JournalEntryviewComponent },
    { path: 'NewJournalEntry', component: NewJournalEntryReadComponent },
    { path: 'JournalEntryEdit/:id', component: JournalEntryEditComponent },
 
    // summary reports setting business detail
     { path: 'Summary', component: SummaryReadComponent },
     { path: 'Reports', component: ReportsReadComponent },
     { path: 'Settings', component: SettingsReadComponent },
     { path: 'BusinessDetail', component: BusinessDetail},

       //              Expense component

    { path: 'Expense', component: ExpenseReadComponent },
    { path: 'ExpenseRead/:id', component: ExpenseviewComponent },
    { path: 'NewExpense', component: NewExpenseReadComponent },
    { path: 'ExpenseEdit/:id', component: ExpenseEditComponent },
    
    //  Expense Categories
    { path: 'ExpenseCategories', component: ExpenseCategories},
   
];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
