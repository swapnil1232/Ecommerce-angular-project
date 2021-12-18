import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  id = 0;
  formdata: any;
  updatedata: any;
  password = "";
  newpassword = "";
  name = "";
  email = "";
  mobileno = "";
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {

    this.id = Number("0" + this.api.getcookie("userid"));

    this.updatedata = new FormGroup({
      id: new FormControl(this.id, Validators.compose([
        Validators.required
      ])),
      name: new FormControl("", Validators.compose([
        Validators.required
      ])),
      email: new FormControl("", Validators.compose([
        Validators.required
      ])),
      mobileno: new FormControl("", Validators.compose([
        Validators.required
      ])),


    });

    this.id = Number("0" + this.api.getcookie("userid"));
    this.formdata = new FormGroup({
      id: new FormControl(this.id, Validators.compose([
        Validators.required
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required
      ])),
      newpassword: new FormControl("", Validators.compose([
        Validators.required
      ])),
      confirmnewpassword: new FormControl("", Validators.compose([
        Validators.required
      ])),


    });
  }
  onClickSubmit(data: any) {

    var reqdata = { "data": data };
    var reply = this.api.callapi("user/changepassword", reqdata);
    reply.subscribe((mydata: any) => {
      data = Array.from(Object.keys(mydata), k => mydata[k]);
      alert(mydata);
      // var status = data[0].status;
      // this.router.navigate(['../checkout'])

      // if (status == "success") {
      //   this.api.setcookie("usertype", "admin");
      //   this.api.setcookie("userid", "0");
      //   this.router.navigate(['/admin-dashboard']).then(() => {
      //     window.location.reload();
      //   });
      // }
      // else {
      //   alert("Wrong credentials");
      // }

    });


  }
  onSubmit(data: any) {
    
    var reqdata = { "data": data };
    var reply = this.api.callapi("user/register", reqdata);
    reply.subscribe((mydata: any) => {
      data = Array.from(Object.keys(mydata), k => mydata[k]);
      
    
    });

  }
}
