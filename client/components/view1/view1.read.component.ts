import {Component, OnInit, OnDestroy} from "@angular/core";

import{ View1Interface} from './service/view1.interface';
import{ View1Service} from './service/view1.service';
import{ View1Observer} from './service/view1.observer'; 

@Component({
    selector: 'view1',
    template: require('../../components/view1/view1.read.component.html'),
     styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }
  `]

})
export class View1readComponent implements OnInit, OnDestroy, View1Observer {
        entries:Array<View1Interface> = [];

    constructor(private repository:View1Service) {
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv1()
        .then((entries:Array<View1Interface>) => this.entries = entries);
        this.repository.createv1();

    }

    ngOnDestroy():void {
        this.repository.unregisterObserver(this);
    }

    notify():void {
        this.repository.fetchEntriesv1()
            .then((entries:Array<View1Interface>) => this.entries = entries);
    }
}
