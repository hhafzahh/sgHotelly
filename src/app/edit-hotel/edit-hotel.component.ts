import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css']
})
export class EditHotelComponent implements OnInit {
  //exacty the same as add-hotel component.ts 
  //just the hotelsService 
  images: any = [];
  hotels: any;
  standardQueen: any = [];
  superiorQueen: any = [];
  standardFeatures: any = [];
  superiorFeatures: any = [];
  standardQ: any = {
    name: '',
    bed: '',
    features: [],
    price: '',
  };
  superiorQ: any = {
    name: '',
    bed: '',
    features: [],
    price: '',
  };
myForm:FormGroup
id:any;
  sghotels:any =[];
  private sub:any;
  constructor(private fb:FormBuilder,private hotelService:HotelService,private route:ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id']; // + converts string 'id' to a number
      console.log(this.id)
      this.hotelService.getHotelDetailById(this.id).subscribe((hotels)=>{
        this.hotels = hotels 
      })

   });
  }

  ngOnInit(): void {
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
    console.log(this.id)
    console.log('hi');
    this.images.push(this.myForm.value.image1);
    this.images.push(this.myForm.value.image2);
    this.images.push(this.myForm.value.image3);
    this.images.push(this.myForm.value.image4);
    this.images.push(this.myForm.value.image5);
    this.images.push(this.myForm.value.image6);
    this.standardFeatures.push(
      this.myForm.value.standardFeature1,
      this.myForm.value.standardFeature2,
      this.myForm.value.standardFeature3,
      this.myForm.value.standardFeature4,
      this.myForm.value.standardFeature5,
      this.myForm.value.standardFeature6,
      this.myForm.value.standardFeature7
    );
    this.standardQ.name = this.myForm.value.standardName;
    this.standardQ.bed = this.myForm.value.standardBed;
    this.standardQ.features = this.standardFeatures;
    this.standardQ.price = this.myForm.value.standardPrice;
    //console.log(this.standardQ)
    this.standardQueen.push(this.standardQ);
    // console.log(this.standardQueen)
    this.superiorFeatures.push(
      this.myForm.value.superiorFeature1,
      this.myForm.value.superiorFeature2,
      this.myForm.value.superiorFeature3,
      this.myForm.value.superiorFeature4,
      this.myForm.value.superiorFeature5,
      this.myForm.value.superiorFeature6,
      this.myForm.value.superiorFeature7
    );
    this.superiorQ.name = this.myForm.value.superiorName;
    this.superiorQ.bed = this.myForm.value.superiorBed;
    this.superiorQ.features = this.superiorFeatures;
    this.superiorQ.price = this.myForm.value.superiorPrice;
    this.superiorQueen.push(this.superiorQ);
    // console.log(this.superiorQueen)
    console.log(
      this.myForm.value.hotelName,
      this.myForm.value.hotelDescription,
      this.myForm.value.hotelDisplayImage,
      this.images
    );
    this.hotelService
      .editHotel(this.id,
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

    //how to add hotel which has an image array
  }

}
