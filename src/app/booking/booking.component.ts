import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../booking.service';
import { HotelService } from '../hotel.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class Hotel {
  name: string;
  price: string;
  hotelId: number;
  room: string;
  total: string;
  bookingDate;
}
class Receipt {
  customerName: string;
  role: string;
  contactNo: number;
  email: string;

  hotels: Hotel[] = [];
  additionalDetails: string;
}
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookings: any = [];
  results: any;
  images: any = [];
  reciept = new Receipt();
  hotel = new Hotel();
  constructor(
    private bookingService: BookingService,
    private hotelService: HotelService,
    private modalService: NgbModal
  ) {
    //get bookings
    this.bookingService.getBooking().subscribe((bookings) => {
      this.bookings = bookings;

    });
  }
  //creating a deleteBooking(id) function that calls the injected bookingsService's deleteBooking() function
  deleteBooking(id) {
    this.bookingService.deleteBooking(id).subscribe((results) => {
      location.reload();
    });
  }

  ngOnInit(): void {}

  open(content) {
    this.modalService.open(content, { centered: true });
  }
  view(id) {
    this.bookingService.getOne(id).subscribe((data) => {
      this.results = data;
      this.reciept.customerName = this.results.customerName;
      this.reciept.email = this.results.email;
      this.reciept.role = localStorage.getItem('role');
      this.reciept.additionalDetails = this.results.detail;
      this.hotel.price = this.results.amount;
      (this.hotel.name = this.results.hotelName),
        (this.hotel.room = this.results.hotelRoom);
      this.hotel.hotelId = this.results.hotelId;
      const total = this.hotel.price.split(' ');
      this.hotel.bookingDate = new Date(
        this.results.bookingDate
      ).toLocaleString();
      //get price --> now its like this SGD 51.
      this.hotel.total = total[1];

      this.generatePDF();
    });
  }

  generatePDF() {
    // generate client side documentation
    //using pdfMake js to generate pdf 
    //document definition
    // docDefinition is an object
    let docDefinition = {
      // a content property array
      content: [
        {
          //what you put here will display in the pdf
          text: 'SGHOTELLY',
          fontSize: 16,
          alignment: 'center',
          color: '#000260',
        },
        {
          text: 'RECIEPT',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'red',
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader',
        },

        {
          columns: [
            [
              {
                text: this.reciept.customerName,
                bold: true,
              },
              { text: this.reciept.role },
              { text: this.reciept.email },
              { text: this.reciept.contactNo },
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right',
              },
              {
                text: `Bill No : ${(Math.random() * 1000).toFixed(0)}`,
                alignment: 'right',
              },
            ],
          ],
        },
        {
          text: 'Order Details',
          style: 'sectionHeader',
        },
        {
          //table with with 4 columns and 3 rows
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Hotel Booked', 'Amount', 'HotelId', 'Room'],
              [
                this.hotel.name,
                this.hotel.price,
                this.hotel.hotelId,
                this.hotel.room,
              ],

              [
                { text: 'Total Amount', bold: true, colSpan: 3 },
                {},
                {},
                '$' + this.hotel.total,
              ],
            ],
          },
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader',
        },
        {
          text: this.reciept.additionalDetails,
          margin: [0, 0, 0, 15],
        },
        {
          columns: [
            [{ qr: `${this.hotel.name}`, fit: '50' }],
            [
              {
                text: `Booked Date: ${this.hotel.bookingDate}`,
                alignment: 'right',
                italics: true,
              },
            ],
          ],
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader',
        },
        {
          ul: [
            'Booking can be deleted but cannot be edited',
            'Warrenty of the receipt  will be subject to the manufacturer terms and conditions.',
            'This is system generated receipt.',
          ],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
