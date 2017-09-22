import { Component, OnInit, OnDestroy } from "@angular/core";
import { DeliveryNotesInterface } from './Service/DeliveryNotes.interface';
import { DeliveryNotesService } from './Service/DeliveryNotes.service';
import { DeliveryNotesObserver } from './Service/DeliveryNotes.observer';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
    selector: 'DeliveryNotesRead',
    template: require('./DeliveryNotesRead.html')
})
export class DeliveryNotesviewComponent implements OnInit {
    entry: DeliveryNotesInterface = new DeliveryNotesInterface();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private repository: DeliveryNotesService) {
    }

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id: String = params['id'];
            this.repository.fetchEntry(id)
                .then((entry: DeliveryNotesInterface) => this.entry = entry)
            console.log("hello from ngonit  =>>> " + this.entry);


        });
    }



    delete(entry) {
        console.log(this.entry);

        this.repository.deleteEntry(entry).then(() => this.router.navigate(['/DeliveryNotes']));
    }
} 