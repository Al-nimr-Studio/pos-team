import { Component, OnInit, OnDestroy } from "@angular/core";
import { PurchaseOrderInterface } from './Service/PurchaseOrder.interface';
import { PurchaseOrderService } from './Service/PurchaseOrder.service';
import { PurchaseOrderObserver } from './Service/PurchaseOrder.observer';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var $tr: any;

@Component({
    selector: 'PurchaseOrder',
    template: require('./PurchaseOrder.html'),
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
export class PurchaseOrderReadComponent implements OnInit, OnDestroy, PurchaseOrderObserver {
    entries: Array<PurchaseOrderInterface> = [];
    entry: PurchaseOrderInterface = new PurchaseOrderInterface();


    search;
    number: Array<PurchaseOrderInterface> = [];
    jsondata;


    constructor(private repository: PurchaseOrderService) {

    }




    export(value) {
        this.repository.export(value).then((jason: any) => this.jsondata = jason).then((jason: any) => console.log(this.jsondata));

    }


    find() {
        if (this.search.length > 0) {

            this.repository.search(this.search)
                .then((entries: Array<PurchaseOrderInterface>) => this.entries = entries)
        }
        if (this.search.length == 0) {
            this.repository.fetchEntriesv1()
                .then((entries: Array<PurchaseOrderInterface>) => this.entries = entries)
        }
    }

    save(entry) {



        this.entry.id = Date.now().toString();
        this.entry.view = 'PurchaseOrder';
        this.entry.created = this.entry.updated = new Date();

        this.repository.saveEntryv1(this.entry);
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv1()
            .then((entries: Array<PurchaseOrderInterface>) => this.entries = entries);
        this.repository.createv1();

    }

    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void {
        this.repository.fetchEntriesv1()
            .then((entries: Array<PurchaseOrderInterface>) => this.entries = entries);
    }

    delete(value) {
        this.repository.deleteEntry(value)

    }
}
