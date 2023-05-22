import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  bookingUrl: string = 'http://localhost:3000/api/bookings/';
  paymentUrl: string = 'http://localhost:3000/api/chargeUser/';
  constructor(private http: HttpClient) {}

  createBooking(
    hotelId: number,
    image: string,
    hotelName: string,
    room: string,
    amount: string,
    customerId: string,
    customerName: string,
    email: string,
    bookingDate,
    detail: string
  ) {
    return this.http.post<any[]>(this.bookingUrl, {
      hotelId: hotelId,
      image: image,
      hotelName: hotelName,
      hotelRoom: room,
      amount: amount,
      customerId: customerId,
      customerName: customerName,
      email: email,
      bookingDate: bookingDate,
      detail: detail,
    });
  }
  getBooking() {
    return this.http.get<any[]>(this.bookingUrl);
  }
  editBooking(
    id: number,
    hotelId: number,
    image: string,
    amount: string,
    customerId: string,
    customerName: string,
    email: string,
    bookingDate
  ) {
    return this.http.put<any[]>(this.bookingUrl + '/' + id, {
      hotelId: hotelId,
      image: image,
      amount: amount,
      customerId: customerId,
      customerName: customerName,
      email: email,
      bookingDate: bookingDate,
    });
  }
  getOne(id) {
    console.log(this.bookingUrl + id);
    return this.http.get<any[]>(this.bookingUrl + id);
  }
  // a function deletePost() to make a DELETE API call
  deleteBooking(id) {
    return this.http.delete<any[]>(this.bookingUrl + id);
  }

  createPayment(amount, token: string, hotelName: string) {
    return this.http.post<any[]>(this.paymentUrl, {
      amount: amount,
      hotelName: hotelName,
      token: token,
    });
  }
}
