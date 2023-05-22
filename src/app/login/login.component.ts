import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  results:any = false;
  validationUserMessage = {
    name:[  {type:'required',message:"Please enter your name!"},],
    email:[
      {type:'required',message:"Please enter your email!"},
      {type:'pattern',message:"Email entered is incorrect.Try Again!"}
    ],
    password:[
      {type:'required',message:"Please enter your password!"},
      {type:'minlength',message:"The password must be at least 5 characters or more"}
    ]
  }
  //dependency injection of FormBuilder as an object call fb
  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name:new FormControl('',Validators.compose([
        Validators.required
      ])),
      email:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),

       
    })
}
onSubmit(){
 
  this.authService.authUser(this.myForm.value.name,this.myForm.value.password).subscribe(data =>
    {
      this.results = data;
      console.log(this.results)
      console.log(this.results[0].auth)
      if(this.results[0].auth) {
        //set username,access tojen and role in local storage
        localStorage.setItem('username',this.results[0].username)
        localStorage.setItem('access_token', this.results[0].token)
        localStorage.setItem('role', this.results[0].role)
        location.reload();
        this.router.navigateByUrl('/home');
    

      }
      else{
      
        alert("Wrong Username or password")

      }

    });
}
}