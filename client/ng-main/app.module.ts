import './polyfills';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {enableProdMode} from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';




import {routing} from "../routes/app.routes";
import {AppMainComponent} from "../components/app-main.component";
import {DeskboardComponent} from "../components/deskboard.component";


import {CreateformComponent} from "../components/crud/Createform.component";
import {ReadformComponent} from "../components/crud/Readform.component";
import {DeleteformComponent} from "../components/crud/Deleteform.component";
import {UpdateformComponent} from "../components/crud/Updateform.component";
import {AllinoneComponent} from "../components/crud/allinone.component";
import {UpdatemodalComponent} from "../components/crud/Updatemodal.component";

//declare component
import { SupplierComponent } from "../components/Supplier/Supplier";//azhar
import { InventoryItemReadComponent } from "../components/InventoryItem/InventoryItemRead";
import { PurchaseInvoiceReadComponent } from "../components/PurchaseInvoice/PurchaseInvoiceRead";
import { PurchaseOrder } from "../components/PurchaseOrder/PurchaseOrder";



//declare services

import {CrudService} from "../components/crud/service/crud.service";
import { SupplierService } from "../components/Supplier/Service/Supplier.service";//azhar
import { InventoryItemService } from "../components/InventoryItem/Service/InventoryItem.service";
import { PurchaseInvoiceService } from "../components/PurchaseInvoice/Service/PurchaseInvoice.service";
import { PurchaseOrderService } from "../components/PurchaseOrder/Service/PurchaseOrder.service";



import {InputTextModule,DataTableModule,ButtonModule,DialogModule,DataListModule,FileUploadModule,GrowlModule} from 'primeng/primeng';

// enableProdMode();



@NgModule({
    imports: [BrowserModule,
    		  HttpModule,
    		  FormsModule,
              routing, 
              RouterModule,
    		  ReactiveFormsModule,
              InputTextModule,DataTableModule,ButtonModule,DialogModule,DataListModule,FileUploadModule,GrowlModule],
  declarations: [
        AppMainComponent,
       DeskboardComponent,

       CreateformComponent,
       ReadformComponent,
       DeleteformComponent,
       UpdateformComponent,
       UpdatemodalComponent,
       AllinoneComponent,

        SupplierComponent,//azhar
        InventoryItemReadComponent,
        PurchaseInvoiceReadComponent,
        PurchaseOrder,


        ],
  providers:[
      CrudService,SupplierService,InventoryItemService, PurchaseInvoiceService,PurchaseOrderService,
      {provide: LocationStrategy, useClass: HashLocationStrategy},


  ],
    bootstrap: [AppMainComponent]
})

export class AppModule {}