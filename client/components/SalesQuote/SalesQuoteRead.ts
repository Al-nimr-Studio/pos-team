import { Component, OnInit, OnDestroy } from "@angular/core";
import { SalesQuoteInterface } from './Service/SalesQuote.interface';
import { SalesQuoteService } from './Service/SalesQuote.service';
import { SalesQuoteObserver } from './Service/SalesQuote.observer';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
    selector: 'SalesQuoteRead',
    template: require('./SalesQuoteRead.html')
})
export class SalesQuoteviewComponent implements OnInit {
    entry: SalesQuoteInterface = new SalesQuoteInterface();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private repository: SalesQuoteService) {
    }

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id: String = params['id'];
            this.repository.fetchEntry(id)
                .then((entry: SalesQuoteInterface) => this.entry = entry)
            console.log("hello from ngonit  =>>> " + this.entry);


        });
    }



    delete(entry) {
        console.log(this.entry);

        this.repository.deleteEntry(entry).then(() => this.router.navigate(['/SalesQuote']));
    }
} 