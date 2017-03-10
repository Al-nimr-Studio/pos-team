import {Component, OnInit, OnDestroy} from "@angular/core";

import{ View1Interface} from './service/view1.interface';
import{ SupplierService} from './service/view1.service';
import{ View1Observer} from './service/view1.observer';

@Component({
    selector: 'view1updateform',
    template: require('./supplier.update.html')

})
export class SupplierupdateComponent  implements OnInit, OnDestroy, View1Observer {
        entries:Array<View1Interface> = [];
                       

    constructor(private repository:SupplierService) {
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv1()
            .then((entries:Array<View1Interface>) => this.entries = entries);
    }

    ngOnDestroy():void {
        this.repository.unregisterObserver(this);
    }

    notify():void {
        this.repository.fetchEntriesv1()
            .then((entries:Array<View1Interface>) => this.entries = entries);
    }
           update(entry) {

             this.repository.saveEntryv1(entry);
        }
}


 