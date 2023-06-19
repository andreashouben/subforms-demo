import {Component} from '@angular/core';
import {createForm, FormType, subformComponentProviders} from 'ngx-sub-form';
import {Address} from '../app.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-address-form',
    template: `<form [formGroup]="form.formGroup">
        <div [formGroupName]="form.formControlNames.street">
            <div>
                <label for="street-name">
                    Street Name: *
                </label>
                <input type="text" formControlName="name">
            </div>
            <div>
                <label for="street-number">
                    Street Number: *
                </label>
                <input type="text" formControlName="number">
            </div>
        </div>
        <div [formGroupName]="form.formControlNames.city">
            <div>
                <label for="street-name">
                    City Zip: *
                </label>
                <input type="text" formControlName="zip">
            </div>
            <div>
                <label for="street-number">
                    City Name: *
                </label>
                <input type="text" formControlName="name">
            </div>
        </div>
    </form>`,
    styleUrls: ['./address-form.component.scss'],
    providers: subformComponentProviders(AddressFormComponent)
})
export class AddressFormComponent {
    public form = createForm<Address>(this, {
        formType: FormType.SUB,
        formControls: {
            street: new FormGroup({
                    name: new FormControl('', Validators.required)
                    ,
                    number: new FormControl('', Validators.required)
                }
            ),
            city: new FormGroup({
                    zip: new FormControl('', Validators.required),
                    name: new FormControl('', Validators.required)
                }
            )
        }
    })
}
