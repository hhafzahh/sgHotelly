import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
message:string;
  constructor() { }
 //this is not part of modal 
 //technically shared service
 //TO GET DATA FROM ONE COMPONENT TO ANOTHER 
 
setMessage(data){
    this.message = data
}
getMessage(){
    return this.message;
}

}
