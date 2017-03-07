import {Component, OnInit, OnDestroy} from "@angular/core";

import{ View1Interface} from './service/view1.interface';
import{ View1Service} from './service/view1.service';
import{ View1Observer} from './service/view1.observer';

@Component({
    selector: 'view1updateform',
    template: require('../../components/view1/view1.update.component.html')

})
export class View1updateComponent  implements OnInit, OnDestroy, View1Observer {
        entries:Array<View1Interface> = [];
                       

    constructor(private repository:View1Service) {
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


 