import {Component, OnInit, OnDestroy} from "@angular/core";

import{ CrudInterface} from '../../components/crud/service/crud.interface';
import{ CrudService} from '../../components/crud/service/crud.service';
import{ CrudObserver} from '../../components/crud/service/crud.observer';

@Component({
    selector: 'updateform',
    template: require('../../components/crud/updateform.component.html')

})
export class UpdateformComponent  implements OnInit, OnDestroy, CrudObserver {
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
           update(entry) {
             this.repository.saveEntry(entry);
        }
}


 