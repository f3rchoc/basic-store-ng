import { AbstractControl } from '@angular/forms';

export class MyValidators {

    static isPriceValid(control: AbstractControl) {
        const value = control.value;
        console.log(value);
        if (10000 < value) {
            return {price_invalid: true};
        }
        return null;
    }
}
