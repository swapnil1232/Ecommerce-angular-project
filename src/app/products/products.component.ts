import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any;
  pcid = 0;
  baseurl = this.api.baseURL;

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute) {
    this.baseurl = api.baseURL;

  }


  ngOnInit(): void {
    this.pcid = Number(this.route.snapshot.paramMap.get("pcid"));
    this.binddata();
  }
  binddata()
  {
    //alert(this.pcid);

    var reqdata = {"data": ""};
    var reply = this.api.callapi("admin/products", reqdata);
    reply.subscribe((mydata:any)=>{
      this.products = mydata;
      //Array.from(Object.keys(mydata), k=>mydata[k]);
      // console.log(this.products);
  })

}
}

