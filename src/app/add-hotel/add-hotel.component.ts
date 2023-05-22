import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css'],
})
export class AddHotelComponent implements OnInit {
  //array for images
  images: any = [];
  hotels: any;
  // i want data to be formed like this for room
  // standardQueen  = [{name:"deluxe room",bed:"king bed",features:["xxx","xxxx","xxxx","xxxxx","xxxxx"],price:"SGD 41"}];
  // superiorRoom/superiorQueen  = [{name:"deluxe room",bed:"king bed",features:["xxx","xxxx","xxxx","xxxxx","xxxxx"],price:"SGD 41"}];
  // array for standardQueen (room) --> following mongodb
  standardQueen: any = [];
  //array for superiorQueen(room2)
  superiorQueen: any = [];
  //array of features for first rooom
  standardFeatures: any = [];
  //array of features in second room
  superiorFeatures: any = [];
  //create object standardQ that will be inside standardQueen array
  standardQ: any = {
    name: '',
    bed: '',
    features: [],
    price: '',
  };
  //create object superiorQ that will be inside superiorQueen array
  superiorQ: any = {
    name: '',
    bed: '',
    features: [],
    price: '',
  };
  //create formGroup object called myForm
  myForm: FormGroup;
  validationUserMessage = {
    hotelName: [{ type: 'required', message: 'Please enter the hotel name' }],
    hotelDescription: [
      {
        type: 'required',
        message: 'Please enter the description of the hotel',
      },
    ],
    hotelDisplayImage: [
      { type: 'required', message: 'Please enter the url of image' },
    ],
    hotelImages: [
      {
        type: 'required',
        message: 'Please enter an array of hotel url images!',
      },
    ],
    hotelAddress: [
      { type: 'required', message: 'Please enter the address the hotel' },
    ],
    hotelCoordinates: [
      {
        type: 'required',
        message: 'Please enter the coordinates of the hotel!',
      },
    ],
    hotelHyperLink: [
      {
        type: 'required',
        message: 'Please enter the website of the hotel here! ',
      },
    ],

    hotelKeepername: [
      { type: 'required', message: 'Please enter the owner of this hotel ' },
    ],
    hotelPostalcode: [
      {
        type: 'required',
        message: 'Please enter the postalcode of this hotel ',
      },
    ],
    hotelStartingPrice: [
      {
        type: 'required',
        message: 'Please enter the starting price of this hotel ',
      },
    ],
    hotelTotalrooms: [
      { type: 'required', message: 'Please enter the owner of this hotel ' },
    ],
    hotelCheckIn: [
      { type: 'required', message: 'Please enter the owner of this hotel ' },
    ],
    hotelCheckOut: [
      { type: 'required', message: 'Please enter the owner of this hotel ' },
    ],
    id: [{ type: 'required', message: 'Please enter the id of this hotel ' }],
    hotelStandardQueen: [
      { type: 'required', message: 'Please enter the  features of this room ' },
    ],
    hotelSuperiorRoom: [
      { type: 'required', message: 'Please enter the features  of this room ' },
    ],
  };
  constructor(
    //dependency injection of FormBuilder as an object call fb
    private fb: FormBuilder,
    private auth: AuthService,
    private hotelsService: HotelService
  ) {}

  ngOnInit() { 
    //Construct the FormGroup object using FormBuilder with Validators
    this.myForm = this.fb.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      hotelName: new FormControl('', Validators.compose([Validators.required])),
      hotelDescription: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      hotelDisplayImage: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      image1: new FormControl('', Validators.compose([Validators.required])),
      image2: new FormControl('', Validators.compose([Validators.required])),
      image3: new FormControl('', Validators.compose([Validators.required])),
      image4: new FormControl('', Validators.compose([Validators.required])),
      image5: new FormControl('', Validators.compose([Validators.required])),
      image6: new FormControl('', Validators.compose([Validators.required])),
      image7: new FormControl('', Validators.compose([Validators.required])),

      hotelAddress: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      hotelCoordinates: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      keeperName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      postalCode: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      startingPrice: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      hyperLink: new FormControl('', Validators.compose([Validators.required])),
      totalrooms: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      standardName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      standardBed: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      standardPrice: new FormControl(''),
      standardFeature1: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      standardFeature2: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      standardFeature3: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      standardFeature4: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      standardFeature5: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      standardFeature6: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      standardFeature7: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      superiorName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      superiorBed: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      superiorPrice: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      superiorFeature1: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      superiorFeature2: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      superiorFeature3: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      superiorFeature4: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      superiorFeature5: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      superiorFeature6: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      superiorFeature7: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  onSubmit() {
    //push the images into the array initialised earlier
    this.images.push(
      this.myForm.value.image1,this.myForm.value.image2,this.myForm.value.image3,this.myForm.value.image4,this.myForm.value.image5,this.myForm.value.image6
      );
    //push the features for room1 into the arrray standardFeatures
    this.standardFeatures.push(
      this.myForm.value.standardFeature1,
      this.myForm.value.standardFeature2,
      this.myForm.value.standardFeature3,
      this.myForm.value.standardFeature4,
      this.myForm.value.standardFeature5,
      this.myForm.value.standardFeature6,
      this.myForm.value.standardFeature7
    );
    //object.name to form.value.standardName
    this.standardQ.name = this.myForm.value.standardName;
    this.standardQ.bed = this.myForm.value.standardBed;
    this.standardQ.features = this.standardFeatures;
    this.standardQ.price = this.myForm.value.standardPrice;
    //push the object into the array
    this.standardQueen.push(this.standardQ);
   //push the features for room2 into the arrray superiorFeatures
    this.superiorFeatures.push(
      this.myForm.value.superiorFeature1,
      this.myForm.value.superiorFeature2,
      this.myForm.value.superiorFeature3,
      this.myForm.value.superiorFeature4,
      this.myForm.value.superiorFeature5,
      this.myForm.value.superiorFeature6,
      this.myForm.value.superiorFeature7
    );
      //object.name to form.value.superiorName
    this.superiorQ.name = this.myForm.value.superiorName;
    this.superiorQ.bed = this.myForm.value.superiorBed;
    this.superiorQ.features = this.superiorFeatures;
    this.superiorQ.price = this.myForm.value.superiorPrice;
    ///push the object into the array
    this.superiorQueen.push(this.superiorQ);

   //add hotel using hotelsSerivice
    this.hotelsService
      .addHotel(
        this.myForm.value.id,
        this.myForm.value.hotelName,
        this.myForm.value.hotelDescription,
        this.myForm.value.hotelDisplayImage,
        this.images,
        this.myForm.value.address,
        this.myForm.value.hyperLink,
        this.myForm.value.keeperName,
        this.myForm.value.postalCode,
        this.myForm.value.startingPrice,
        this.myForm.value.totalrooms,
        this.standardQueen,
        this.superiorQueen
      )
      .subscribe((data) => {
        this.hotels = data;
        console.log(this.hotels);
      });

  }
}
