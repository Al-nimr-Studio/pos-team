import './polyfills';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation'



import { routing } from "../routes/app.routes";
import { AppMainComponent } from "../components/app-main.component";
import { DeskboardComponent } from "../components/deskboard.component";


//declare component azhar
import { SupplierComponent } from "../components/Supplier/Supplier";
import { InventoryItemReadComponent } from "../components/InventoryItem/InventoryItemRead";

// ts components faheem
import { CustomerReadComponent } from "../components/Customer/Customer";

// Sale Quotes Component
import { SalesQuoteReadComponent } from "../components/SalesQuote/SalesQuote";
import { SalesQuoteEditComponent } from "../components/SalesQuote/SalesQuoteEdit";
import { SalesQuoteviewComponent } from "../components/SalesQuote/SalesQuoteRead";
import { NewSalesQuoteReadComponent } from "../components/SalesQuote/NewSalesQuote";

// Sale Order Component
import { SalesOrderReadComponent } from "../components/SalesOrder/SalesOrder";
import { SalesOrderEditComponent } from "../components/SalesOrder/SalesOrderEdit";
import { SalesOrderviewComponent } from "../components/SalesOrder/SalesOrderRead";
import { NewSalesOrderReadComponent } from "../components/SalesOrder/NewSalesOrder";


// Sale Invoice Component
import { SalesInvoiceReadComponent } from "../components/SalesInvoice/SalesInvoice";
import { SalesInvoiceEditComponent } from "../components/SalesInvoice/SalesInvoiceEdit";
import { SalesInvoiceviewComponent } from "../components/SalesInvoice/SalesInvoiceRead";
import { NewSalesInvoiceReadComponent } from "../components/SalesInvoice/NewSalesInvoice";


// Sale Delivery Notes Component
import { DeliveryNotesReadComponent } from "../components/DeliveryNotes/DeliveryNotes";
import { DeliveryNotesEditComponent } from "../components/DeliveryNotes/DeliveryNotesEdit";
import { DeliveryNotesviewComponent } from "../components/DeliveryNotes/DeliveryNotesRead";
import { NewDeliveryNotesReadComponent } from "../components/DeliveryNotes/NewDeliveryNotes";


// Purchase Order Component
import { PurchaseOrderReadComponent } from "../components/PurchaseOrder/PurchaseOrder";
import { PurchaseOrderEditComponent } from "../components/PurchaseOrder/PurchaseOrderEdit";
import { PurchaseOrderviewComponent } from "../components/PurchaseOrder/PurchaseOrderRead";
import { NewPurchaseOrderReadComponent } from "../components/PurchaseOrder/NewPurchaseOrder";



// Purchase Invoice Component
import { PurchaseInvoiceReadComponent } from "../components/PurchaseInvoice/PurchaseInvoice";
import { PurchaseInvoiceEditComponent } from "../components/PurchaseInvoice/PurchaseInvoiceEdit";
import { PurchaseInvoiceviewComponent } from "../components/PurchaseInvoice/PurchaseInvoiceRead";
import { NewPurchaseInvoiceReadComponent } from "../components/PurchaseInvoice/NewPurchaseInvoice";

// Journal Entrty Component
import { JournalEntryReadComponent } from "../components/JournalEntry/JournalEntry";
import { JournalEntryEditComponent } from "../components/JournalEntry/JournalEntryEdit";
import { JournalEntryviewComponent } from "../components/JournalEntry/JournalEntryRead";
import { NewJournalEntryReadComponent } from "../components/JournalEntry/NewJournalEntry";

// Summary Report setting business detail component
import {SummaryReadComponent } from "../components/Summary/Summary";
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


//declare servicesazhar

import { SupplierService } from "../components/Supplier/Service/Supplier.service";
import { InventoryItemService } from "../components/InventoryItem/Service/InventoryItem.service";
import { PurchaseInvoiceService } from "../components/PurchaseInvoice/Service/PurchaseInvoice.service";
import { PurchaseOrderService } from "../components/PurchaseOrder/Service/PurchaseOrder.service";

