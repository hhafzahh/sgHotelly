import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  results: any = [];
  regUserUrl: string = 'http://localhost:3000/api/reguser/';
  authuser: string = 'http://localhost:3000/api/authuser/';
  url: string = 'http://localhost:3000/api/users/';
  profileUrl: string = 'http://localhost:3000/api/profile/';
  NAME_KEY = 'username';
  TOKEN_KEY = 'access_token';
  ROLE_KEY = 'role';
  constructor(private http: HttpClient, private router: Router) {}
  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }
  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  regUser(user) {
    return this.http.post(this.regUserUrl, user).subscribe((data) => {
      this.results = data;
      console.log(this.results[0]);
      localStorage.setItem(this.TOKEN_KEY, this.results[0].token);
      localStorage.setItem(this.NAME_KEY, this.results[0].username);
    });
  }
  // validates the username and pasword with mongodb
  authUser(username: string, pw: string) {
    return this.http.post<any[]>(this.authuser, {
      username: username,
      password: pw,
    });
  }
  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    window.location.reload();
  }
  getUser() {}
  IsLoggedIn() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getAllUsers() {
    return this.http.get<any[]>(this.url);
  }

  addUser(user) {
    return this.http.post(this.url, user);
  }
  deleteUser(id) {
    return this.http.delete<any[]>(this.url + id);
  }
  editUser(user) {
    console.log(this.profileUrl + user._id);
    return this.http.put<any[]>(this.profileUrl + user._id, user);
    
  }
  getUserDetails() {
    return this.http.get<any[]>(this.profileUrl);
  }
}
