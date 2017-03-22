import {Component, OnInit, OnDestroy, Output , EventEmitter} from "@angular/core";

import{ CrudInterface} from '../../components/crud/service/crud.interface';
import{ CrudService} from '../../components/crud/service/crud.service';
import{ CrudObserver} from '../../components/crud/service/crud.observer';

@Component({
    selector: 'deleteform',
    template: require('../../components/crud/deleteform.component.html')

})
export class DeleteformComponent  implements OnInit, OnDestroy, CrudObserver {


        entries:Array<CrudInterface> = [];

    constructor(private repository:CrudService) {
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntries()
            .then((entries:Array<CrudInterface>) => this.entries = entries);
    }

    ngOnDestroy():void {
        this.repository.unregisterObserver(this);
    }

    notify():void {
        this.repository.fetchEntries()
            .then((entries:Array<CrudInterface>) => this.entries = entries);
    }

        delete(entry) {
             this.repository.deleteEntry(entry);
        }
}

 