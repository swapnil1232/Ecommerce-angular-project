import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartproductcount = 0;
  isadmin = false;
  isuser=false;
  productcategories:any;
  categoryid = 0;
  categoryname = "Category";
  username = "";

  constructor(private api:ApiService, private router: Router) {
    if(this.api.getcookie("usertype") == "admin")
      this.isadmin = true;
      if(this.api.getcookie("usertype") == "user"){
      this.isuser = true;
      this.username = this.api.getcookie("username");
      }
     
   }

   ngOnInit(): void {
       this.binddata();
       let products = localStorage.getItem("products");
      if(products != null){
        var productsarray = JSON.parse(products);
        this.cartproductcount = productsarray.length;
        
      

      }
   }

   linkClicked(id:any, name:any)
   {
     this.categoryid = id;
    this.categoryname = name;
    
      
   }
   

   binddata()
   {
     var reqdata = {"data": ""};
     var reply = this.api.callapi("admin/productcategories", reqdata);
     reply.subscribe((mydata:any)=>{
       this.productcategories = mydata;
    
   });
   }



}
