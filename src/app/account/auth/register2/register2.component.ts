import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Register } from 'src/app/store/Authentication/authentication.actions';
import { fetchCountrylistData } from 'src/app/store/country/country.action';
import { fetchArealistData } from 'src/app/store/area/area.action';
import { fetchCitylistData } from 'src/app/store/City/city.action';
import { Observable } from 'rxjs';
import { selectDataCountry } from 'src/app/store/country/country-selector';
import { selectDataArea } from 'src/app/store/area/area-selector';
import { selectDataCity } from 'src/app/store/City/city-selector';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.scss']
})
export class Register2Component implements OnInit {

  signupForm: UntypedFormGroup;
  submitted: any = false;
  error: any = '';
  successmsg: any = false;
  fieldTextType!: boolean;
  imageURL: string | undefined;
  merchantPictureBase64: string = null;
  storeLogoBase64: string = null;
  
  countrylist$: Observable<any[]>;
  arealist$: Observable<any[]>;
  citylist$: Observable<any[]>;
  filteredAreas : any[];
  filteredCities: any[];

  categories: string[] = ['discount','coupon', 'card'];
  sections: string[] = ['Restaurant', 'Fashion and style','Daily services', 'Entertainment', 'Tourism and travel','Cafes and sweets', 'Health and beauty', 'Gifts and occasions', 'Online stores', 'Electronics'];
  constructor  (
    private formBuilder: UntypedFormBuilder, 
    private router: Router, 
    public store: Store) { 
      this.store.dispatch(fetchCountrylistData({page: 1, itemsPerPage: 10, status: 'active' }));
      this.store.dispatch(fetchArealistData({page: 1, itemsPerPage: 10, status: 'active' }));
      this.store.dispatch(fetchCitylistData({page: 1, itemsPerPage: 10, status: 'active' }));

  }
  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit() {
    document.body.classList.add("auth-body-bg");

    this.countrylist$ = this.store.select(selectDataCountry);
    this.arealist$ = this.store.select(selectDataArea);
    this.citylist$ = this.store.select(selectDataCity);

    this.signupForm = this.formBuilder.group({
      
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confpassword: ['', Validators.required],
      id_number: ['', Validators.required],
      phone:['',Validators.required], //Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)*/],
      country:[''],
      city:[''],
      area:[''], 
      serviceType: [''],
      supervisorName: [''],
      supervisorPhone: [''],
      bankAccountNumber: [''],
      company_registration:[''],
      merchantName:['', Validators.required],
      merchantPicture: [''],
      website: [''],
      whatsup:[''],
      facebook: [''],
      twitter: [''],
      instagram: [''],
      merchantSection:[''],
      merchantCategory: ['']

    }/*, {validators: [this.passwordMatchValidator]}*/);
  }
  get passwordMatchError() {
    return (
      this.signupForm.getError('passwordMismatch') &&
      this.signupForm.get('confpassword')?.touched
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {

    const newPassword = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confpassword').value;
    
    
    if (confirmPassword && newPassword !== confirmPassword) {
        console.log("password mismatch");
        formGroup.get('confpassword').setErrors({ passwordMismatch: true });
        formGroup.get('confpassword').markAsDirty(); // Mark as dirty to trigger validation
        formGroup.get('confpassword').updateValueAndValidity(); // Update validity to trigger error message
    return { passwordMismatch: true };
        
      }
    
      // Only clear errors if the field is not empty
    if (confirmPassword) {
      formGroup.get('confpassword').setErrors(null);
      formGroup.get('confpassword').markAsPristine(); // Mark as pristine to clear validation

    }
    
    return null;
  }
  onChangeCountrySelection(event: any){
    const country = event.target.value;
    console.log(country);
    if(country){
      this.arealist$.subscribe(
        areas => 
          this.filteredAreas = areas.filter(c =>c.country_id == country.id )
      );
    }
    else{
      this.filteredAreas = [];
    }
    
  }
  onChangeAreaSelection(event: any){
    const area = event.target.value;
    console.log(area);
    if(area){
      this.citylist$.subscribe(
        cities => 
          this.filteredCities = cities.filter(c =>c.area_id == area.id )
      );
    }
    else{
      this.filteredCities = [];
    }
    
  }

  onPhoneNumberChanged(phoneNumber: string) {
    this.signupForm.get('phone').setValue(phoneNumber);
  }

  onSupervisorPhoneChanged(phoneNumber: string) {
    this.signupForm.get('supervisorPhone').setValue(phoneNumber);
  }
  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  // swiper config
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true
  };

  /**
   * On submit form
   */
  onSubmit() {
    console.log('Form status:', this.signupForm.status);
    console.log('Form errors:', this.signupForm.errors);
    if (this.signupForm.valid) {
      console.log('i am on onSubmit');
      console.log(this.signupForm.value);
      console.log('Form status:', this.signupForm.status);
      console.log('Form errors:', this.signupForm.errors);
      
      this.signupForm.patchValue({
        user_type: 'merchant',
        status: 'notApproved',
        });
      const newData = this.signupForm.value;
      if(this.storeLogoBase64){
        newData.storeLogo = this.storeLogoBase64;
      }
      if(this.merchantPictureBase64){
        newData.merchantPicture = this.merchantPictureBase64;
      }
      delete newData.confpassword;
  
      console.log(newData);
      //Dispatch Action
      this.store.dispatch(Register({ newData }));
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
      this.signupForm.markAllAsTouched();
    }
  }
  onCancel(){
    console.log('Form status:', this.signupForm.status);
    console.log('Form errors:', this.signupForm.errors);
    this.signupForm.reset();
    this.router.navigateByUrl('/auth/login');
  }
    /**
 * Password Hide/Show
 */
    toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
    }
  /**
   * File Upload Image
   */
 
  
  async fileChange(event: any): Promise<string> {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(file);
    });
  }
  
  /**
   * Upload Store Logo
   */
  async uploadStoreLogo(event: any){
    try {
      const imageURL = await this.fileChange(event);
      console.log(imageURL);
      //this.signupForm.controls['storeLogo'].setValue(imageURL);
      this.storeLogoBase64 = imageURL;
    } catch (error: any) {
      console.error('Error reading file:', error);
    }
  }
  /**
   * Upload Merchant Picture
   */
  async uploadMerchantPicture(event: any){
    try {
      const imageURL = await this.fileChange(event);
      console.log(imageURL);
      //this.signupForm.controls['merchantPicture'].setValue(imageURL);
      this.merchantPictureBase64 = imageURL;
    } catch (error: any) {
      console.error('Error reading file:', error);
    }
    
  }
}
