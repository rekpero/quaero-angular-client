import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  // tslint:disable-next-line: variable-name
  constructor(private _apiService: ApiService, private _router: Router) {}

  ngOnInit() {}

  loginUser = () => {
    // console.log(this.email, this.password);
    this._apiService
      .loginUser({ email: this.email, password: this.password })
      .subscribe(data => {
        console.log(data.error);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('loggedUser', this.email);
        this._router.navigate(['/categories']);
      });
  }
}
