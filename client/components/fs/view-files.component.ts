import {Component, OnInit, OnDestroy} from "@angular/core";

import{ CrudInterface} from './service/crud.interface';
import{ FileService} from './service/file.service';
import{ CrudObserver} from './service/crud.observer';  


@Component({
    selector: 'view-files',
    template: require('../../components/fs/view-files.component.html'),


})
export class ViewFilesComponent implements OnInit, OnDestroy, CrudObserver {
   entries:Array<CrudInterface> = [];

    constructor(private repository:FileService) {
    }

    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesfiles()
        .then((entries:Array<CrudInterface>) => this.entries = entries);

    }

    ngOnDestroy():void {
        this.repository.unregisterObserver(this);
    }

    notify():void {
        this.repository.fetchEntriesfiles()
            .then((entries:Array<CrudInterface>) => this.entries = entries);
    }

}
 

