import { Component, OnInit, OnDestroy } from "@angular/core";
import { SalesQuoteInterface } from './Service/SalesQuote.interface';
import { SalesQuoteService } from './Service/SalesQuote.service';
import { SalesQuoteObserver } from './Service/SalesQuote.observer';
import { NgForm, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';




@Component({
    selector: 'SalesQuote',
    template: require('./SalesQuote.html'),


})
export class SalesQuoteReadComponent implements OnInit, OnDestroy, SalesQuoteObserver {
    entries: Array<SalesQuoteInterface> = [];
    entry: SalesQuoteInterface = new SalesQuoteInterface();

    search;
    number: Array<SalesQuoteInterface> = [];
    jsondata;


    constructor(private repository: SalesQuoteService) {


    }



    export(value) {
        this.repository.export(value).then((jason: any) => this.jsondata = jason).then((jason: any) => console.log(this.jsondata));

    }



    find() {
        if (this.search.length > 0) {

            this.repository.search(this.search)
                .then((entries: Array<SalesQuoteInterface>) => this.entries = entries)
        }
        if (this.search.length == 0) {
            this.repository.fetchEntriesv1()
                .then((entries: Array<SalesQuoteInterface>) => this.entries = entries)
        }
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv1()
            .then((entries: Array<SalesQuoteInterface>) => this.entries = entries)

        this.repository.createv1();


    }


    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void {
        this.repository.fetchEntriesv1()
            .then((entries: Array<SalesQuoteInterface>) => this.entries = entries);
    }
    delete(value) {
        this.repository.deleteEntry(value)

    }

}
