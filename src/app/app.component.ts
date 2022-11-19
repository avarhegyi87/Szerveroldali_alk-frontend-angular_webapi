import { Component, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models';
import { AuthenticationService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  title = 'ITProvisioning.UI';
  currentUser: User | undefined;
  navbarCollapsed = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.getCurrentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
