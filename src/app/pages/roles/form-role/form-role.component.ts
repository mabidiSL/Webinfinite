import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectRoleById } from 'src/app/store/Role/role-selector';
import { addRolelist, getRoleById, updateRolelist } from 'src/app/store/Role/role.actions';
import { Modules, Permission, RoleListModel } from 'src/app/store/Role/role.models';

@Component({
  selector: 'app-form-role',
  templateUrl: './form-role.component.html',
  styleUrl: './form-role.component.css'
})
export class FormRoleComponent implements OnInit {
  
  @Input() type: string;
  roleForm: UntypedFormGroup;
  private destroy$ = new Subject<void>();
  Rolelist$: Observable<any[]>;
  role: RoleListModel;

  submitted: any = false;
  error: any = '';
  isEditing: boolean = false;
  public Permission: Permission;
  public Module: Modules;
  
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute, 
    private router: Router,
    public store: Store) {
      
      this.roleForm = this.formBuilder.group({
        id: [''],
        name: ['', Validators.required],
        claims: [''],
        
      });
     }
  // set the currenr year
  year: number = new Date().getFullYear();
   
 // Extract the keys from Modules and Permissions enums
 moduleKeys = Object.keys(Modules).filter(key => isNaN(Number(key))); // Get the module names
 permissionKeys = Object.keys(Permission).filter(key => isNaN(Number(key))); // Get the permission names

  ngOnInit() {
    

    const roleId = this.route.snapshot.params['id'];
    console.log('role ID from snapshot:', roleId);
    if (roleId) {
      // Dispatch action to retrieve the role by ID
      this.store.dispatch(getRoleById({ RoleId: roleId }));
      
      // Subscribe to the selected role from the store
      this.store
        .pipe(select(selectRoleById(roleId)), takeUntil(this.destroy$))
        .subscribe(role => {
          if (role) {
            console.log('Retrieved role:', role);
            this.role = role;
            this.roleForm.patchValue(role);
            this.isEditing = true;

          }
        });
    }
   
  }

  /**
   * On submit form
   */
  onSubmit() {
    console.log('Form status:', this.roleForm.status);
    console.log('Form errors:', this.roleForm.errors);
    if (this.roleForm.valid) {
      console.log('i am on onSubmit');
      console.log(this.roleForm.value);
      console.log('Form status:', this.roleForm.status);
      console.log('Form errors:', this.roleForm.errors);
          
      const newData = this.roleForm.value;
      
          if(!this.isEditing)
            {           
              
              
              //Dispatch Action
              this.store.dispatch(addRolelist({ newData}));
        }
        else
        {
          console.log('updating role');
          this.store.dispatch(updateRolelist({ updatedData: newData }));
        }
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
      this.roleForm.markAllAsTouched();
    }
  }
  
  hasPermission(module: string, permission: string): boolean {
    const moduleEnum = Modules[module as keyof typeof Modules];
    const permissionEnum = Permission[permission as keyof typeof Permission];
  
    const claim = this.role.claims.find((claim) => claim.claimType === moduleEnum);
    return claim ? claim.claimValue.includes(permissionEnum) : false;
  }
  
  togglePermission(module: string, permission: string, event: any): void {
    const moduleEnum = this.Module[module as keyof typeof Modules];
    const permissionEnum = this.Permission[permission as keyof typeof Permission];
  
    const claim = this.role.claims.find((claim) => claim.claimType === moduleEnum);
    if (claim) {
      if (event.target.checked) {
        // Add the permission
        claim.claimValue.push(permissionEnum);
      } else {
        // Remove the permission
        claim.claimValue = claim.claimValue.filter((perm) => perm !== permissionEnum);
      }
    } else {
      // If there's no claim for this module, create one and add the permission
      this.role.claims.push({
        claimType: moduleEnum,
        claimValue: [permissionEnum],
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onCancel(){
    console.log('Form status:', this.roleForm.status);
    console.log('Form errors:', this.roleForm.errors);
    this.roleForm.reset();
    this.router.navigateByUrl('/private/roles');
  }

}