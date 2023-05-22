import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotelService } from '../hotel.service';
import { ModalService } from '../modal.service';
import { UserserviceService } from '../userService.service';

@Component({
  selector: 'app-book-hotel',
  templateUrl: './book-hotel.component.html',
  styleUrls: ['./book-hotel.component.css'],
})
export class BookHotelComponent implements OnInit {
  id: number;
  //array for hotels
  hotels: any = [];
  private sub: any;
  message: string;

  ngOnInit() {}
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private router: Router,
    private shared: ModalService
  ) {
    //get hotel data by id
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id']; // + converts string 'id' to a number
      console.log(this.id);
      this.hotelService.getHotelDetailById(this.id).subscribe((hotels) => {
        this.hotels = hotels;
      });
    });
  }
  //open modal using service
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
 //dismiss modal using esc key or click the  x backdrop
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
 
  onItemChange(value) {
    // i want to pass the room chosen to the payment page..
    //so using shared service (in my file - it is the modal service),setting the message as this room .
    console.log(' Value is : ', value);
  
    this.message = value;
    console.log(this.message);
    this.shared.setMessage(this.message);
  }
}
