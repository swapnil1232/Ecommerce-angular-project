import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  formdata: any;

  constructor(private api:ApiService, private router: Router) { }

  ngOnInit(): void {
    if(this.api.getcookie("usertype") == "admin")
    {
      this.router.navigate(['/admin-dashboard']);
    }

    this.formdata = new FormGroup({
      username: new FormControl("", Validators.compose([
      Validators.required
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required
        ]))});

      window.scrollTo(0,0);
  }

  onClickSubmit(data:any)
  {
    var reqdata = {"data": data};
    var reply = this.api.callapi("admin/login", reqdata);
    reply.subscribe((mydata:any)=>{
      data = Array.from(Object.keys(mydata), k=>mydata[k]);
      var status = data[0].status;
    if(status == "success")
      {
        this.api.setcookie("usertype", "admin");
        this.api.setcookie("userid", "0");
        this.router.navigate(['/admin-dashboard']).then(() => {
          window.location.reload();
        });
      }
      else{
        alert("Wrong credentials");
      }
  });

  }

}
