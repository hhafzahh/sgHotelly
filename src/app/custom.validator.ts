import { FormControl, FormGroup } from '@angular/forms';
export function passwordMatchValidator(pwSet: FormGroup) {
var password = pwSet.controls.password.value;
var password2 = pwSet.controls.password2.value;
if (!(password === password2)) return {'notmatch': true} ;
return null;
}