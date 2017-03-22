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


import { CreateformComponent } from "../components/crud/Createform.component";
import { ReadformComponent } from "../components/crud/Readform.component";
import { DeleteformComponent } from "../components/crud/Deleteform.component";
import { UpdateformComponent } from "../components/crud/Updateform.component";
import { AllinoneComponent } from "../components/crud/allinone.component";
import { UpdatemodalComponent } from "../components/crud/Updatemodal.component";

//declare component azhar
import { SupplierComponent } from "../components/Supplier/Supplier";
import { InventoryItemReadComponent } from "../components/InventoryItem/InventoryItemRead";
import { PurchaseInvoiceReadComponent } from "../components/PurchaseInvoice/PurchaseInvoiceRead";
import { PurchaseOrder } from "../components/PurchaseOrder/PurchaseOrder";

// ts components faheem
import { CustomerReadComponent } from "../components/Customer/Customer";
import { SalesOrderReadComponent } from "../components/SalesOrder/SalesOrder";
import { SalesQuoteReadComponent } from "../components/SalesQuote/SalesQuote";
import { SalesInvoiceReadComponent } from "../components/SalesInvoice/SalesInvoice";
import { DeliveryNotesReadComponent } from "../components/DeliveryNotes/DeliveryNotes";
import { MyBusinessDetailsReadComponent } from "../components/MyBusinessDetails/MyBusinessDetails";

//declare servicesazhar

import { CrudService } from "../components/crud/service/crud.service";
import { SupplierService } from "../components/Supplier/Service/Supplier.service";
import { InventoryItemService } from "../components/InventoryItem/Service/InventoryItem.service";
import { PurchaseInvoiceService } from "../components/PurchaseInvoice/Service/PurchaseInvoice.service";
import { PurchaseOrderService } from "../components/PurchaseOrder/Service/PurchaseOrder.service";

//declare services faheem
import { CustomerService } from "../components/Customer/Service/Customer.service";
import { SalesOrderService } from "../components/SalesOrder/Service/SalesOrder.service";
import { SalesQuoteService } from "../components/SalesQuote/Service/SalesQuote.service";
import { SalesInvoiceService } from "../components/SalesInvoice/Service/SalesInvoice.service";
import { DeliveryNotesService } from "../components/DeliveryNotes/Service/DeliveryNotes.service";
import { MyBusinessDetailsService } from "../components/MyBusinessDetails/Service/MyBusinessDetails.service";



import { InputTextModule, DataTableModule, ButtonModule, DialogModule, DataListModule, FileUploadModule, GrowlModule, } from 'primeng/primeng';

// enableProdMode();



@NgModule({
    imports: [BrowserModule,
        HttpModule,
        FormsModule,
        CustomFormsModule,
        routing,
        RouterModule,
        ReactiveFormsModule,
        InputTextModule, DataTableModule, ButtonModule, DialogModule, DataListModule, FileUploadModule, GrowlModule],
    declarations: [
        AppMainComponent,
        DeskboardComponent,

        CreateformComponent,
        ReadformComponent,
        DeleteformComponent,
        UpdateformComponent,
        UpdatemodalComponent,
        AllinoneComponent,

        //azhar
        SupplierComponent,
        InventoryItemReadComponent,
        PurchaseInvoiceReadComponent,
        PurchaseOrder,

        // all read form components faheem
        CustomerReadComponent,
        SalesOrderReadComponent,
        SalesQuoteReadComponent,
        SalesInvoiceReadComponent,
        DeliveryNotesReadComponent,
        MyBusinessDetailsReadComponent,

    ],
    providers: [
        CrudService, SupplierService, InventoryItemService, PurchaseInvoiceService, PurchaseOrderService,
        CustomerService, SalesOrderService, SalesQuoteService, SalesInvoiceService, DeliveryNotesService, MyBusinessDetailsService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },


    ],
    bootstrap: [AppMainComponent]
})

export class AppModule { }