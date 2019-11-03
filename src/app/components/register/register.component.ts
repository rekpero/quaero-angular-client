import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  // tslint:disable-next-line: variable-name
  constructor(private _apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  registerUser = () => {
    const username: string = this.email.split('@')[0];
    console.log(username, this.email, this.password);
    this._apiService.registerUser({username, email: this.email, password: this.password}).subscribe((data) => {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('loggedUser', this.email);
      this.router.navigate(['/']);
    });

  }

}
