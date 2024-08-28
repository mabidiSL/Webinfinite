import { Component, OnInit } from '@angular/core';

import { revenueBarChart, statData } from './data';

import { ChartType } from './profile.model';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CustomValidators } from 'src/app/shared/validator/password-match';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/store/Authentication/auth.models';
import { updateProfile, updateProfilePassword } from 'src/app/store/Authentication/authentication.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  profileForm: UntypedFormGroup;
  passwordForm: UntypedFormGroup;
  revenueBarChart: ChartType;
  statData:any;
  submitted: any = false;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private formBuilder: UntypedFormBuilder, private store: Store, public translate: TranslateService,) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.profileForm = this.formBuilder.group({
      id: [''],
      // name: [this.currentUserValue.user.name, [Validators.required]],
      username: [this.currentUserValue.user.username, [Validators.required]],
      email: [this.currentUserValue.user.email, [Validators.required, Validators.email]],
      phone:  [this.currentUserValue.user.phone, [Validators.required]],
      logo:[this.currentUserValue.user.logo]
  });
  this.passwordForm = this.formBuilder.group({
    currentPassword: ['', [Validators.required]],      
    newPassword: ['', [Validators.required]],
    confirmpwd:['', [Validators.required]],
  },{validator : CustomValidators.MatchValidator('newPassword', 'confirmpwd')});
 
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
   
    // fetches the data
    this._fetchData();
  }
  onSubmit() {
    this.submitted = true;
  
    if(this.profileForm.valid){
      console.log("Submitting update profile form");
      const updatedUser =  this.profileForm.value;
      //this.currentUserValue.user = updatedUser;
      //console.log(this.currentUserValue);
      this.store.dispatch(updateProfile(updatedUser));
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
    this.passwordForm.markAllAsTouched();
    if(this.passwordForm.valid) {
      console.log('Valid Submitting  Password Form ...');
      this.passwordForm.removeControl('confirmpwd');
      const currentPassword = this.f['currentPassword'].value;
      const newPassword = this.f['newPassword'].value;

      this.store.dispatch(updateProfilePassword({currentPassword:currentPassword ,newPassword}))  
    }
  }
}
