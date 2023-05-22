import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { HotelService } from '../hotel.service';
@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css'],
})
export class HotelDetailComponent implements OnInit {
  //hotel: Hotel | undefined;
  // public id:number;
  id: number;
  hotels: any = [];
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) {
    //get hotel By Id
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id']; // + converts string 'id' to a number
      console.log(this.id);
      this.hotelService.getHotelDetailById(this.id).subscribe((hotels) => {
        this.hotels = hotels;
      });
    });
  }

  ngOnInit() {}
  bookHotel() {
    this.router.navigateByUrl('/book');
  }
}
