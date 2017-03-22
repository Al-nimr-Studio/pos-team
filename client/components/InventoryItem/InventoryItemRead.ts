import { Component, OnInit, OnDestroy } from "@angular/core";
import { InventoryItemInterface } from './Service/InventoryItem.interface';
import { InventoryItemService } from './Service/InventoryItem.service';
import { InventoryItemObserver } from './Service/InventoryItem.observer';
import{ NgForm} from '@angular/forms';




@Component({
    selector: 'InventoryItem',
    template: require('./InventoryItemRead.html'),
   

})
export class InventoryItemReadComponent implements OnInit, OnDestroy, InventoryItemObserver {
    entries: Array<InventoryItemInterface> = [];
    entry:InventoryItemInterface = new InventoryItemInterface();

    constructor(private repository: InventoryItemService) {

    }
  save(entry) {
   


        this.entry.id = Date.now().toString();
        this.entry.view ='InventoryItem';
        this.entry.created = this.entry.updated = new Date();

        this.repository.saveEntryv1(this.entry);
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
    update(entry) {

        this.repository.saveEntryv1(entry);
    }
    delete(entry) {
        this.repository.deleteEntry(entry);
    }
}
