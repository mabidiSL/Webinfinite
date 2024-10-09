import { Component, OnInit } from '@angular/core';

import { revenueBarChart, statData } from './data';

import { ChartType } from './profile.model';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CustomValidators } from 'src/app/shared/validator/password-match';
import { BehaviorSubject, Observable } from 'rxjs';
import { _User } from 'src/app/store/Authentication/auth.models';
import { updateProfile, updateProfilePassword } from 'src/app/store/Authentication/authentication.actions';
import { TranslateService } from '@ngx-translate/core';
import { getUser } from 'src/app/store/Authentication/authentication-selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Contacts-profile component
 */
export class ProfileComponent  {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  profileForm: UntypedFormGroup;
  passwordForm: UntypedFormGroup;
  revenueBarChart: ChartType;
  statData:any;
  submitted: any = false;
  private currentUserSubject: BehaviorSubject<_User>;
  public currentUser: Observable<_User>;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store, 
    public translate: TranslateService) {
      
      this.currentUserSubject = new BehaviorSubject<_User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      
   

    // fill up the form for updating the profile
    this.currentUser.subscribe(user =>{
    this.profileForm = this.formBuilder.group({
      _id: [user?.id],
      // name: [this.currentUserValue.user.name, [Validators.required]],
      username: [user?.username, [Validators.required]],
      email: [user?.email, [Validators.required, Validators.email]],
      phone:  [user?.phone, [Validators.required]],
      logo:[user?.logo]
    });
    

  this.passwordForm = this.formBuilder.group({
    _id: [user?.id],
    currentPassword: ['', [Validators.required]],      
    newPassword: ['', [Validators.required]],
    confirmpwd:['', [Validators.required]],
  },{validators: [this.passwordMatchValidator]});}); 
 
  }
  public get currentUserValue(): _User {
    return this.currentUserSubject.value;
}
  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup?.get('newPassword').value;
    const confirmPassword = formGroup?.get('confirmpwd').value;
    
    
    if (confirmPassword && newPassword !== confirmPassword) {
        console.log("password mismatch");
        formGroup.get('confirmpwd').setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
    
      formGroup.get('confirmpwd').setErrors(null);
   
    return null;
  }
  
  onSubmit() {
    this.submitted = true;
    if(this.profileForm.valid){
      console.log("Submitting update profile form");
      const updatedUser =  this.profileForm.value;
      this.store.dispatch(updateProfile({ user: updatedUser }));

    }
   

    // UpdateProfile Api
   // this.store.dispatch(updateProfile({ email: email, password: password }));
  }


  /**
   * Fetches the data
   */
  private _fetchData() {
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
  }
    // convenience getter for easy access to form fields
    get f() { return this.passwordForm.controls; }

    /**
   * Submit the password
   */
  passwordFormSubmit() {
    this.submitted = true;
    console.log('form password submit');
   // this.passwordForm.markAllAsTouched();
    if(this.passwordForm.valid) {
      console.log('Valid Submitting  Password Form ...');
     // this.passwordForm.removeControl('confirmpwd');
      const id = this.f['_id'].value;
      const currentPassword = this.f['currentPassword'].value;
      const newPassword = this.f['newPassword'].value;

      this.store.dispatch(updateProfilePassword({id: id, currentPassword:currentPassword ,newPassword:newPassword}))  

    }
    else {
      console.log('Form is invalid');
    }
  }
}
