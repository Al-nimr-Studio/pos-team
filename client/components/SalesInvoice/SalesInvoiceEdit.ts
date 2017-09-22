import { Component, OnInit, OnDestroy } from "@angular/core";
import { SalesInvoiceInterface, items } from './Service/SalesInvoice.interface';
import { SalesInvoiceService } from './Service/SalesInvoice.service';
import { SalesInvoiceObserver } from './Service/SalesInvoice.observer';
import { NgForm, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerInterface } from '../Customer/Service/Customer.interface';
import { InventoryItemInterface } from '../InventoryItem/Service/InventoryItem.interface';


@Component({
    selector: 'NewSalesInvoiceEdit',
    template: require('./SalesInvoiceEdit.html'),

})
export class SalesInvoiceEditComponent implements OnInit, OnDestroy, SalesInvoiceObserver {
    entry: SalesInvoiceInterface = new SalesInvoiceInterface();
    customer: Array<CustomerInterface> = [];
    inventory: Array<InventoryItemInterface> = [];
    arr;
    tot;
    discount;
    unit;
    qty
    amount;
    iname;
    ides;

    constructor(private router: Router, private repository: SalesInvoiceService, private activatedRoute: ActivatedRoute) {

    }

    math(i) {
        this.discount = (<HTMLInputElement>document.getElementById(i + 'discount')).value
        this.unit = (<HTMLInputElement>document.getElementById(i + 'unit-p')).value
        this.qty = (<HTMLInputElement>document.getElementById(i + 'qty')).value;
        this.iname = (<HTMLInputElement>document.getElementById(i + 'inve')).value;
        this.ides = (<HTMLInputElement>document.getElementById(i + 'description')).value;
        // console.log(i)
        //    let discount = (<HTMLInputElement>document.getElementById(i+'discount')).value
        //    let unit = (<HTMLInputElement>document.getElementById(i+'unit-p')).value
        //    let qty = (<HTMLInputElement>document.getElementById(i+'qty')).value
        // console.log(discount)
        // console.log(unit)
        // console.log(qty)

        let am = +this.unit * +this.qty
        let dis = am * +this.discount;
        let b = dis / 100;
        let result = am - b;

        // console.log(result)

        this.amount = result.toString();
        (<HTMLInputElement>document.getElementById(i + 'amount')).value = this.amount;
        //    console.log(a)
        // console.log(this.test.join());
        this.entry.items[i] =
            {
                itemname: this.iname,
                description: this.ides,
                unitprice: this.unit,
                amount: this.amount,
                discount: this.discount,
                qty: this.qty,
            };
        // console.log(this.test.join());
    }

    findTotal() {
        this.arr = document.getElementsByName('qwe');
        this.tot = 0;
        for (var i = 0; i < this.arr.length; i++) {
            if (parseInt(this.arr[i].value))
                this.tot += parseInt(this.arr[i].value);
        }
        (<HTMLInputElement>document.getElementById('total')).value = this.tot;
        console.log(this.tot)
        console.log(this.arr)
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
   selectinventory(name, des, unit, i) {
        (<HTMLInputElement>document.getElementById(i + 'inve')).value = name;
        (<HTMLInputElement>document.getElementById(i + 'description')).value = des;
        (<HTMLInputElement>document.getElementById(i + 'unit-p')).value = unit;
    }
    showinven(i) {
        document.getElementById(i + 'inven').style.display = 'block';
    }

    hideninven(i) {
        document.getElementById(i + 'inven').style.display = 'none';
    }
    show() {
        document.getElementById('res').style.display = 'block';
    }

    hiden() {
        document.getElementById('res').style.display = 'none';
    }
    select(name, adress) {
        (<HTMLInputElement>document.getElementById('cus')).value = name;
        (<HTMLInputElement>document.getElementById('address')).value = adress;
        this.entry.customer = name;
        this.entry.billingaddress = adress;
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

    add(entry) {

        this.entry.items.push(new items());

    }


    removeItem(i) {

        this.entry.items.splice(i, 1);
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

        this.repository.createv1();
        this.activatedRoute.params.forEach((params: Params) => {
            let id: String = params['id'];
            this.repository.fetchEntry(id)
                .then((entry: SalesInvoiceInterface) => this.entry = entry)

        });
        this.repository.fetchCustomer()
            .then((customer: Array<CustomerInterface>) => this.customer = customer)
            .then((customer: Array<CustomerInterface>) => console.log(this.customer));
        this.repository.fetchInventry()
            .then((inventory: Array<InventoryItemInterface>) => this.inventory = inventory)
            .then((inventory: Array<InventoryItemInterface>) => console.log(this.inventory));

    }


    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void {
    }
    update(entry) {

        this.repository.saveEntryv1(entry);
    }

    delete(entry) {
        this.repository.deleteEntry(entry);
    }
}
