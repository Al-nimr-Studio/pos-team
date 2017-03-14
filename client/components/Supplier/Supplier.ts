import { Component, OnInit, OnDestroy } from "@angular/core";
import { SupplierInterface } from './Service/Supplier.interface';
import { SupplierService } from './Service/Supplier.service';
import { SupplierObserver } from './Service/Supplier.observer';
import{ NgForm} from '@angular/forms';



   
@Component({
    selector: 'Supplier',
    template: require('./Supplier.html'),
    styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }
  `]

})
export class SupplierComponent implements OnInit, OnDestroy, SupplierObserver {
    entries: Array<SupplierInterface> = [];
    entry:SupplierInterface = new SupplierInterface();

    constructor(private repository: SupplierService) {

    }
  save(entry) {
   
        this.entry.id = Date.now().toString();
        this.entry.view ='Supplier';
        this.entry.created = this.entry.updated = new Date();

        this.repository.saveEntryv1(this.entry);
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv1()
            .then((entries: Array<SupplierInterface>) => this.entries = entries);
        this.repository.createv1();

    }

    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void {
        this.repository.fetchEntriesv1()
            .then((entries: Array<SupplierInterface>) => this.entries = entries);
    }
    update(entry) {

        this.repository.saveEntryv1(entry);
    }
    delete(entry) {
        this.repository.deleteEntry(entry);
    }
}
