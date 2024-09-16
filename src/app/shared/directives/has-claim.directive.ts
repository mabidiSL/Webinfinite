import { Directive, Input, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { _User } from 'src/app/store/Authentication/auth.models';
import { Claim } from 'src/app/store/Role/role.models';



@Directive({
  selector: '[hasClaim]'
})
export class HasClaimDirective {

  @Input('hasClaim') claim: Claim[]; // Ensure claim is of type Claim

  //claims$: any[];
  private currentUserSubject: BehaviorSubject<_User>;
  public currentUser: Observable<_User>;
  public permissions: any[] = [];
  private isViewCreated = false;

  constructor( private authFackservice: AuthfakeauthenticationService, private templateRef: TemplateRef<string>,
    private viewContainerRef: ViewContainerRef) {
      console.log('HasClaimDirective constructor called');
      console.log('claim input:', this.claim);
      this.currentUserSubject = new BehaviorSubject<_User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  ngOnChanges(changes: SimpleChanges) {
    console.log('i ama on ngonchange BABAY');
      if (changes['claim'] && !changes['claim'].firstChange) {
        console.log('i am on changes for permissions checks');
        this.checkPermissions();
      }
    }
  
  private checkPermissions() {
    if (this.hasPermission(this.claim)) {
      if (!this.isViewCreated) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.isViewCreated = true;
      }
    } else {
      if (this.isViewCreated) {
        this.viewContainerRef.clear();
        this.isViewCreated = false;
      }
    }
  }

  private hasPermission(claim: Claim[]): boolean {
    console.log(claim);// the claim of the html item
    console.log(this.permissions); // the permissions of the user
    console.log('/////////////////');
    if (claim && this.permissions) {
      return this.claim.some(requiredClaim => {
        return this.permissions.some(permission => {
          return permission.type === requiredClaim.claimType && requiredClaim.claimValue.every(value => permission.value.includes(value));
        });
      });
    }
    return false;
  }

 
  ngOnInit() {
    console.log('claim input:', this.claim);
    this.currentUser.subscribe(user => {
      if (user) {
   
      this.permissions = user.role.claims;
      this.checkPermissions();
    }});
  }
 
}
