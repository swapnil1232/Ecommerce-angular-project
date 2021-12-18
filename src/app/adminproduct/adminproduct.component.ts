import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-adminproduct',
  templateUrl: './adminproduct.component.html',
  styleUrls: ['./adminproduct.component.css']
})
export class AdminproductComponent implements OnInit {

  id = 0;
  name = "";
  pcid = 0;
  description = "";
  specification = "";
  mrp = 0;
  price = 0;
  availability = false;
  image = "";


  productcategories: any;
  formdata: any;

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    var reply = this.api.callapi("admin/productcategories", {"data": ""});
    reply.subscribe((mydata:any)=>{
        this.productcategories = mydata;
    });

    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if(this.id != 0){
        var reqdata = {"data": {"id": this.id}};
        var reply = this.api.callapi("admin/product", reqdata);
        reply.subscribe((mydata:any)=>{
           let data = Array.from(Object.keys(mydata), k=>mydata[k]);
           this.formdata.id =  data[0].id;
           this.name = data[0].name;
           this.pcid = data[0].pcid;
           this.description = data[0].description;
           this.specification = data[0].specification;
           this.mrp = data[0].mrp;
           this.price = data[0].price;
           this.availability = data[0].availability == "Yes" ? true : false;
           this.bindForm();
          });
    }
    this.bindForm();
  }

  bindForm()
  {
    this.formdata = new FormGroup({
      id: new FormControl(this.id, Validators.compose([
        Validators.required
        ])),
      name: new FormControl(this.name, Validators.compose([
      Validators.required
      ])),
      image: new FormControl(this.image, Validators.compose([
        ])),
      pcid: new FormControl(this.pcid, Validators.compose([
        ])),
        description: new FormControl(this.description, Validators.compose([
          Validators.required
          ])),
          specification: new FormControl(this.specification, Validators.compose([
            Validators.required
            ])),
            mrp: new FormControl(this.mrp, Validators.compose([
              Validators.required
              ])),
              price: new FormControl(this.price, Validators.compose([
                Validators.required
                ])),
                availability: new FormControl(this.availability, Validators.compose([
                  ]))});
  }

  handleUpload(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if(reader.result != null)
        this.image = reader.result.toString();
        console.log(this.image);
    };
}

  onClickSubmit(data:any)
  {
    data.image = this.image;
    data.availability = data.availability == true ? "Yes" : "No";
    var reqdata = {"data": data};
    console.log(data);
    var reply = this.api.callapi("admin/saveproduct", reqdata);
    reply.subscribe((mydata:any)=>{
      data = Array.from(Object.keys(mydata), k=>mydata[k]);
      var status = data[0].status;
      if(status == "success")
      {
        this.router.navigate(['../admin-products']);
      }
  });

  }
}
