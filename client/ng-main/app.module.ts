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

import {CrudService} from "../components/crud/service/crud.service";


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





        ],
  providers:[
      CrudService,
      {provide: LocationStrategy, useClass: HashLocationStrategy},


  ],
    bootstrap: [AppMainComponent]
})

export class AppModule {}