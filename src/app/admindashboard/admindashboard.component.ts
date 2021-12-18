import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private api:ApiService, private router: Router) { }

  ngOnInit(): void {
    if(this.api.getcookie("usertype") != "admin")
    {
      this.router.navigate(['/admin-login']);
    }
  }

}
