import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BookingService } from '../booking.service';
import { HotelService } from '../hotel.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-booking-payment',
  templateUrl: './booking-payment.component.html',
  styleUrls: ['./booking-payment.component.css']
})
export class BookingPaymentComponent implements OnInit {
  results:any = false;
  id:number;
  hotels:any =[];
  private sub:any;
  message:string;
  tokenMsg:string;
  //assuming room is price //accidental naming
  room:any;
  customer:any;
  //to change from process payment to processing please wait..
  formProcess:boolean;
  submitted:boolean;
  myForm:FormGroup;
  //validation message shown
  validationUserMessage = {
    fullname:[  {type:'required',message:"Please enter your full name!"},],
    email:[
      {type:'required',message:"Please enter your email!"},
      {type:'pattern',message:"Email entered is incorrect.Try Again!"}
    ],
    address:[
      {type:'required',message:"Please enter your address!"},
    ],
    city:[
      {type:'required',message:"Please enter your city!"},
    ],
    state:[
      {type:'required',message:"Please enter your city!"},
    ],
    zip:[
      {type:'required',message:"Please enter your zip!"},
    ],
    cardname:[
      {type:'required',message:"Please enter your card name!"},
    ],
    cardnumber:[
      {type:'required',message:"Please enter your card number!"},
    ],
    expmonth:[
      {type:'required',message:"Please enter your card expiry month!"},
    ],
    expyear:[
      {type:'required',message:"Please enter your card expiry year!"},
    ],
    cvv:[
      {type:'required',message:"Please enter your card cvv!"},
    ],
  }
  
  constructor(private route:ActivatedRoute,private hotelService:HotelService,private router:Router,private shared:ModalService,private fb:FormBuilder,private bookingService:BookingService,private auth:AuthService) {
    //get hotel by id 
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id']; // + converts string 'id' to a number
      console.log(this.id)
      this.hotelService.getHotelDetailById(this.id).subscribe((hotels)=>{
        this.hotels = hotels 
        console.log(hotels)
        //FOR E.G IF rooom chosen is Deluxe Room
        //if the message which is the price rooom choosen was set in book-hotel = this.hotels[0].superiorRoom.name,so if both is Deluxe room,
        //then conclude that room's price is THIS superiior Rooom price.

        // this.message = superiorRoom 
        //this.room = superiorRoom's price.

        if(this.hotels[0].superiorRoom[0].name == this.message){
            this.room = this.hotels[0].superiorRoom[0].price;
           // this.message = this.hotels[0].superiorRoom[0].name;
            console.log(this.message);
        }
        else{
          //if  room chosen in the book-hotel and the superior Room name is not the same
          //then , the price will be standardQueen price.
          //message(room chosen) is the name of room

          this.room = this.hotels[0].standardQueen[0].price;
          this.message = this.hotels[0].standardQueen[0].name;
        }

        console.log(this.room);
        console.log(this.message)
        
      })
    });
  }

  ngOnInit(): void {
    //get message that was set in the book-hotel component -> this is the price
    this.message = this.shared.getMessage();
    this.room = this.message;

    this.loadStripe();
    this.customer = localStorage.getItem('username')
    console.log(this.customer)
  
    //Construct the FormGroup object using FormBuilder
    this.myForm = this.fb.group({
      fullname:new FormControl('',Validators.compose([
        Validators.required
      ])),
      email:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      address: new FormControl('',Validators.compose([
        Validators.required,

      ])),
      details: new FormControl(''),
      city: new FormControl('',Validators.compose([
        Validators.required,

      ])),
      state: new FormControl('',Validators.compose([
        Validators.required,

      ])),
      zip: new FormControl('',Validators.compose([
        Validators.required,

      ])),
      cardname: new FormControl('',Validators.compose([
        Validators.required,

      ])),
      cardnumber: new FormControl('',Validators.compose([
        Validators.required,

      ])),
      expmonth: new FormControl('',Validators.compose([
        Validators.required,

      ])),
      expyear: new FormControl('',Validators.compose([
        Validators.required,

      ])),
      cvv: new FormControl('',Validators.compose([
        Validators.required,

      ])),
      
       
    })
  }

loadStripe() {
  //this method will add the script dynamically when the component is loaded.
  if(!window.document.getElementById('stripe-custom-form-script')) {
    //createElement
    var s = window.document.createElement("script");
  
    s.id = "stripe-custom-form-script";
    s.type = "text/javascript";
    s.src = "https://js.stripe.com/v2/";
    s.onload = () => {
      window['Stripe'].setPublishableKey('----YOUR PUBLISHABLE KEY----');
    }
     
    window.document.body.appendChild(s);
  }
}
pay(form) {
  
  if(!window['Stripe']) {
    alert('Oops! Stripe did not initialize properly.');
    return;
  }
  
  this.submitted = true;
  //if form is invalid -- if missing required fields
  //return
  if (this.myForm.invalid) {   
    console.log(this.room)   
    return;
  }   
 
  this.formProcess = true;
  console.log(form);
  if(!window['Stripe']) {
    alert('Oops! Stripe did not initialize properly.');
    return;
  }
  //get price number only from the string.. SGD 71 --> ONLY 71
  var priceSplit= this.room.split(' ');
  var price = priceSplit[1];

  //create card token
  //basedd on form values
  (<any>window).Stripe.card.createToken({
   
    number: form.cardnumber,
    exp_month: form.expmonth,
    exp_year: form.expyear,
    cvc: form.cvv
  }, (status: number, response: any) => {

    if (status === 200) {
      //if successful show alert
      this.tokenMsg = `Success! Card token ${response.card.id}.`;
      alert("token is created")
      this.formProcess = false;
  //since card token succussful ->charge card
     this.bookingService.createPayment(price,response.id,this.hotels[0].name).subscribe((data)=>{
      if(data!= null){
         //if data is not empty and it is successful then 
         //create boooking in mongodb
         console.log("say right")
         this.bookingService.createBooking(this.id,this.hotels[0].displayImage,this.hotels[0].name,this.message,this.room,localStorage.getItem('username'),this.myForm.value.fullname,this.myForm.value.email,Date.now(),this.myForm.value.details).subscribe(data => {
          this.results = data;
        });
        // then navigate back to bookings
        this.router.navigate[('/bookings')];
       }

     })
    } else {
      //else if it is data is null , show err message
      //e.g if expiry date is not valid
      this.tokenMsg = response.error.message;
      alert(this.tokenMsg)
    }
  });
}

  

}
