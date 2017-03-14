import { Component, OnInit, OnDestroy } from "@angular/core";
import { PurchaseInvoiceInterface } from './Service/PurchaseInvoice.interface';
import { PurchaseInvoiceService } from './Service/PurchaseInvoice.service';
import { PurchaseInvoiceObserver } from './Service/PurchaseInvoice.observer';
// import { CustomFormsModule } from 'ng2-validation';
import{ NgForm} from '@angular/forms';




@Component({
    selector: 'PurchaseInvoice',
    template: require('./PurchaseInvoiceRead.html'),
    styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }
  `]

})
export class PurchaseInvoiceReadComponent implements OnInit, OnDestroy, PurchaseInvoiceObserver {
    entries: Array<PurchaseInvoiceInterface> = [];
    entry:PurchaseInvoiceInterface = new PurchaseInvoiceInterface();

    constructor(private repository: PurchaseInvoiceService) {

    }
  save(entry) {
   


        this.entry.id = Date.now().toString();
        this.entry.view ='PurchaseInvoice';
        this.entry.created = this.entry.updated = new Date();

        this.repository.saveEntryv1(this.entry);
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv1()
            .then((entries: Array<PurchaseInvoiceInterface>) => this.entries = entries);
        this.repository.createv1();

    }

    ngOnDestroy(): void {
        this.repository.unregisterObserver(this);
    }

    notify(): void {
        this.repository.fetchEntriesv1()
            .then((entries: Array<PurchaseInvoiceInterface>) => this.entries = entries);
    }
    update(entry) {

        this.repository.saveEntryv1(entry);
    }
    delete(entry) {
        this.repository.deleteEntry(entry);
    }
}