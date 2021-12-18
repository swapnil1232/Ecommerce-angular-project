import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  formdata: any;
  show=true;
  constructor(private api:ApiService, private router: Router) { }

  ngOnInit(): void {

    this.formdata= new FormGroup({
      email: new FormControl("", Validators.compose([
      Validators.required
      ])),
      name: new FormControl("", Validators.compose([
        Validators.required
      ])),
      mobileno: new FormControl("", Validators.compose([
        Validators.required
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required
        ]))});
  }

  onClickSubmit(data: any) {
    alert("You have successfully register to your account..!")
    var reqdata = { "data": data };
    var reply = this.api.callapi("user/register", reqdata);
    reply.subscribe((mydata: any) => {
      data = Array.from(Object.keys(mydata), k => mydata[k]);
      var status = data[0].status;
      if(status == "success")
      {
        this.router.navigate(['../checkout']);
      }
    
    });

  }
 

}

