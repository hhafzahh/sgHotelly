import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddHotelComponent } from '../add-hotel/add-hotel.component';
import { AuthService } from '../auth.service';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Today = new Date();
  cdMsg: string;
  userRole:any;
  SearchHotels = '';
  results:any;
  SortbyParam = '';
  SortDirection = 'asc';
  hotels:any =[];
  constructor(private hotelsService:HotelService,private authService:AuthService,) {
    this.hotelsService.getAllHotels().subscribe(hotels => {
      this.hotels = hotels;
   })
   }
  
  ngOnInit(): void {
   
    this.userRole = localStorage.getItem('role')
    console.log(this.userRole)
  }
   addHotel(){
    console.log("hi");
    
   }
    
  
  editHotel(){
    console.log("pls edit");

  }
  deleteHotel(id:number){
    this.hotelsService.deleteHotel(id).subscribe((data)=>{
      console.log(data);
    
    })
    location.reload()
  }



  onVenueFilter(){
  
    this.SearchHotels = this.cdMsg;
  }
  onVenueFilterClear(){
    this.SearchHotels = '';
    this.cdMsg = '';
  }
  onSortDirection(){
    if(this.SortDirection === 'desc'){
      this.SortDirection = 'asc';
    }
    else{
      this.SortDirection = 'desc';
    }
  }
  
}
