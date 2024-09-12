import { Directive, Input, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { Claim } from 'src/app/store/Role/role.models';



@Directive({
  selector: '[hasClaim]'
})
export class HasClaimDirective {

  @Input('hasClaim') claim: Claim; // Ensure claim is of type Claim

  claims$: any[];

  public permissions: Claim[] = [];

  private isViewCreated = false;

  constructor(private store : Store, private templateRef: TemplateRef<string>,
    private viewContainerRef: ViewContainerRef) {
     // this.claims$ = this.store.select(getUser)
    }

  ngOnInit() {
    this.store.select(getUser).subscribe(user => 
      {
      this.permissions = user.role.claims;
      });
    
    
      // this.claims$.subscribe(claims => {
    //   this.permissions = claims;
    //   this.checkPermissions();
    // });
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

  private hasPermission(claim: Claim): boolean {
    if (claim && this.permissions) {
      const matchingClaim = this.permissions.find(c => c.claimType === claim.claimType);
      return matchingClaim && claim.claimValue.every(action => matchingClaim.claimValue.includes(action));
    }
    return false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['claim'] && !changes['claim'].firstChange) {
      this.checkPermissions();
    }
  }
}
