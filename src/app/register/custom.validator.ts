// In this file we want the custom validator that compares the values from two inputboxes, password and password2.

import {FormControl,FormGroup} from '@angular/forms'
export function passwordMatchValidator(pwSet:FormGroup){
    var password = pwSet.controls.password.value;
    var retype = pwSet.controls.retype.value;
    // checking if password and confirm password is equal or not! 
    if(!(password === retype)) return {'notmatch': true };
    return null;
}