import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productcategories: any;
  testimonials: any;
  sliders: any;
  baseurl = this.api.baseURL;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.binddata();
    window.scrollTo(0, 0);
  

  }

  binddata() {
    var reqdata = { "data": "" };
    var reply = this.api.callapi("admin/productcategories", reqdata);
    reply.subscribe((mydata: any) => {
      this.productcategories = mydata;
    });
    var reqdata = { "data": "" };
    var reply = this.api.callapi("admin/testimonials", reqdata);
    reply.subscribe((mydata: any) => {
      this.testimonials = mydata;
    });
    var reqdata = { "data": "" };
    var reply = this.api.callapi("admin/sliders", reqdata);
    reply.subscribe((mydata: any) => {
      this.sliders = mydata;

    });
  }


}
