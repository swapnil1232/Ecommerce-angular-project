import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-productcategories',
  templateUrl: './productcategories.component.html',
  styleUrls: ['./productcategories.component.css']
})
export class ProductcategoriesComponent implements OnInit {
  data:any;
  constructor(private api:ApiService, private router: Router) { }

  ngOnInit(): void {
   this.binddata();
  }

  binddata()
  {
    var reqdata = {"data": ""};
    var reply = this.api.callapi("admin/productcategories", reqdata);
    reply.subscribe((mydata:any)=>{
      this.data = mydata;
      //Array.from(Object.keys(mydata), k=>mydata[k]);
      //console.log(this.data);
  });
  }

  deleteproductcategory(id:any)
  {
    if(confirm("sure to delete?"))
    {
      var reqdata = {"data": {"id": id}};
      var reply = this.api.callapi("admin/deleteproductcategory", reqdata);
      reply.subscribe((mydata:any)=>{
         let data = Array.from(Object.keys(mydata), k=>mydata[k]);
         this.binddata();
        });
    }
  }
}
