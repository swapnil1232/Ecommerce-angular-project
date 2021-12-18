import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';

import { ApiService } from './api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LogoutComponent } from './logout/logout.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { AdminproductsComponent } from './adminproducts/adminproducts.component';
import { AdminproductComponent } from './adminproduct/adminproduct.component';
import { SliderComponent } from './slider/slider.component';
import { SlidersComponent } from './sliders/sliders.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ProductsComponent } from './products/products.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CartsComponent } from './carts/carts.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { PaymentComponent } from './payment/payment.component';
import { OrdersComponent } from './orders/orders.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminloginComponent,
    AdmindashboardComponent,
    LogoutComponent,
    ProductcategoriesComponent,
    ProductcategoryComponent,
    AdminproductsComponent,
    AdminproductComponent,
    SliderComponent,
    SlidersComponent,
    TestimonialComponent,
    TestimonialsComponent,
    ProductsComponent,
    ProductdetailsComponent,
    CartsComponent,
    CheckoutComponent,
    UserloginComponent,
    CreateaccountComponent,
    MyaccountComponent,
    PaymentComponent,
    OrdersComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
