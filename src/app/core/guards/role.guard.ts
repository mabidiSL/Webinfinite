import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { Store } from '@ngrx/store';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { AuthfakeauthenticationService } from '../services/authfake.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    claims: any[] = [];
   
    constructor(
        private router: Router,
        private authFackservice: AuthfakeauthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
 
        console.log('in claim guard');
        const currentUser = this.authFackservice.currentUserValue;
        if (currentUser) {
          this.claims = currentUser.role.claims;
          const requiredClaim = route.data?.['claim'];
          console.log('***********************');
          console.log(this.claims);
          console.log(requiredClaim);
          console.log('***********************');
          if (!requiredClaim) {
            return true; // no permission required, allow access
          }
       
          const hasRequiredClaims = requiredClaim.some(requiredClaim => {
            return this.claims.some(claim => {
              return claim.type === requiredClaim.claimType && requiredClaim.claimValue.every(value => claim.value.includes(value));
            });
          });
          if (hasRequiredClaims) {
            return true; // user has all required permissions, allow access
          }
          else
          {
            this.router.navigate(['/pages/403']);
            return false; // user doesn't have required permissions, deny access
          }

        
        
        }
    
    
        
    
    }
}
