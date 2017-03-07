import {Component, OnInit, OnDestroy, Output , EventEmitter} from "@angular/core";


import{ View1Interface} from './service/view1.interface';
import{ View1Service} from './service/view1.service';
import{ View1Observer} from './service/view1.observer';

@Component({
    selector: 'view1del',
    template: require('../../components/view1/view1.delete.component.html'),
     styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }
  `]

})
export class View1deleteComponent implements OnInit, OnDestroy, View1Observer {


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

        delete(entry) {
             this.repository.deleteEntry(entry);
        }
}