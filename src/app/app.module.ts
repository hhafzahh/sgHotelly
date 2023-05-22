import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserserviceService } from './userservice.service';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelService } from './hotel.service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { UserComponent } from './user/user.component';
import { BookHotelComponent } from './book-hotel/book-hotel.component';
import { BookingPaymentComponent } from './booking-payment/booking-payment.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AuthInterceptor } from './auth.interceptor';
import { BookingComponent } from './booking/booking.component';
import { ProfileComponent } from './profile/profile.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,

    FilterPipe,
    SortPipe,
    HotelDetailComponent,

    LoginComponent,
    RegisterComponent,

    UserComponent,
    BookHotelComponent,
    BookingPaymentComponent,
    AddHotelComponent,
    BookingComponent,
    ProfileComponent,
    EditHotelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    HotelService,
    UserserviceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
