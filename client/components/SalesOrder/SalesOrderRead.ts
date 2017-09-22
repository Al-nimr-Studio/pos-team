import { Component, OnInit, OnDestroy } from "@angular/core";
import { SalesOrderInterface } from './Service/SalesOrder.interface';
import { SalesOrderService } from './Service/SalesOrder.service';
import { SalesOrderObserver } from './Service/SalesOrder.observer';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
    selector: 'SalesOrderRead',
    template: require('./SalesOrderRead.html')
})
export class SalesOrderviewComponent implements OnInit {
    entry: SalesOrderInterface = new SalesOrderInterface();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private repository: SalesOrderService) {
    }

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id: String = params['id'];
            this.repository.fetchEntry(id)
                .then((entry: SalesOrderInterface) => this.entry = entry)
            console.log("hello from ngonit  =>>> " + this.entry);


        });
    }



    delete(entry) {
        console.log(this.entry);

        this.repository.deleteEntry(entry).then(() => this.router.navigate(['/SalesOrder']));
    }
} 