import {Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {createForm, FormType} from 'ngx-sub-form';
import {FormControl, Validators} from '@angular/forms';

export type Street = {
    name: string;
    number: string;
}
export type City = {
    name: string;
    zip: string;
}
export type Address = {
    street: Street;
    city: City;
}
export type Person = {
    lastName: string;
    firstName: string;
    address: Address;
}

@Component({
    selector: 'app-root',
    template: `
        <form [formGroup]="form.formGroup">
            <div>
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" [formControlName]="form.formControlNames.firstName">
            </div>
            <div>
                <label for="lastName">Last Name:</label>
                <input id="lastName" type="text" [formControlName]="form.formControlNames.lastName">
            </div>
            <div
            >
                <app-address-form [formControlName]="form.formControlNames.address"></app-address-form>
            </div>
        </form>
        <div *ngIf="personUpdate | async; let person">
            <h1>Person is {{ form.formGroup.valid ? 'valid' : 'invalid'}}</h1>
            <div>
                <span>First Name:</span>
                <span>{{person.firstName}}</span>
            </div>
            <div>
                <span>Last Name:</span>
                <span>{{person.lastName}}</span>
            </div>
            <h2>Address</h2>
            <h3>Street</h3>
            <div>
                <span>Street Name:</span>
                <span>{{person.address.street.name}}</span>
            </div>
            <div>
                <span>Street Number:</span>
                <span>{{person.address.street.number}}</span>
            </div>
            <h3>City</h3>
            <div>
                <span>City Zip:</span>
                <span>{{person.address.city.zip}}</span>
            </div>
            <div>
                <span>City Name:</span>
                <span>{{person.address.city.name}}</span>
            </div>


        </div>
    `,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    input$: Subject<Person | undefined> = new Subject<Person | undefined>();

    @Input() set person(person: Person | undefined) {
        this.input$.next(person);
    }

    private disabled$: Subject<boolean> = new Subject();

    @Input() set disabled(value: boolean | undefined) {
        this.disabled$.next(!!value);
    }

    @Output() personUpdate: Subject<Person> = new Subject();

    public form = createForm<Person>(this, {
        formType: FormType.ROOT,
        disabled$: this.disabled$,
        input$: this.input$,
        output$: this.personUpdate,
        formControls: {
            firstName: new FormControl(),
            lastName: new FormControl('', Validators.required),
            address: new FormControl(),
        }
    })
}
