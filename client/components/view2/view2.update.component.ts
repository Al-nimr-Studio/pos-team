import {Component, OnInit, OnDestroy} from "@angular/core";

import{ View2Interface} from './service/view2.interface';
import{ View2Service} from './service/view2.service';
import{ View2Observer} from './service/view2.observer';

@Component({
    selector: 'view2updateform',
    template: require('../../components/view2/view2.update.component.html')

})
export class View2updateComponent  implements OnInit, OnDestroy, View2Observer {
        entries:Array<View2Interface> = [];

    constructor(private repository:View2Service) {
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv2()
            .then((entries:Array<View2Interface>) => this.entries = entries);
    }

    ngOnDestroy():void {
        this.repository.unregisterObserver(this);
    }

    notify():void {
        this.repository.fetchEntriesv2()
            .then((entries:Array<View2Interface>) => this.entries = entries);
    }
           update(entry) {
             this.repository.saveEntryv2(entry);
        }
}


 