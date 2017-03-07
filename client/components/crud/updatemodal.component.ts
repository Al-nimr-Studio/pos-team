import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {CrudService} from "../../components/crud/service/crud.service";
import{ CrudInterface} from '../../components/crud/service/crud.interface';

declare let UIkit:any;

@Component({
        template: require('../../components/crud/Updatemodal.component.html')

})
export class UpdatemodalComponent implements OnInit, OnDestroy {

    entry:CrudInterface = new CrudInterface();

    constructor(private router:Router, private activatedRoute:ActivatedRoute, private repository:CrudService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params:Params) => {
            let id:String = params['id'];
            this.repository.fetchEntry(id)
                .then((entry:CrudInterface) => this.entry = entry)
                .then(() => {
                    let uikitModal = UIkit.modal('#modal');
                    uikitModal.show();
                })
        });
    }

    ngOnDestroy() {
        let uikitModal = UIkit.modal('#modal');
        if (uikitModal.isActive()) {
            uikitModal.hide();
        }
    }

    update():void {
        this.entry.updated = new Date();

        this.repository.saveEntry(this.entry)
            .then(() => this.router.navigate(['/']));
    }

    cancel():void {
        this.router.navigate(['/']);
    }


}
