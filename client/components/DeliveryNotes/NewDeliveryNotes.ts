import { Component, OnInit, OnDestroy } from "@angular/core";
import { DeliveryNotesInterface, items } from './Service/DeliveryNotes.interface';
import { DeliveryNotesService } from './Service/DeliveryNotes.service';
import { DeliveryNotesObserver } from './Service/DeliveryNotes.observer';
import { NgForm, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CustomerInterface } from '../Customer/Service/Customer.interface';
import { InventoryItemInterface } from '../InventoryItem/Service/InventoryItem.interface';


declare var $: any;

@Component({
    selector: 'NewDeliveryNotes',
    template: require('./NewDeliveryNotes.html'),
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
export class NewDeliveryNotesReadComponent implements OnInit, OnDestroy, DeliveryNotesObserver {
    entry: DeliveryNotesInterface = new DeliveryNotesInterface();
    total;
    arr;
    tot;
    customer: Array<CustomerInterface> = [];
    inventory: Array<InventoryItemInterface> = [];
    discount;
    unit;
    qty
    amount;
    iname;
    ides;
    test: Array<items> = [];


    constructor(private repository: DeliveryNotesService) { }

    math(i) {
        // console.log(i)
        // this.discount = (<HTMLInputElement>document.getElementById(i + 'discount')).value
        // this.unit = (<HTMLInputElement>document.getElementById(i + 'unit-p')).value
        this.qty = (<HTMLInputElement>document.getElementById(i + 'qty')).value;
        this.iname = (<HTMLInputElement>document.getElementById(i + 'inve')).value;
        this.ides = (<HTMLInputElement>document.getElementById(i + 'description')).value;
        // console.log(discount)
        // console.log(unit)
        // console.log(qty)

        // let am = +this.unit * +this.qty
        // let dis = am * +this.discount;
        // let b = dis / 100;
        // let result = am - b;


        // console.log(result)

        //this.amount = result.toString();
        //(<HTMLInputElement>document.getElementById(i + 'amount')).value = this.amount;
        //    console.log(a)
        // console.log(this.test.join());
        this.test[i] =
            {
                itemname: this.iname,
                description: this.ides,
                unitprice: null,
                amount: null,
                discount: null,
                qty: this.qty,
            };
        // console.log(this.test.join());

    }

    select(name, adress) {
        (<HTMLInputElement>document.getElementById('cus')).value = name;
        (<HTMLInputElement>document.getElementById('address')).value = adress;
        this.entry.customer = name;
        this.entry.billingaddress = adress;
    }

    selectinventory(name, des, unit, i) {
        (<HTMLInputElement>document.getElementById(i + 'inve')).value = name;
        (<HTMLInputElement>document.getElementById(i + 'description')).value = des;
        // (<HTMLInputElement>document.getElementById(i + 'unit-p')).value = unit;
        // (<HTMLInputElement>document.getElementById(i+'amount')).value = unit;
        console.log("hello from selectinventory  =>>> " + name);
    }
    findItem(value) {
        console.log(value)
        if (value.length > 0) {
            this.repository.searchItem(value)
                .then((inventory: Array<InventoryItemInterface>) => this.inventory = inventory)
                .then((inventory: Array<InventoryItemInterface>) => console.log(this.inventory))
        }
        if (value.length == 0) {
            this.repository.fetchItem()
                .then((inventory: Array<InventoryItemInterface>) => this.inventory = inventory)
                .then((inventory: Array<InventoryItemInterface>) => console.log(this.inventory))
        }
    }

    find() {
        console.log(this.entry.customer)
        if (this.entry.customer.length > 0) {

            this.repository.searchCustomer(this.entry.customer)
                .then((customer: Array<CustomerInterface>) => this.customer = customer)
                .then((customer: Array<CustomerInterface>) => console.log(this.customer))
        }
        if (this.entry.customer.length == 0) {
            this.repository.fetchCustomer()
                .then((customer: Array<CustomerInterface>) => this.customer = customer)
                .then((customer: Array<CustomerInterface>) => console.log(this.customer))

        }
    }

    show() {
        document.getElementById('res').style.display = 'block';
    }

    hiden() {
        document.getElementById('res').style.display = 'none';
    }

    showinven(i) {
        document.getElementById(i + 'inven').style.display = 'block';
    }

    hideninven(i) {
        document.getElementById(i + 'inven').style.display = 'none';
    }
    findTotal() {
        // setTimeout(function () {

        //     this.arr = document.getElementsByName('qwe');
        //     this.tot = 0;
        //     for (var i = 0; i < this.arr.length; i++) {
        //         if (parseInt(this.arr[i].value))
        //             this.tot += parseInt(this.arr[i].value);
        //     }
        //     (<HTMLInputElement>document.getElementById('total')).value = this.tot;
        // }, 500);

    }
    add(value) {
        // console.log(this.test);
        // this.test.push(new items());
        //         console.log(value.length)
        //         let index = value.length
        //         index -=1;   
        //         console.log(index)

        // this.test.splice(index, 0, 
        // {
        //             itemname: null,
        //             description: null,
        //             unitprice: null,
        //             amount: null,
        //             discount: null,
        //             qty: null,
        //     });
        // let haha=this.test.length+1;
        this.test[this.test.length] = {
            itemname: null,
            description: null,
            unitprice: null,
            amount: null,
            discount: 0,
            qty: null,
        }


    }
    removeItem(i) {
        // var itm = document.getElementById(i);
        // $(itm).remove();
        this.test.splice(i, 1);
        setTimeout(function () {
            this.arr = document.getElementsByName('qwe');
            this.tot = 0;
            for (var j = 0; j < this.arr.length; j++) {
                if (parseInt(this.arr[j].value))
                    this.tot += parseInt(this.arr[j].value);
            }
            (<HTMLInputElement>document.getElementById('total')).value = this.tot;
            console.log("findtotal")
            console.log(this.tot)
            console.log(this.arr)

        }, 500);

    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchCustomer()
            .then((customer: Array<CustomerInterface>) => this.customer = customer)
            .then((customer: Array<CustomerInterface>) => console.log(this.customer));
        this.repository.fetchInventry()
            .then((inventory: Array<InventoryItemInterface>) => this.inventory = inventory)
            .then((inventory: Array<InventoryItemInterface>) => console.log(this.inventory));

        this.repository.createv1();
        this.test.push({
            itemname: null,
            description: null,
            unitprice: null,
            amount: null,
            discount: 0,
            qty: null,
        });

    }
    save(entry) {

        this.entry.id = Date.now().toString();
        this.entry.view = 'DeliveryNotes';
        this.entry.items = this.test;
        this.entry.created = this.entry.updated = new Date();
        this.repository.saveEntryv1(this.entry);
    }

    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void { }

}

