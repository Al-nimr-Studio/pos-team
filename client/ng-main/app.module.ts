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

import {SidebarComponent} from "../components/layout/sidebar.component";
import {NavbarComponent} from "../components/layout/navbar.component";
import {FooterComponent} from "../components/layout/footer.component";
import {ThemeComponent} from "../components/layout/theme.component";

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

// import {CrudService} from "../services/crud.service";
import {FileService} from "../components/fs/service/file.service";

import {CrudService} from "../components/crud/service/crud.service";
import {View1Service} from "../components/view1/service/view1.service";
import {View2Service} from "../components/view2/service/view2.service";



// enableProdMode();



@NgModule({
    imports: [BrowserModule,
    		  HttpModule,
    		  FormsModule,
              routing, 
              RouterModule,
    		  ReactiveFormsModule],
  declarations: [
        AppMainComponent,
       DeskboardComponent,

       SidebarComponent,
       NavbarComponent,
       FooterComponent,
       ThemeComponent,

       CreateformComponent,
       ReadformComponent,
       DeleteformComponent,
       UpdateformComponent,
       UpdatemodalComponent,
       AllinoneComponent,

       DeleteFilesComponent,
       FullFsComponent,
       UploadFilesComponent,
       UpdateFilesComponent,
       ViewFilesComponent,

       View1createComponent,
       View1readComponent,
       View1deleteComponent,
       View1updateComponent,

       View2createComponent,
       View2readComponent,
       View2deleteComponent,
       View2updateComponent




        ],
  providers:[
      CrudService,FileService,View1Service,View2Service,
      {provide: LocationStrategy, useClass: HashLocationStrategy},

      {provide: LocationStrategy, useClass: HashLocationStrategy}

  ],
    bootstrap: [AppMainComponent]
})

export class AppModule {}