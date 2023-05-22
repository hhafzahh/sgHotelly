import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name:any;
  check:boolean;
  userRole:any;
  constructor(private auth:AuthService) { 
    this.name = this.auth.name;
    this.check = this.auth.isAuthenticated;
    
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    console.log(this.userRole);
  }


logout(){
  this.auth.logout();
}

}