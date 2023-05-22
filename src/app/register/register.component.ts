import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { passwordMatchValidator } from './custom.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //create a formgroup object called myForm
  myForm: FormGroup;
  //validation messages
  validationUserMessage = {
    firstName: [{ type: 'required', message: 'Please enter your first name!' }],
    lastName: [{ type: 'required', message: 'Please enter your last name!' }],
    mobileNum: [
      { type: 'required', message: 'Please enter your phone number!' },
    ],
    email: [
      { type: 'required', message: 'Please enter your email!' },
      { type: 'pattern', message: 'Email entered is incorrect.Try Again!' },
    ],
    username: [{ type: 'required', message: 'Please enter your username' }],
    role: [{ type: 'required', message: 'Please enter your role!' }],
    pwSet: [
      { type: 'notmatch', message: 'Password does not match!' },
      { type: 'required', message: 'Please enter your password!' },
      {
        type: 'minlength',
        message: 'The password must be at least 5 characters or more',
      },
    ],
  };
  //dependency injection of FormBuilder as an object call fb
  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    //Construct the FormGroup object using FormBuilder
    this.myForm = this.fb.group({
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      mobileNum: new FormControl('', Validators.compose([Validators.required])),
      username: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      role: new FormControl('', Validators.compose([Validators.required])),
      pwSet: this.fb.group(
        {
          password: new FormControl(
            '',
            Validators.compose([Validators.required, Validators.minLength(8)])
          ),
          retype: new FormControl(
            '',
            Validators.compose([Validators.required])
          ),
        },

        { validators: passwordMatchValidator }
      ),
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
    //register user into mongodb using AuthService
    this.auth.regUser(this.myForm.value);
  }
}
