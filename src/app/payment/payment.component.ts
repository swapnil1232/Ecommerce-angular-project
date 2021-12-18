import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
// declare var Razorpay: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  orderid = 0;
  products: any;
  cartproducts : any;
  data: any;
  subtotal = 0;
  total = 0;
  mrptotal = 0;
  shipping = 0;
  baseurl = this.api.baseURL;
  
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.orderid = Number(this.route.snapshot.paramMap.get("id"));
    if (this.api.getcookie("usertype") != "user") {
      this.router.navigate(['../userlogin/cart']);
    }
    this.binddata();
  }

  binddata() {
    
    var reqdata = { "data": { id: this.orderid } };
    var reply = this.api.callapi("admin/orderdetails", reqdata);
    reply.subscribe((mydata: any) => {
      this.products = mydata;
    });

    var reqdata = { "data": { id: this.orderid } };
    var reply = this.api.callapi("admin/order", reqdata);
    reply.subscribe((mydata: any) => {
      this.data = mydata[0];
    });
  }
  
  // Payment Integration in RazorPay Gateway


  paynow() {
 let options = {
    "key": "rzp_live_swPK7rd1Iy42Cf", 
    "amount": this.data.totalbillamount * 100, 
    "currency": "INR",
    "name": "i-GAP Store",
    "description": "Test Transaction",
    "image": "https://www.igaptechnologies.com/assets/slogo.png",
    "order_id": "", 
    "callback_url": this.baseurl + "/orderresult/" + this.orderid,
    "prefill": {
        "name": this.data.name,
        "email": "gatadeabhijit@gmail.com",
        "contact": this.data.mobileno,
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
    let rzp1 = new this.api.nativeWindow.Razorpay(options);
     rzp1.open();
   

  }
  
  

}

