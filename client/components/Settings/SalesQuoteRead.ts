import { Component, OnInit, OnDestroy } from "@angular/core";
import { SettingsInterface } from './Service/Settings.interface';
import { SettingsService } from './Service/Settings.service';
import { SettingsObserver } from './Service/Settings.observer';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
    selector: 'SettingsRead',
    template: require('./SettingsRead.html')
})
export class SettingsviewComponent implements OnInit {
    entry: SettingsInterface = new SettingsInterface();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private repository: SettingsService) {
    }

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id: String = params['id'];
            this.repository.fetchEntry(id)
                .then((entry: SettingsInterface) => this.entry = entry)
            console.log("hello from ngonit  =>>> " + this.entry);


        });
    }



    delete(entry) {
        console.log(this.entry);

        this.repository.deleteEntry(entry).then(() => this.router.navigate(['/Settings']));
    }
} 