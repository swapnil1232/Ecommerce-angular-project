import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {

  products:any;
  cartproducts: any;
  subtotal = 0;

  baseurl = this.api.baseURL;
  id = 0;

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute) {
    this.baseurl = api.baseURL;
  }

  ngOnInit(): void {
    this.binddata();
  }

  binddata()
  {
    let products = localStorage.getItem("products");
    this.cartproducts = null;
      if(products != null){
        this.cartproducts = JSON.parse(products);
    }
    let productids = "0";
    if(this.cartproducts != null){
      this.cartproducts.forEach((element: { id: number; quantity : number}) => {
        productids += (productids == "" ? "" : ",") + element.id;
      });
    }
    var reqdata = {"data": {productids: productids}};
    var reply = this.api.callapi("admin/products", reqdata);
    reply.subscribe((mydata:any)=>{
      this.products = mydata;
     this.refreshcart();
  });
}

refreshcart()
{
  this.subtotal = 0;
  this.products.forEach((element: any) => {
    this.cartproducts.forEach((cartelement: { id: number; quantity : number}) => {
      if(cartelement.id == element.id)
      {
        element.quantity = cartelement.quantity;
      }
    });
    this.subtotal += (element.quantity * element.price);
  });
}

removefromcart(productid:any)
  {
    let products = localStorage.getItem("products");
    let productarray: { id: number, quantity: number }[] = [];
    if(products != null){
      var productsarray = JSON.parse(products);
      productsarray.forEach((element: { id: number; quantity: number }) => {          
          if(element.id != productid){
            productarray.push(element);
          }
      });
    }
    localStorage.setItem("products", JSON.stringify(productarray));
    this.binddata();
  }

  changeQuantity(productid: number, event: Event)
  {
    let ctrl = <HTMLInputElement>event.target;
    if(ctrl.value != "")
    {
      let quantity =Number(ctrl.value);
    let products = localStorage.getItem("products");
    let productarray: { id: number, quantity: number }[] = [];
    if(products != null){
      var productsarray = JSON.parse(products);
      productsarray.forEach((element: { id: number; quantity: number }) => {
        if(element.id == productid){
          element.quantity = quantity;
        }
        productarray.push(element);         
      });
    }
    localStorage.setItem("products", JSON.stringify(productarray));
    this.cartproducts = productarray;
     this.refreshcart();
    }
  }

  onClick(){
      this.router.navigate(['../checkout']);
  }
  

}
