// import { Component, OnInit } from '@angular/core';
// import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// import { AuthenticationService } from '../../../core/services/auth.service';
// import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

// import { Store } from '@ngrx/store';
// import { ActivatedRoute, Router } from '@angular/router';
// import { login } from 'src/app/store/Authentication/authentication.actions';

// @Component({
//   selector: 'app-updatepassword',
//   templateUrl: './updatepassword.component.html',
//   styleUrl: './updatepassword.component.css'
// })
// export class UpdatepasswordComponent {


//   updatePassForm: UntypedFormGroup;
//   submitted: any = false;
//   error: any = '';
//   returnUrl: string;
//   fieldTextType!: boolean;

//   // set the currenr year
//   year: number = new Date().getFullYear();

//   // tslint:disable-next-line: max-line-length
//   constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private store: Store,
//     private authFackservice: AuthfakeauthenticationService) { }

//   ngOnInit() {
//     if (localStorage.getItem('currentUser')) {
//       this.router.navigate(['/']);
//     }
//     // form validation
//     this.updatePassForm = this.formBuilder.group({
      
//         password: ['New Password', [Validators.required]],
//         confirmPassword: [ [Validators.required]]

//     }, {validators: [this.passwordMatchValidator]});
//   }
//   passwordMatchValidator(formGroup: FormGroup) {
//     const newPassword = formGroup.get('password').value;
//     const confirmPassword = formGroup.get('confirmPassword').value;
  
//     if (newPassword !== confirmPassword) {
//       return { passwordMismatch: true };
//     }
  
//     return null;
//   }
//   // convenience getter for easy access to form fields
//   get f() { return this.updatePassForm.controls; }

//   /**
//    * Form submit
//    */
//   onSubmit() {
//     this.submitted = true;

//     const pwd = this.f['password'].value; // Get the new password from the form
    

//     // Login Api
//     this.store.dispatch(updatePassword({ password: pwd }));
//   }

//   /**
//  * Password Hide/Show
//  */
//   toggleFieldTextType() {
//     this.fieldTextType = !this.fieldTextType;
//   }
// }
