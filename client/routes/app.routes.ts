import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { DeskboardComponent } from "../components/deskboard.component";
import { AppMainComponent } from "../components/app-main.component";

import { CreateformComponent } from "../components/crud/Createform.component";
import { ReadformComponent } from "../components/crud/Readform.component";
import { DeleteformComponent } from "../components/crud/Deleteform.component";
import { UpdateformComponent } from "../components/crud/Updateform.component";
import { AllinoneComponent } from "../components/crud/allinone.component";
import { UpdatemodalComponent } from "../components/crud/Updatemodal.component";

import { SupplierComponent } from "../components/Supplier/Supplier";//  add azhar
import { InventoryItemReadComponent } from "../components/InventoryItem/InventoryItemRead";
import { PurchaseInvoiceReadComponent } from "../components/PurchaseInvoice/PurchaseInvoiceRead";
import { PurchaseOrder } from "../components/PurchaseOrder/PurchaseOrder";

const AppRoutes: Routes = [
    { path: '', redirectTo: '/deskboard', pathMatch: 'full' },
    { path: 'deskboard', component: DeskboardComponent },

    { path: 'createform', component: CreateformComponent },
    { path: 'update/:id', component: UpdatemodalComponent },
    { path: 'update', component: UpdatemodalComponent },
    { path: 'readform', component: ReadformComponent },
    { path: 'deleteform', component: DeleteformComponent },
    { path: 'allinone', component: AllinoneComponent },
    { path: 'updateform', component: UpdateformComponent },
    { path: 'SupplierComponent', component: SupplierComponent },//azhar
    { path: 'InventoryItemRead', component: InventoryItemReadComponent },
    { path: 'PurchaseInvoiceRead', component: PurchaseInvoiceReadComponent },
    { path: 'PurchaseOrder', component: PurchaseOrder },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
