import { Component, OnInit, OnDestroy } from "@angular/core";
import { PurchaseInvoiceInterface, items } from './Service/PurchaseInvoice.interface';
import { PurchaseInvoiceService } from './Service/PurchaseInvoice.service';
import { PurchaseInvoiceObserver } from './Service/PurchaseInvoice.observer';
import { NgForm, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InventoryItemInterface } from '../InventoryItem/Service/InventoryItem.interface';
import { SupplierInterface } from '../Supplier/Service/Supplier.interface';

@Component({
    selector: 'NewPurchaseInvoiceEdit',
    template: require('./PurchaseInvoiceEdit.html'),
    styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }`]

})
export class PurchaseInvoiceEditComponent implements OnInit, OnDestroy, PurchaseInvoiceObserver {
    entry: PurchaseInvoiceInterface = new PurchaseInvoiceInterface();
    supplier: Array<SupplierInterface> = [];
    inventory: Array<InventoryItemInterface> = [];
    arr;
    tot;
    discount;
    unit;
    qty
    amount;
    iname;
    ides;

    constructor(private router: Router, private repository: PurchaseInvoiceService, private activatedRoute: ActivatedRoute) {

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
        this.entry.supplier = name;
        this.entry.billingaddress = adress;
    }
    find() {
        console.log(this.entry.supplier)
        if (this.entry.supplier.length > 0) {

            this.repository.searchSupplier(this.entry.supplier)
                .then((supplier: Array<SupplierInterface>) => this.supplier = supplier)
                .then((supplier: Array<SupplierInterface>) => console.log(this.supplier))
        }
        if (this.entry.supplier.length == 0) {
            this.repository.fetchSupplier()
                .then((supplier: Array<SupplierInterface>) => this.supplier = supplier)
                .then((supplier: Array<SupplierInterface>) => console.log(this.supplier))

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
                .then((entry: PurchaseInvoiceInterface) => this.entry = entry)

        });
        this.repository.fetchSupplier()
            .then((supplier: Array<SupplierInterface>) => this.supplier = supplier)
            .then((supplier: Array<SupplierInterface>) => console.log(this.supplier));
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
