import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './JWT Login/Model/user.model';
import { AuthenticationService } from './JWT Login/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '1Rythum-functionalities';
  currentUser: object;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe((x: any) => this.currentUser = x);
    this.currentUser = User;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}