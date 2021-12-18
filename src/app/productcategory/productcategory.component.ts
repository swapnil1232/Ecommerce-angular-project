import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css']
})
export class ProductcategoryComponent implements OnInit {

  id = 0;
  name = "";
  formdata: any;

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if(this.id != 0){
        var reqdata = {"data": {"id": this.id}};
        var reply = this.api.callapi("admin/productcategory", reqdata);
        reply.subscribe((mydata:any)=>{
           let data = Array.from(Object.keys(mydata), k=>mydata[k]);
           console.log(data);
           this.formdata.id =  data[0].id;
           this.name = data[0].name;

           this.formdata = new FormGroup({
            id: new FormControl(this.id, Validators.compose([
              Validators.required
              ])),
            // name: new FormControl(this.name, Validators.compose([
            // Validators.required
            // ]))
          });
          });
    }
    this.formdata = new FormGroup({
      id: new FormControl(this.id, Validators.compose([
        Validators.required
        ])),
      name: new FormControl(this.name, Validators.compose([
      Validators.required
      ]))});
  }

  onClickSubmit(data:any)
  {
    var reqdata = {"data": data};
    var reply = this.api.callapi("admin/saveproductcategory", reqdata);
    reply.subscribe((mydata:any)=>{
      data = Array.from(Object.keys(mydata), k=>mydata[k]);
      var status = data[0].status;
      if(status == "success")
      {
        this.router.navigate(['../admin-product-categories']);
      }
  });

  }
}
