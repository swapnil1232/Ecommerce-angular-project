import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private api:ApiService, private router: Router) { }

  ngOnInit(): void {
      this.api.clearCookies();
      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });
  }

}
