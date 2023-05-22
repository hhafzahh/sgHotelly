import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class HotelService {
  hotelsUrl: string = 'http://localhost:3000/api/hotels/';
  hotelUrl: string = 'http://localhost:3000/api/detail/';
  roomUrl: string = 'http://localhost:3000/api/room/detail/';
  paymentUrl: string = 'http://localhost:3000/api/payment';
  hotels: any = [];
  constructor(private http: HttpClient) {}
  getAllHotels() {
    return this.http.get<any[]>(this.hotelsUrl);
  }

  getHotelDetailById(id: number) {
    console.log(this.hotelUrl + id);
    return this.http.get(this.hotelUrl + id);
  }
  getRoomDetailById(id: number) {
    console.log(this.roomUrl + id);
    return this.http.get(this.roomUrl + id);
  }

  getPaymentById(id: number) {
    return this.http.get(this.paymentUrl + id);
  }

  addHotel(
    id: string,
    name: string,
    description: string,
    displayImage: string,
    images: Array<string>,
    address: string,
    hyperLink: string,
    keepername: string,
    postalcode: string,
    startingPrice: string,
    totalrooms: number,
    standardQueen: Array<string>,
    superiorRoom: Array<string>
  ) {
    return this.http.post<any[]>(
      this.hotelsUrl,

      {
        id: id,
        name: name,
        description: description,
        displayImage: displayImage,
        images: images,
        address: address,

        hyperLink: hyperLink,
        keepername: keepername,
        postalcode: postalcode,
        startingPrice: startingPrice,
        totalrooms: totalrooms,
        standardQueen: standardQueen,
        superiorRoom: superiorRoom,
      }
    );
  }

  getHotelDetail(id: number) {
    this.hotels = this.getAllHotels();
    for (let i = 0; i < this.hotels.length; i++) {
      if (this.hotels[i].id === id) {
        return this.hotels[i];
      }
    }
  }

  editHotel(
    _id: number,
    id: string,
    name: string,
    description: string,
    displayImage: string,
    images: Array<string>,
    address: string,
    hyperLink: string,
    keepername: string,
    postalcode: string,
    startingPrice: string,
    totalrooms: number,
    standardQueen: Array<string>,
    superiorRoom: Array<string>
  ) {
    return this.http.put<any[]>(
      this.hotelsUrl + _id,

      {
        id: id,
        name: name,
        description: description,
        displayImage: displayImage,
        images: images,
        address: address,

        hyperLink: hyperLink,
        keepername: keepername,
        postalcode: postalcode,
        startingPrice: startingPrice,
        totalrooms: totalrooms,
        standardQueen: standardQueen,
        superiorRoom: superiorRoom,
      }
    );
  }
  deleteHotel(id) {
    return this.http.delete<any[]>(this.hotelsUrl + id);
  }
}
