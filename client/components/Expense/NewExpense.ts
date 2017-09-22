import { Component, OnInit, OnDestroy } from "@angular/core";
import { ExpenseInterface, items } from './Service/Expense.interface';
import { ExpenseService } from './Service/Expense.service';
import { ExpenseObserver } from './Service/Expense.observer';
import { NgForm, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { InventoryItemInterface } from '../InventoryItem/Service/InventoryItem.interface';
import { SupplierInterface } from '../Supplier/Service/Supplier.interface';


declare var $: any;
declare var demo: any;


@Component({
    selector: 'NewExpense',
    template: require('./NewExpense.html'),
    styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }
  `]

})
export class NewExpenseReadComponent implements OnInit, OnDestroy, ExpenseObserver {
    entry: ExpenseInterface = new ExpenseInterface();
    total;
    arr;
    tot;
    supplier: Array<SupplierInterface> = [];
    inventory: Array<InventoryItemInterface> = [];
    discount;
    unit;
    qty
    amount;
    iname;
    ides;
    test: Array<items> = [];
    expenseCategoryArray: any;


    constructor(private repository: ExpenseService) { }



    math(i) {
        // console.log(i)
        this.discount = (<HTMLInputElement>document.getElementById(i + 'discount')).value
        this.unit = (<HTMLInputElement>document.getElementById(i + 'unit-p')).value
        this.qty = (<HTMLInputElement>document.getElementById(i + 'qty')).value;
        this.iname = (<HTMLInputElement>document.getElementById(i + 'inve')).value;
        this.ides = (<HTMLInputElement>document.getElementById(i + 'description')).value;
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
        this.test[i] =
            {
                expenseCategory: this.iname,
                description: this.ides,
                unitprice: this.unit,
                amount: this.amount,
                discount: this.discount,
                qty: this.qty,
            };
        // console.log(this.test.join());



    }

    // select(name, adress) {
    //     (<HTMLInputElement>document.getElementById('cus')).value = name;
    //     (<HTMLInputElement>document.getElementById('address')).value = adress;
    //     this.entry.supplier = name;
    //     this.entry.billingaddress = adress;
    // }
    selectinventory(name, i) {
        (<HTMLInputElement>document.getElementById(i + 'inve')).value = name;
        // (<HTMLInputElement>document.getElementById(i + 'description')).value = des;
        // (<HTMLInputElement>document.getElementById(i + 'unit-p')).value = unit;
        // (<HTMLInputElement>document.getElementById(i+'amount')).value = unit;

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

    // find() {
    //     console.log(this.entry.supplier)
    //     if (this.entry.supplier.length > 0) {

    //         this.repository.searchSupplier(this.entry.supplier)
    //             .then((supplier: Array<SupplierInterface>) => this.supplier = supplier)
    //             .then((supplier: Array<SupplierInterface>) => console.log(this.supplier))
    //     }
    //     if (this.entry.supplier.length == 0) {
    //         this.repository.fetchSupplier()
    //             .then((supplier: Array<SupplierInterface>) => this.supplier = supplier)
    //             .then((supplier: Array<SupplierInterface>) => console.log(this.supplier))

    //     }
    // }


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
        setTimeout(function () {

            this.arr = document.getElementsByName('qwe');
            this.tot = 0;
            for (var i = 0; i < this.arr.length; i++) {
                if (parseInt(this.arr[i].value))
                    this.tot += parseInt(this.arr[i].value);
            }
            (<HTMLInputElement>document.getElementById('total')).value = this.tot;
        }, 500);

    }
    
    add(value) {
        this.test[this.test.length] = {
            expenseCategory: null,
            description: null,
            unitprice: null,
            amount: null,
            discount: 0,
            qty: 1,
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
        this.repository.fetchSupplier()
            .then((supplier: Array<SupplierInterface>) => this.supplier = supplier)
            .then((supplier: Array<SupplierInterface>) => console.log(this.supplier));
        this.repository.fetchInventry()
            .then((inventory: Array<InventoryItemInterface>) => this.inventory = inventory)
            .then((inventory: Array<InventoryItemInterface>) => console.log(this.inventory));

        this.repository.fetchExpenseCategory().then((sum:any)=>console.log( this.expenseCategoryArray = sum));

        this.repository.createv1();
        this.test.push({
            expenseCategory: null,
            description: null,
            unitprice: null,
            amount: null,
            discount: 0,
            qty: null,
        });

    }

    ngAfterViewInit() {
        $.ajax({
            url: '../../assets/js/bootstrap-datetimepicker.js',
            dataType: 'script',
            async: false
        });
        $.ajax({
            url: '../../assets/js/light-bootstrap-dashboard.js',
            dataType: 'script',
            async: false
        });

        $().ready(function () {

            demo.initFormExtendedDatetimepickers();
        });

      

    }


    save1(entry,test){
        console.log("purhase invoice---------------------------------------", entry)
        console.log("purhase invoice dynamic array---------------------------------------", test)
    }

    save(entry) {

        this.entry.id = Date.now().toString();
        this.entry.view = 'Expense';
        this.entry.items = this.test;
        this.entry.created = this.entry.updated = new Date();
        this.repository.saveEntryv1(this.entry);
    }

    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void { }

}
