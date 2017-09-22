import { Component, OnInit, OnDestroy } from "@angular/core";
import { PurchaseOrderInterface } from './Service/PurchaseOrder.interface';
import { PurchaseOrderService } from './Service/PurchaseOrder.service';
import { PurchaseOrderObserver } from './Service/PurchaseOrder.observer';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
    selector: 'PurchaseOrderRead',
    template: require('./PurchaseOrderRead.html')
})
export class PurchaseOrderviewComponent implements OnInit {
    entry: PurchaseOrderInterface = new PurchaseOrderInterface();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private repository: PurchaseOrderService) {
    }

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id: String = params['id'];
            this.repository.fetchEntry(id)
                .then((entry: PurchaseOrderInterface) => this.entry = entry)
            console.log("hello from ngonit  =>>> " + this.entry);


        });
    }



    delete(entry) {
        console.log(this.entry);

        this.repository.deleteEntry(entry).then(() => this.router.navigate(['/PurchaseOrder']));
    }
} 