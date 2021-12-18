import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  id = 0;
  productdetail:any = null;
  baseurl = this.api.baseURL;
  quantity = 1;
  products: any;

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute) {
    this.baseurl = api.baseURL;
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.products = localStorage.getItem("products");
    if(this.products != null){
      this.products = JSON.parse(this.products);
      this.products.forEach((element: { id: number; quantity : number}) => {
        if(this.id == element.id){
        this.quantity = element.quantity;
        }
      });
    }
    this.binddata();
  }

  binddata()
  {
      var reqdata = {"data": {id:this.id}};
      //console.log(reqdata);
      var reply = this.api.callapi("admin/product", reqdata);
      reply.subscribe((mydata:any)=>{
        this.productdetail = mydata[0];
      });
  }

  addtocart()
  {
    let product = {id: this.id, quantity: this.quantity};
    let products = localStorage.getItem("products");
    let productarray: { id: number, quantity: number }[] = [];
    let found = false;
    if(products != null){
      var productsarray = JSON.parse(products);
      productsarray.forEach((element: { id: number; quantity: number }) => {
          productarray.push(element);
          if(element.id == product.id){
            found = true;
          }
      });
    }
    if(!found)
    {
      productarray.push(product);
    }
    localStorage.setItem("products", JSON.stringify(productarray));
    console.log(productarray);
    alert("product added to cart");
  }

  placeorder()
  {
    this.addtocart();
    this.router.navigate(['/cart']);
  }
}

