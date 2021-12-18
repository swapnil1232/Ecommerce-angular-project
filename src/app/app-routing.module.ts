import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminproductComponent } from './adminproduct/adminproduct.component';
import { AdminproductsComponent } from './adminproducts/adminproducts.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
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


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"home", component:HomeComponent},
  {path:"admin-login", component:AdminloginComponent},
  {path:"admin-dashboard", component:AdmindashboardComponent},
  {path:"admin-product-categories", component:ProductcategoriesComponent},
  {path:"admin-product-category/:id", component:ProductcategoryComponent},
  {path:"admin-products", component:AdminproductsComponent},
  {path:"admin-product/:id", component:AdminproductComponent},
  {path:"admin-orders", component:OrdersComponent},

  {path:"products/:pcid", component:ProductsComponent},
  // {path:"products", component:ProductsComponent},
  {path:"productdetails/:id", component:ProductdetailsComponent},
  {path:"cart", component:CartsComponent},
  {path:"checkout", component:CheckoutComponent},
  {path:"userlogin", component:UserloginComponent},
  {path:"userlogin/:from", component:UserloginComponent},
  {path:"createaccount", component:CreateaccountComponent},
  {path:"myaccount", component:MyaccountComponent},
  {path:"payment/:id", component:PaymentComponent},
 
 
  {path:"logout", component:LogoutComponent},
  {path:"admin-slider/:id", component:SliderComponent},
  {path:"admin-sliders", component:SlidersComponent},
  {path:"admin-testimonial/:id", component:TestimonialComponent},
  {path:"admin-testimonial", component:TestimonialComponent},
  {path:"admin-testimonials", component:TestimonialsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingCompoment = [HomeComponent,
                                 AdminloginComponent,
                                  AdmindashboardComponent,
                                  SliderComponent,
                                  TestimonialComponent,
                                  TestimonialsComponent,
                                  ProductsComponent,
                                  ProductdetailsComponent,
                                  CartsComponent,
                                  CheckoutComponent,
                                  UserloginComponent,
                                  CreateaccountComponent,
                                  MyaccountComponent,
                                  OrdersComponent,
                                  PaymentComponent]
