import { Component, OnInit, OnDestroy } from "@angular/core";
import { ExpenseCategoriesInterface } from './Service/ExpenseCategories.interface';
import { ExpenseCategoriesService } from './Service/ExpenseCategories.service';
import { ExpenseCategoriesObserver } from './Service/ExpenseCategories.observer';
import { NgForm } from '@angular/forms';




@Component({
    selector: 'ExpenseCategories',
    template: require('./ExpenseCategories.html'),
    styles: [`
        input.ng-dirty.ng-invalid { border: solid red 2px; }
        input.ng-dirty.ng-valid { border: solid green 2px; }
 
  `]

})
export class ExpenseCategories implements OnInit, OnDestroy, ExpenseCategoriesObserver {
    entries: Array<ExpenseCategoriesInterface> = [];
    entry: ExpenseCategoriesInterface = new ExpenseCategoriesInterface();


    search;
    number: Array<ExpenseCategoriesInterface> = [];
    jsondata;

    constructor(private repository: ExpenseCategoriesService) {

    }
    save(entry) {

        this.entry.id = Date.now().toString();
        this.entry.view = 'ExpenseCategories';
        this.entry.created = this.entry.updated = new Date();

        this.repository.saveEntryv1(this.entry);
    }
    export(value) {
        this.repository.export(value).then((jason: any) => this.jsondata = jason).then((jason: any) => console.log(this.jsondata));

    }

    find() {
        if (this.search.length > 0) {

            this.repository.search(this.search)
                .then((entries: Array<ExpenseCategoriesInterface>) => this.entries = entries)
        }
        if (this.search.length == 0) {
            this.repository.fetchEntriesv1()
                .then((entries: Array<ExpenseCategoriesInterface>) => this.entries = entries)
        }
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv1()
            .then((entries: Array<ExpenseCategoriesInterface>) => this.entries = entries);
        this.repository.createv1();

    }

    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void {
        this.repository.fetchEntriesv1()
            .then((entries: Array<ExpenseCategoriesInterface>) => this.entries = entries);
    }
    // update(entry) {

    //     this.repository.saveEntryv1(entry);
    // }
    delete(value) {
        this.repository.deleteEntry(value)

    }
}
