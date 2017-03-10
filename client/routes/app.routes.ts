import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {DeskboardComponent} from "../components/deskboard.component";
import {AppMainComponent} from "../components/app-main.component";

import {CreateformComponent} from "../components/crud/Createform.component";
import {ReadformComponent} from "../components/crud/Readform.component";
import {DeleteformComponent} from "../components/crud/Deleteform.component";
import {UpdateformComponent} from "../components/crud/Updateform.component";
import {AllinoneComponent} from "../components/crud/allinone.component";
import {UpdatemodalComponent} from "../components/crud/Updatemodal.component";


import {DeleteFilesComponent} from "../components/fs/delete-files.component";
import {FullFsComponent} from "../components/fs/full-fs.component";
import {UploadFilesComponent} from "../components/fs/upload-files.component";
import {UpdateFilesComponent} from "../components/fs/Update-files.component";
import {ViewFilesComponent} from "../components/fs/view-files.component";

import {View1createComponent} from "../components/view1/view1.create.component";
import {View1readComponent} from "../components/view1/view1.read.component";
import {View1deleteComponent} from "../components/view1/view1.delete.component";
import {View1updateComponent} from "../components/view1/view1.update.component";

import {View2createComponent} from "../components/view2/view2.create.component";
import {View2readComponent} from "../components/view2/view2.read.component";
import {View2deleteComponent} from "../components/view2/view2.delete.component";
import {View2updateComponent} from "../components/view2/view2.update.component";

import {SupplierupdateComponent} from "../components/supplier/supplier.update";
import {SupplierreadComponent} from "../components/supplier/supplier.read";
import {SuppliercreateComponent} from "../components/supplier/supplier.create";

const AppRoutes:Routes = [
 {path:'', redirectTo:'/deskboard',pathMatch:'full'},
    {path:'deskboard',component: DeskboardComponent},

    {path:'createform',component: CreateformComponent},
    {path:'update/:id',component: UpdatemodalComponent},
    {path:'update',component: UpdatemodalComponent},
    {path:'readform',component: ReadformComponent},
    {path:'deleteform',component: DeleteformComponent},
    {path:'allinone',component: AllinoneComponent},
    {path:'updateform',component: UpdateformComponent},

    {path:'deletefiles',component: DeleteFilesComponent},
    {path:'fullfs',component: FullFsComponent},
    {path:'uploadfiles',component: UploadFilesComponent},
    {path:'updatefiles',component: UpdateFilesComponent},
    {path:'viewfiles',component: ViewFilesComponent},

    {path:'view1create',component: View1createComponent},
    {path:'View1read',component: View1readComponent},
    {path:'View1delete',component: View1deleteComponent},
    {path:'View1update',component: View1updateComponent},
    


    {path:'View2create',component: View2createComponent},
    {path:'View2read',component: View2readComponent},
    {path:'View2delete',component: View2deleteComponent},
    {path:'View2update',component: View2updateComponent},

    {path:'Supplierupdate',component: SupplierupdateComponent},
    {path:'Supplierread',component: SupplierreadComponent},
    {path:'Suppliercreate',component: SuppliercreateComponent},
];

export const routing:ModuleWithProviders = RouterModule.forRoot(AppRoutes);
