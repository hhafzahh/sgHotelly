import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
export class User {
  constructor(
    public _id,
    public firstName: string,
    public lastName: string,
    public mobileNum: string,
    public email: string,
    public username: string,
    public password: string,
    public role: string
  ) {
  }
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 user:any;
 results:any;
 editForm:FormGroup;
  constructor(private authService:AuthService,private fb:FormBuilder,private modalService:NgbModal) { 
    this.authService.getUserDetails().subscribe(data => {
      this.user = data;
      console.log(this.user)
  });
}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      _id: [''],
      firstName: [''],
      lastName: [''],
      // firstName: new FormControl('', Validators.compose([Validators.required])),
      //lastName: new FormControl('', Validators.compose([Validators.required])),
    mobileNum: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required])),
    username: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required])),
    role: new FormControl('', Validators.compose([Validators.required])),
    });
  }
 
  openEdit(targetModal, i: User) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      _id : i._id,
      firstName: i.firstName,
      lastName: i.lastName,
      mobileNum: i.mobileNum,
      email: i.email,
      username: i.username,
      password:i.password,
      role:i.role
    });
  }
  onSave(){
    console.log('hi')
    this.modalService.dismissAll();//dismiss modal
    this.authService.editUser(this.editForm.value).subscribe((data)=>{
      this.results = data;
      console.log(this.results.firstName);
      location.reload();
    })
  }
}
