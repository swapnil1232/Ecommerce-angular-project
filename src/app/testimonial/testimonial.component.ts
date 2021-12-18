import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  id = 0;
  imagepath = "";
  name = "";
  message = "";
  details = "";
  image = "";
 

  testimonials: any;
  formdata: any;

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    var reply = this.api.callapi("admin/testimonials", {"data": ""});
    reply.subscribe((mydata:any)=>{
        this.testimonials = mydata;
    });

    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if(this.id != 0){
        var reqdata = {"data": {"id": this.id}};
        var reply = this.api.callapi("admin/testimonials", reqdata);
        reply.subscribe((mydata:any)=>{
           let data = Array.from(Object.keys(mydata), k=>mydata[k]);
           this.formdata.id =  data[0].id;
           this.imagepath = data[0].imagepath;
           this.image = data[0].image;
           this.name = data[0].name;
           this.message = data[0].message;
           this.details = data[0].details;
         
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
      // pcid: new FormControl(this.stitle, Validators.compose([
      //   ])),
      message: new FormControl(this.message, Validators.compose([
          Validators.required
          ])),
          details: new FormControl(this.details, Validators.compose([
            Validators.required
            ])),
          // specification: new FormControl(this.title, Validators.compose([
          //   Validators.required
          //   ])),
            });
  }

  handleUpload(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if(reader.result != null)
        this.image = reader.result.toString();
    };
}

  onClickSubmit(data:any)
  {
    data.image = this.image;
    data.availability = data.availability == true ? "Yes" : "No";
    var reqdata = {"data": data};
    console.log(data);
    var reply = this.api.callapi("admin/savetestimonial", reqdata);
    reply.subscribe((mydata:any)=>{
      data = Array.from(Object.keys(mydata), k=>mydata[k]);
      var status = data[0].status;
      if(status == "success")
      {
        this.router.navigate(['../admin-testimonials']);
      }
  });

  }
}

