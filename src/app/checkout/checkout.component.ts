import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Item } from '../item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products: any;
  cartproducts: any;

  subtotal = 0;
  mrptotal = 0;
  shipping = 0;
  total = 0;
  name='';
  mobileno='';
  cityname='';
  state='';
  pincode='';
  address="";
  baseurl = this.api.baseURL;
  formdata:any;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    if (this.api.getcookie("usertype") != "user") {
      this.router.navigate(['../userlogin/cart']);
    }
    this.binddata();
  
  }

  binddata() {
    let products = localStorage.getItem("products");
    this.cartproducts = null;
    if (products != null) {
      this.cartproducts = JSON.parse(products);
    }
    let productids = "0";
    if (this.cartproducts != null) {
      this.cartproducts.forEach((element: { id: number; quantity: number }) => {
        productids += (productids == "" ? "" : ",") + element.id;
      });
    }
    var reqdata = { "data": { productids: productids } };
    var reply = this.api.callapi("admin/products", reqdata);
    reply.subscribe((mydata: any) => {
      this.products = mydata;
      this.refreshcart();
    });
  }

  refreshcart() {
    this.subtotal = 0;
    this.products.forEach((element: any) => {
      this.cartproducts.forEach((cartelement: { id: number; quantity: number }) => {
        if (cartelement.id == element.id) {
          element.quantity = cartelement.quantity;
        }
      });
      this.subtotal += (element.quantity * element.price);
    });
    this.total = this.subtotal;
  }

  placeorder() {
    var validated = true;
    if(this.address == "")
    {
      alert("Enter address");
      validated = false;
    }
    if(this.name == "")
    {
      alert("Enter name");
      validated = false;
    }
    if(this.mobileno == "")
    {
      alert("Enter mobileno");
      validated = false;
    }
    if(this.cityname == "")
    {
      alert("Enter cityname");
      validated = false;
    }
    if(this.pincode == "")
    {
      alert("Enter pincode");
      validated = false;
    }
    
    
if(validated){
    let orderdetails = new Array<Item>();
    this.mrptotal = 0;
    this.subtotal = 0;
    this.shipping = 0;
    this.products.forEach((element: any) => {
      this.cartproducts.forEach((cartelement: { id: number; quantity: number }) => {
        if (cartelement.id == element.id) {
          let myitem = new Item();
          myitem.productid = Number(element.id);
          myitem.mrp = Number(element.mrp);
          myitem.price = Number(element.price);
          myitem.quantity = Number(cartelement.quantity);
          myitem.mrptotal = Number(element.mrp * cartelement.quantity);
          myitem.priceamount = Number(element.price);
          myitem.billamount = Number(element.price * cartelement.quantity);
          myitem.shippingamount = Number("0");
          myitem.totalbillamount = Number(element.price * cartelement.quantity);
          orderdetails.push(myitem);

          this.mrptotal += myitem.mrptotal;
          this.subtotal += myitem.billamount;
          this.shipping +=   myitem.shippingamount;
        }
 
      });
    });

    let order = {
      id: 0,
      orderdate: "",
      name:this.name,
      mobileno:this.mobileno,
      userid: Number(this.api.getcookie("userid")),
      mrptotal: this.mrptotal,
      priceamount: this.subtotal,
      discountamount: 0,
      billamount: this.subtotal,
      shippingamount: this.shipping,
      totalbillamount:  this.subtotal + this.shipping,
      address: this.address,
      cityname: this.cityname,
      pincode: this.pincode,
      status: "not paid",
      orderdetails: orderdetails
    };
    var reqdata = { "data": order };
    var reply = this.api.callapi("user/saveorder", reqdata);
    reply.subscribe((mydata: any) => {
      //  alert(mydata);    
      //console.log(mydata.data.id);
      this.router.navigate(['/payment/' + mydata.data.id]);
    });
  }
  }

}
