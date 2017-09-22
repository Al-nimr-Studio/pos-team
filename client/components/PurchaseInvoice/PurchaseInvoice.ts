import { Component, OnInit, OnDestroy } from "@angular/core";
import { PurchaseInvoiceInterface } from './Service/PurchaseInvoice.interface';
import { PurchaseInvoiceService } from './Service/PurchaseInvoice.service';
import { PurchaseInvoiceObserver } from './Service/PurchaseInvoice.observer';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var $tr: any;

@Component({
    selector: 'PurchaseInvoice',
    template: require('./PurchaseInvoice.html'),
    styles: [`
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
export class PurchaseInvoiceReadComponent implements OnInit, OnDestroy, PurchaseInvoiceObserver {
    entries: Array<PurchaseInvoiceInterface> = [];
    entry: PurchaseInvoiceInterface = new PurchaseInvoiceInterface();

    search;
    number: Array<PurchaseInvoiceInterface> = [];
    jsondata;

    constructor(private repository: PurchaseInvoiceService) {

    }


    find() {
        if (this.search.length > 0) {

            this.repository.search(this.search)
                .then((entries: Array<PurchaseInvoiceInterface>) => this.entries = entries)
        }
        if (this.search.length == 0) {
            this.repository.fetchEntriesv1()
                .then((entries: Array<PurchaseInvoiceInterface>) => this.entries = entries)
        }
    }

    export(value) {
        this.repository.export(value).then((jason: any) => this.jsondata = jason).then((jason: any) => console.log(this.jsondata));

    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv1()
            .then((entries: Array<PurchaseInvoiceInterface>) =>console.log("Supplier fetch in purchase invoice.ts", this.entries = entries));
        this.repository.createv1();

    }

    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void {
        this.repository.fetchEntriesv1()
            .then((entries: Array<PurchaseInvoiceInterface>) => this.entries = entries);
    }

    delete(value) {
        this.repository.deleteEntry(value)

    }
}
