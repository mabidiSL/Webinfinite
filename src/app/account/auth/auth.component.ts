import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  constructor(private router: Router) { }

  navigateTo(role: string) {
    if (role === 'operator') {
      this.router.navigate(['/auth/login']);
    } else if (role === 'merchant') {
      this.router.navigate(['/auth/login']);
    }
  }
}
