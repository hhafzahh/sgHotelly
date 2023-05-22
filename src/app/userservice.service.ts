import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  sharedData:string;
  BASE_URL:string= "http://localhost:3000/api/";
  
  constructor(private http:HttpClient,private auth:AuthService) { }
  
    }



