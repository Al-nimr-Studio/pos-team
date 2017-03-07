import {Component} from "@angular/core";
import{ NgForm} from '@angular/forms';

import{ View2Interface} from './service/view2.interface';
import{ View2Service} from './service/view2.service';

@Component({
    selector: 'view2',
    template: require('../../components/view2/view2.create.component.html'),
     styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }
  `]

})
export class View2createComponent {
   
    entry:View2Interface = new View2Interface();

    constructor( private repository:View2Service) {
    }

  onSubmit(form: NgForm) {
   


        this.entry.id = Date.now().toString();
        this.entry.created = this.entry.updated = new Date();
        this.entry.view = 'view2';

        this.repository.saveEntryv2(this.entry);
        form.resetForm();
    }

}
 

