import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { }

  navigateTo(role: string) {
    
    if (role === 'operator') {
      if (localStorage.getItem('currentUser')) {
        this.router.navigate(['/private']);
      } 
      else
      {
      this.router.navigate(['/auth/login']);
      }
    } else if (role === 'merchant') {
      this.router.navigate(['/auth/login']);
    }
  }
}
