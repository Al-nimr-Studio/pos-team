import { Component, OnInit, OnDestroy } from "@angular/core";
import { ExpenseInterface } from './Service/Expense.interface';
import { ExpenseService } from './Service/Expense.service';
import { ExpenseObserver } from './Service/Expense.observer';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
    selector: 'ExpenseRead',
    template: require('./ExpenseRead.html')
})
export class ExpenseviewComponent implements OnInit {
    entry: ExpenseInterface = new ExpenseInterface();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private repository: ExpenseService) {
    }

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id: String = params['id'];
            this.repository.fetchEntry(id)
                .then((entry: ExpenseInterface) => this.entry = entry)
            console.log("hello from ngonit  =>>> " + this.entry);


        });
    }



    delete(entry) {
        console.log(this.entry);

        this.repository.deleteEntry(entry).then(() => this.router.navigate(['/Expense']));
    }
} 