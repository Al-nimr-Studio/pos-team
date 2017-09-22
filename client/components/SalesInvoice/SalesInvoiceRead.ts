import { Component, OnInit, OnDestroy } from "@angular/core";
import { SalesInvoiceInterface } from './Service/SalesInvoice.interface';
import { SalesInvoiceService } from './Service/SalesInvoice.service';
import { SalesInvoiceObserver } from './Service/SalesInvoice.observer';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
    selector: 'SalesInvoiceRead',
    template: require('./SalesInvoiceRead.html')
})
export class SalesInvoiceviewComponent implements OnInit {
    entry: SalesInvoiceInterface = new SalesInvoiceInterface();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private repository: SalesInvoiceService) {
    }

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id: String = params['id'];
            this.repository.fetchEntry(id)
                .then((entry: SalesInvoiceInterface) => this.entry = entry)
            console.log("hello from ngonit  =>>> " + this.entry);


        });
    }



    delete(entry) {
        console.log(this.entry);

        this.repository.deleteEntry(entry).then(() => this.router.navigate(['/SalesInvoice']));
    }
} 