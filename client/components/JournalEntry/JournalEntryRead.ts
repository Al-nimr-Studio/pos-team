import { Component, OnInit, OnDestroy } from "@angular/core";
import { JournalEntryInterface } from './Service/JournalEntry.interface';
import { JournalEntryService } from './Service/JournalEntry.service';
import { JournalEntryObserver } from './Service/JournalEntry.observer';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
    selector: 'JournalEntryRead',
    template: require('./JournalEntryRead.html')
})
export class JournalEntryviewComponent implements OnInit {
    entry: JournalEntryInterface = new JournalEntryInterface();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private repository: JournalEntryService) {
    }

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id: String = params['id'];
            this.repository.fetchEntry(id)
                .then((entry: JournalEntryInterface) => this.entry = entry)
            console.log("hello from ngonit  =>>> " + this.entry);


        });
    }



    delete(entry) {
        console.log(this.entry);

        this.repository.deleteEntry(entry).then(() => this.router.navigate(['/JournalEntry']));
    }
} 