import { Component, OnInit, OnDestroy } from "@angular/core";
import { MyBusinessDetailsInterface } from './Service/MyBusinessDetails.interface';
import { MyBusinessDetailsService } from './Service/MyBusinessDetails.service';
import { MyBusinessDetailsObserver } from './Service/MyBusinessDetails.observer';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var $tr: any;

@Component({
    selector: 'MyBusinessDetails',
    template: require('./MyBusinessDetails.html'),
    //     styles: [`
    //     input.ng-dirty.ng-invalid { border: solid red 2px; }
    //     input.ng-dirty.ng-valid { border: solid green 2px; }
    //   `]

})
export class MyBusinessDetailsReadComponent implements OnInit, OnDestroy, MyBusinessDetailsObserver {
    entries: Array<MyBusinessDetailsInterface> = [];
    entry: MyBusinessDetailsInterface = new MyBusinessDetailsInterface();

    constructor(private repository: MyBusinessDetailsService) {

    }
    save(entry) {



        this.entry.id = Date.now().toString();
        this.entry.view = 'MyBusinessDetails';
        this.entry.created = this.entry.updated = new Date();

        this.repository.saveEntryv1(this.entry);
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv1()
            .then((entries: Array<MyBusinessDetailsInterface>) => this.entries = entries);
        this.repository.createv1();

    }

    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void {
        this.repository.fetchEntriesv1()
            .then((entries: Array<MyBusinessDetailsInterface>) => this.entries = entries);
    }
    update(entry) {

        this.repository.saveEntryv1(entry);
    }
    delete(entry) {
        this.repository.deleteEntry(entry);
    }
}
