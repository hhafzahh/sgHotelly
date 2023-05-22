import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
//BOTH HOTEL ADMIN AND ADMIN
export class AuthorizeGuard implements CanActivate {
  constructor(private authService:AuthService ){}
  canActivate() {
    let Role = localStorage.getItem(this.authService.ROLE_KEY);
    if(Role == "admin"){
      return true;
    }
    else if (Role == "hotelAdmin"){
      return true
    }
    
    else{
      alert("You dont have admin rights")
      return false;
    }

   
  }
  
}
