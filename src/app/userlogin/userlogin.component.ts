import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  formdata: any;
  show=true;
  email = "";
  from: any;

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.from = this.route.snapshot.paramMap.get("from");
    if (this.api.getcookie("usertype") == "user") {
      this.router.navigate(['/checkout']);
    }


    this.formdata= new FormGroup({
      email: new FormControl("", Validators.compose([
      Validators.required
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required
        ]))});
  }

  sendpassword()
  {
    alert(this.email);
    var reqdata = { "data": {email: this.email} };
    var reply = this.api.callapi("user/forgotpassword", reqdata);
    reply.subscribe((mydata: any) => {
     alert(mydata);    
    
    });
  }

  onClickSubmit(data: any) {
  
    var reqdata = { "data": data };
    var reply = this.api.callapi("user/login", reqdata);
    reply.subscribe((mydata: any) => {
      data = Array.from(Object.keys(mydata), k => mydata[k]);
      var status = data[0].status;
      if (status == "success") {
        this.api.setcookie("usertype", "user");
        this.api.setcookie("userid", data[0].id);
        this.api.setcookie("username", data[0].name);
        if(this.from == null){
            this.router.navigate(['/myaccount']).then(() => {
              window.location.reload();
            });
          }
          else{
            this.router.navigate(['/checkout']);
          }
      }
      else {
        alert("Wrong credentials");
      }
    
    });

  }
  myFunction(){
   this.show =!this.show;
  }

}

