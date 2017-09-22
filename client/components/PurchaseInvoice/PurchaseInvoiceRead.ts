import { Component, OnInit, OnDestroy } from "@angular/core";
import { PurchaseInvoiceInterface } from './Service/PurchaseInvoice.interface';
import { PurchaseInvoiceService } from './Service/PurchaseInvoice.service';
import { PurchaseInvoiceObserver } from './Service/PurchaseInvoice.observer';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
    selector: 'PurchaseInvoiceRead',
    template: require('./PurchaseInvoiceRead.html')
})
export class PurchaseInvoiceviewComponent implements OnInit {
    entry: PurchaseInvoiceInterface = new PurchaseInvoiceInterface();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private repository: PurchaseInvoiceService) {
    }

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id: String = params['id'];
            this.repository.fetchEntry(id)
                .then((entry: PurchaseInvoiceInterface) => this.entry = entry)
            console.log("hello from ngonit  =>>> " + this.entry);


        });
    }



    delete(entry) {
        console.log(this.entry);

        this.repository.deleteEntry(entry).then(() => this.router.navigate(['/PurchaseInvoice']));
    }
} 