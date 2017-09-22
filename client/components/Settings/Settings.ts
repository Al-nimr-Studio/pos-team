import { Component, OnInit, OnDestroy } from "@angular/core";
import { SettingsInterface } from './Service/Settings.interface';
import { SettingsService } from './Service/Settings.service';
import { SettingsObserver } from './Service/Settings.observer';
import { NgForm, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

// let $ = require('../../../node_modules/jquery/dist/jquery.min.js');
// require('../../static/assets/js/bootstrap-table.js');
// require('../../static/assets/js/fresh-bootstrap-table.js');
// import '../../static/assets/js/bootstrap-table.js';
// import '../../static/assets/js/fresh-bootstrap-table.js';

// declare var table
// declare var bootstrapTable

// declare var $: any;
// declare var bootstrapTable: any;
// alertBtn
// declare var $alertBtn: any;
// declare var $:JQueryStatic;


@Component({
    selector: 'Settings',
    template: require('./BusinessDetail.html'),
    styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }
     .invoice-box{
        max-width:1600px;
        margin:auto;
        padding:30px;
        border:1px solid #eee;
        box-shadow:0 0 10px rgba(0, 0, 0, .15);
        font-size:16px;
        line-height:24px;
        font-family:'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color:#555;
    }
    
    .invoice-box table{
        width:100%;
        line-height:inherit;
        text-align:left;
    }
    
    .invoice-box table td{
        padding:5px;
        vertical-align:top;
    }
    
    .invoice-box table tr td:nth-child(2){
        text-align:right;
    }
    
    .invoice-box table tr.top table td{
        padding-bottom:20px;
    }
    
    .invoice-box table tr.top table td.title{
        font-size:45px;
        line-height:45px;
        color:#333;
    }
    
    .invoice-box table tr.information table td{
        padding-bottom:40px;
    }
    
    .invoice-box table tr.heading td{
        background:#eee;
        border-bottom:1px solid #ddd;
        font-weight:bold;
    }
    
    .invoice-box table tr.details td{
        padding-bottom:20px;
    }
    
    .invoice-box table tr.item td{
        border-bottom:1px solid #eee;
    }
    
    .invoice-box table tr.item.last td{
        border-bottom:none;
    }
    
    .invoice-box table tr.total td:nth-child(2){
        border-top:2px solid #eee;
        font-weight:bold;
    }
    
    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td{
            width:100%;
            display:block;
            text-align:center;
        }
        
        .invoice-box table tr.information table td{
            width:100%;
            display:block;
            text-align:center;
        }
    }
  `]

})
export class SettingsReadComponent implements OnInit, OnDestroy, SettingsObserver {
    entries: Array<SettingsInterface> = [];
    entry: SettingsInterface = new SettingsInterface(); 
    total;
    skip=0;
    limit=8;
    search;
    count=0;
    number:Array<SettingsInterface>=[];



    constructor( private repository: SettingsService) {
       
}

numbering(){
// z.5
}
row(value){
console.log(value);
 (<HTMLInputElement>document.getElementById('row')).innerHTML= value;
             this.repository.pagination(this.skip,value)
            .then((entries: Array<SettingsInterface>) => this.entries = entries)

}

    find(){
        if (this.search.length>0){

        this.repository.search(this.search)
            .then((entries: Array<SettingsInterface>) => this.entries = entries)
        }
         if (this.search.length==0){
 this.repository.pagination(this.skip,this.limit)
            .then((entries: Array<SettingsInterface>) => this.entries = entries)
         }
    }

    page(button){
        if (button === 'Next' && this.entries.length>=4) {
                    console.log("button 1 ")
                    this.skip += 4;
                    this.repository.pagination(this.skip,this.limit).then((entries: Array<SettingsInterface>) => this.entries = entries)

                                        console.log("value of skip "+ this.skip)
                                        console.log("lenth "+ this.entries.length)
                                    


        } 
     if(button === 'Prev' && this.skip>0) {
                    console.log("button 2 ")
                    this.skip -= 4;
                    this.repository.pagination(this.skip,this.limit).then((entries: Array<SettingsInterface>) => this.entries = entries)

                                        console.log("value of skip "+ this.skip)
                                        console.log("lenth "+ this.entries.length)


        }

        console.log("button pressed " + button)
    }

        extrem(button){
        if (button === 'first') {
                    console.log("button 1 ")
                    this.repository.pagination(this.skip,this.limit).then((entries: Array<SettingsInterface>) => this.entries = entries)

                                    

        } 
     if(button === 'last') {
                    console.log("button 2 ")
                    this.repository.pagination(this.skip,this.limit).then((entries: Array<SettingsInterface>) => this.entries = entries)

                                       

        }

        console.log("button pressed " + button)
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        // this.repository.fetchEntriesv1()
        //     .then((entries: Array<SettingsInterface>) => this.entries = entries)
            this.repository.pagination(this.skip,this.limit)
            .then((entries: Array<SettingsInterface>) => this.entries = entries)
            this.repository.numbering()
            .then((number: Array<SettingsInterface>) => this.number = number)
            // .then((number: Array<SettingsInterface>) => this.total = this.number.length)
        this.repository.createv1();

     }

    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void {
            this.repository.pagination(this.skip,this.limit)
            .then((entries: Array<SettingsInterface>) => this.entries = entries);
    }
    delete(value){
            this.repository.deleteEntry(value)

    }

}