import { JournalEntryService } from "../components/JournalEntry/Service/JournalEntry.service";
import { SummaryService } from "../components/Summary/Service/Summary.service";
import { ReportsService } from "../components/Reports/Service/Reports.service";
import { SettingsService } from "../components/Settings/Service/Settings.service";

import { ExpenseService } from "../components/Expense/Service/Expense.service";
import { ExpenseCategoriesService } from "../components/ExpenseCategories/Service/ExpenseCategories.service";


//declare services faheem
import { CustomerService } from "../components/Customer/Service/Customer.service";
import { SalesOrderService } from "../components/SalesOrder/Service/SalesOrder.service";
import { SalesQuoteService } from "../components/SalesQuote/Service/SalesQuote.service";
import { SalesInvoiceService } from "../components/SalesInvoice/Service/SalesInvoice.service";
import { DeliveryNotesService } from "../components/DeliveryNotes/Service/DeliveryNotes.service";



// import { InputTextModule, DataTableModule, ButtonModule, DialogModule, DataListModule, FileUploadModule, GrowlModule, } from 'primeng/primeng';

// enableProdMode();



@NgModule({
    imports: [BrowserModule,
        HttpModule,
        FormsModule,
        CustomFormsModule,
        routing,
        RouterModule,
        ReactiveFormsModule,
        // InputTextModule, DataTableModule, ButtonModule, DialogModule, DataListModule, FileUploadModule, GrowlModule
        ],
    declarations: [
        AppMainComponent,
        DeskboardComponent,

        //azhar
        SupplierComponent,
        InventoryItemReadComponent,
        PurchaseInvoiceReadComponent,


        // all read form components faheem
        CustomerReadComponent,

        // for Sales Qoutes
        SalesQuoteReadComponent,
        SalesQuoteEditComponent,
        SalesQuoteviewComponent,
        NewSalesQuoteReadComponent,

        // for Sales Order
        SalesOrderReadComponent,
        SalesOrderEditComponent,
        SalesOrderviewComponent,
        NewSalesOrderReadComponent,


        // for Sales Invoice
        SalesInvoiceReadComponent,
        SalesInvoiceEditComponent,
        SalesInvoiceviewComponent,
        NewSalesInvoiceReadComponent,


        // for DeliveryNotes
        DeliveryNotesReadComponent,
        DeliveryNotesEditComponent,
        DeliveryNotesviewComponent,
        NewDeliveryNotesReadComponent,



        // for Purchase Order
        PurchaseOrderReadComponent,
        PurchaseOrderEditComponent,
        PurchaseOrderviewComponent,
        NewPurchaseOrderReadComponent,


        // for Purchase Invoice
        PurchaseInvoiceReadComponent,
        PurchaseInvoiceEditComponent,
        PurchaseInvoiceviewComponent,
        NewPurchaseInvoiceReadComponent,

        // for Expense
        ExpenseReadComponent,
        ExpenseEditComponent,
        ExpenseviewComponent,
        NewExpenseReadComponent,

        // for Expense Categories
        ExpenseCategories,
         

        // for Journal Entry
        JournalEntryReadComponent,
        JournalEntryEditComponent,
        JournalEntryviewComponent,
        NewJournalEntryReadComponent,
 
       // for summary reports settings business detail
        SummaryReadComponent,
        ReportsReadComponent,
        SettingsReadComponent,
        BusinessDetail,
     
    ],
    providers: [
        SupplierService, InventoryItemService, PurchaseInvoiceService, PurchaseOrderService,
        CustomerService, SalesOrderService, SalesQuoteService, SalesInvoiceService, DeliveryNotesService, 
        JournalEntryService,SummaryService,
        ReportsService, SettingsService,ExpenseService,ExpenseCategoriesService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },


    ],
    bootstrap: [AppMainComponent]
})

export class AppModule { }
