import {Component, OnInit, OnDestroy, Output , EventEmitter} from "@angular/core";
import{ View2Interface} from './service/view2.interface';
import{ View2Service} from './service/view2.service';
import{ View2Observer} from './service/view2.observer';

@Component({
    selector: 'view1de2',
    template: require('../../components/view2/view2.delete.component.html'),
     styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }
  `]

})
export class View2deleteComponent implements OnInit, OnDestroy, View2Observer {


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

        delete(entry) {
             this.repository.deleteEntry(entry);
        }
}