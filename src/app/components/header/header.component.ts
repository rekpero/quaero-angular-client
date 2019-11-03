import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  loggedUser: string;
  previousPath = '';

  // tslint:disable-next-line: variable-name
  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (this.previousPath !== this.location.path()) {
        this.previousPath = this.location.path();

        this.isLoggedIn = sessionStorage.getItem('isLoggedIn') !== null;
        this.loggedUser = sessionStorage.getItem('loggedUser');
      }
    });
  }

  logout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
  }
}
