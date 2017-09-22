import { Component, OnInit, OnDestroy } from "@angular/core";
import { InventoryItemInterface } from './Service/InventoryItem.interface';
import { InventoryItemService } from './Service/InventoryItem.service';
import { InventoryItemObserver } from './Service/InventoryItem.observer';
import { NgForm } from '@angular/forms';




@Component({
    selector: 'InventoryItem',
    template: require('./InventoryItemRead.html'), styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }`]


})
export class InventoryItemReadComponent implements OnInit, OnDestroy, InventoryItemObserver {
    entries: Array<InventoryItemInterface> = [];
    entry: InventoryItemInterface = new InventoryItemInterface();

    search;
    number: Array<InventoryItemInterface> = [];
    jsondata;

    constructor(private repository: InventoryItemService) {

    }
    export(value) {
        this.repository.export(value).then((jason: any) => this.jsondata = jason).then((jason: any) => console.log(this.jsondata));

    }

    save(entry) {



        this.entry.id = Date.now().toString();
        this.entry.view = 'InventoryItem';
        this.entry.created = this.entry.updated = new Date();

        this.repository.saveEntryv1(this.entry);
    }





    find() {
        if (this.search.length > 0) {

            this.repository.search(this.search)
                .then((entries: Array<InventoryItemInterface>) => this.entries = entries)
        }
        if (this.search.length == 0) {
            this.repository.fetchEntriesv1()
                .then((entries: Array<InventoryItemInterface>) => this.entries = entries)
        }
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv1()
            .then((entries: Array<InventoryItemInterface>) => this.entries = entries);
        this.repository.createv1();

    }

    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void {
        this.repository.fetchEntriesv1()
            .then((entries: Array<InventoryItemInterface>) => this.entries = entries);
    }
    // update(entry) {

    //     this.repository.saveEntryv1(entry);
    // }
    delete(value) {
        this.repository.deleteEntry(value)

    }
}
