import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  id = 0;
  
  stitle = "";
  title = "";
  description = "";
  image = "";


  sliders: any;
  formdata: any;

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    var reply = this.api.callapi("admin/sliders", {"data": ""});
    reply.subscribe((mydata:any)=>{
        this.sliders = mydata;
    });

    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if(this.id != 0){
        var reqdata = {"data": {"id": this.id}};
        var reply = this.api.callapi("admin/slider", reqdata);
        reply.subscribe((mydata:any)=>{
           let data = Array.from(Object.keys(mydata), k=>mydata[k]);
           this.formdata.id =  data[0].id; 
           this.stitle = data[0].stitle;
           this.description = data[0].description;
           this.title = data[0].title;
           
         
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
      title: new FormControl(this.title, Validators.compose([
      Validators.required
      ])),
      stitle: new FormControl(this.stitle, Validators.compose([
        Validators.required
        ])),
      image: new FormControl(this.image, Validators.compose([
        ])),
        description: new FormControl(this.description, Validators.compose([
          Validators.required
          ])),
          
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
    var reply = this.api.callapi("admin/saveslider", reqdata);
    reply.subscribe((mydata:any)=>{
      data = Array.from(Object.keys(mydata), k=>mydata[k]);
      var status = data[0].status;
      if(status == "success")
      {
        this.router.navigate(['../admin-sliders']);
      }
  });

  }
}
