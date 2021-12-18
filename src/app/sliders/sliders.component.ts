import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit {
  data:any;
  baseurl = "";

  constructor(private api:ApiService, private router: Router) {
    this.baseurl = api.baseURL;
  }

  ngOnInit(): void {
   this.binddata();
  }

  binddata()
  {
    var reqdata = {"data": ""};
    var reply = this.api.callapi("admin/sliders", reqdata);
    reply.subscribe((mydata:any)=>{
      this.data = mydata;
      //Array.from(Object.keys(mydata), k=>mydata[k]);
      //console.log(this.data);
  });
  }

  deleteslider(id:any)
  {
    if(confirm("sure to delete?"))
    {
      var reqdata = {"data": {"id": id}};
      var reply = this.api.callapi("admin/deleteslider", reqdata);
      reply.subscribe((mydata:any)=>{
         let data = Array.from(Object.keys(mydata), k=>mydata[k]);
         this.binddata();
        });
    }
  }
}

