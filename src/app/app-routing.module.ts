import { NgModule,ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthorizeGuard } from './authorize.guard';
import { BookHotelComponent } from './book-hotel/book-hotel.component';
import { BookingPaymentComponent } from './booking-payment/booking-payment.component';
import { BookingComponent } from './booking/booking.component';
import { ContactComponent } from './contact/contact.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { HomeComponent } from './home/home.component';

import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { LoginComponent } from './login/login.component';


import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RoleGuard } from './role.guard';

import { UserComponent } from './user/user.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path : 'register', component:RegisterComponent},
  { path : 'login', component:LoginComponent},
  { path : 'detail/:id',component:HotelDetailComponent},
  { path: 'room/detail/:id',component:BookHotelComponent},
  
  { path: 'book',component:BookHotelComponent},
  {path: 'payment/:id',component:BookingPaymentComponent,canActivate:[AuthGuard]},
  {path:'add',component:AddHotelComponent,canActivate:[RoleGuard]},
  {path:'bookings',component:BookingComponent,canActivate:[AuthGuard]},
  {path:'users',component:UserComponent,},
  {path:'profile',component:ProfileComponent,},
  {path:'edit/:id',component:EditHotelComponent,canActivate:[AuthorizeGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);