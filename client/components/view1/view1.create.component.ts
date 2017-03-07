import {Component} from "@angular/core";
import{ NgForm} from '@angular/forms';

import{ View1Interface} from './service/view1.interface';
import{ View1Service} from './service/view1.service';

@Component({
    selector: 'view1',
    template: require('../../components/view1/view1.create.component.html'),
     styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }
  `]

})
export class View1createComponent {
   
    entry:View1Interface = new View1Interface();

    constructor( private repository:View1Service) {
    }

  onSubmit(form: NgForm) {
   


        this.entry.id = Date.now().toString();
        this.entry.view ='view1';
        this.entry.created = this.entry.updated = new Date();

        this.repository.saveEntryv1(this.entry);
        form.resetForm();
    }

}
 

