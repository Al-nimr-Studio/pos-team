import { Component, OnInit, OnDestroy } from "@angular/core";
import { PurchaseOrderInterface } from './Service/PurchaseOrder.interface';
import { PurchaseOrderService } from './Service/PurchaseOrder.service';
import { PurchaseOrderObserver } from './Service/PurchaseOrder.observer';
import{ NgForm} from '@angular/forms';




@Component({
    selector: 'PurchaseOrder',
    template: require('./PurchaseOrder.html'),
//     styles: [`
//     input.ng-dirty.ng-invalid { border: solid red 2px; }
//     input.ng-dirty.ng-valid { border: solid green 2px; }
//   `]

})
export class PurchaseOrder implements OnInit, OnDestroy, PurchaseOrderObserver {
    entries: Array<PurchaseOrderInterface> = [];
    entry:PurchaseOrderInterface = new PurchaseOrderInterface();

    constructor(private repository: PurchaseOrderService) {

    }
  save(entry) {
   


        this.entry.id = Date.now().toString();
        this.entry.view ='PurchaseOrder';
        this.entry.created = this.entry.updated = new Date();

        this.repository.saveEntryv1(this.entry);
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv1()
            .then((entries: Array<PurchaseOrderInterface>) => this.entries = entries);
        this.repository.createv1();

    }

    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void {
        this.repository.fetchEntriesv1()
            .then((entries: Array<PurchaseOrderInterface>) => this.entries = entries);
    }
    update(entry) {

        this.repository.saveEntryv1(entry);
    }
    delete(entry) {
        this.repository.deleteEntry(entry);
    }
}
