import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';

import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectStoreById } from 'src/app/store/store/store-selector';
import { addStorelist, getStoreById } from 'src/app/store/store/store.action';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { fetchMerchantlistData } from 'src/app/store/merchantsList/merchantlist1.action';
import { fetchCountrylistData } from 'src/app/store/country/country.action';
import { fetchArealistData } from 'src/app/store/area/area.action';
import { fetchCitylistData } from 'src/app/store/City/city.action';
import { selectDataMerchant } from 'src/app/store/merchantsList/merchantlist1-selector';
import { selectDataCountry } from 'src/app/store/country/country-selector';
import { selectDataArea } from 'src/app/store/area/area-selector';
import { selectDataCity } from 'src/app/store/City/city-selector';


@Component({
  selector: 'app-form-store',
  templateUrl: './form-store.component.html',
  styleUrl: './form-store.component.css'
})
export class FormStoreComponent implements OnInit {
  
  @Input() type: string;
  storeForm: UntypedFormGroup;
  private destroy$ = new Subject<void>();
  merchantlist$: Observable<any[]>;
  countrylist$: Observable<any[]>;
  arealist$: Observable<any[]>;
  citylist$: Observable<any[]>;
  filteredCountries : any[];
  filteredAreas : any[];
  filteredCities: any[];

  submitted: any = false;
  error: any = '';
  successmsg: any = false;
  fieldTextType!: boolean;
  imageURL: string | undefined;
  existantStoreLogo: string = null;
  existantStorePicture: string = null
  StorePictureBase64: string = null;
  storeLogoBase64: string = null;
  isEditing: boolean = false;
  uploadedFiles: any[] = [];
  // file upload
  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false
  };
  
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute, 
    private router: Router,
    public store: Store) {
      
      this.store.dispatch(fetchMerchantlistData({ page: 1, itemsPerPage: 10 , status: 'active'}));
      this.store.dispatch(fetchCountrylistData({ page: 1, itemsPerPage: 10 , status: 'active'}));
      this.store.dispatch(fetchArealistData({ page: 1, itemsPerPage: 10 , status: 'active'}));
      this.store.dispatch(fetchCitylistData({ page: 1, itemsPerPage: 10 , status: 'active'}));
      
      this.storeForm = this.formBuilder.group({
      
        id: [''],
        name: ['', Validators.required],
        description: [''],
        phone: ['', Validators.required ],
        merchant_id: ['12'],
        city_id:['', Validators.required],
        country_id:[''],
        area_id:[''], 
        images: [''],  
        offers:['0'],

          
      });
     }
  // set the currenr year
  year: number = new Date().getFullYear();
   


  ngOnInit() {
    
    this.merchantlist$ = this.store.select(selectDataMerchant);
    this.countrylist$ = this.store.select(selectDataCountry);
    this.arealist$ = this.store.select(selectDataArea);
    this.citylist$ = this.store.select(selectDataCity);


    const StoreId = this.route.snapshot.params['id'];
    console.log('Store ID from snapshot:', StoreId);
    if (StoreId) {
      // Dispatch action to retrieve the Store by ID
      this.store.dispatch(getStoreById({ StoreId }));
      
      // Subscribe to the selected Store from the store
      this.store
        .pipe(select(selectStoreById(StoreId)), takeUntil(this.destroy$))
        .subscribe(Store => {
          if (Store) {
            console.log('Retrieved Store:', Store);
            this.uploadedFiles = Store.images;
            this.storeForm.patchValue(Store);
            this.isEditing = true;

          }
        });
    }
   
  }
  
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Converts to YYYY-MM-DD format
  }
  onPhoneNumberChanged(phoneNumber: string) {
    console.log('PHONE NUMBER', phoneNumber);
    this.storeForm.get('phone').setValue(phoneNumber);
  }

  onSupervisorPhoneChanged(phoneNumber: string) {
    this.storeForm.get('supervisorPhone').setValue(phoneNumber);
  }
  onChangeMerchantSelection(event: any){
    const merchant = event.target.value;
    console.log(merchant);
    if(merchant){
      this.storeForm.get('country_id').setValue(merchant.country);
      this.arealist$.subscribe(
        areas=> 
          this.filteredAreas = areas.filter(a =>a.country_id == merchant.country )
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
          this.filteredCities = cities.filter(c =>c.area_id == area )
      );
    }
    else{
      this.filteredCities = [];
    }
    
  }
  // convenience getter for easy access to form fields
  get f() { return this.storeForm.controls; }

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
    console.log('Form status:', this.storeForm.status);
    console.log('Form errors:', this.storeForm.errors);
    if (this.storeForm.valid) {
      console.log('i am on onSubmit');
      console.log(this.storeForm.value);
      console.log('Form status:', this.storeForm.status);
      console.log('Form errors:', this.storeForm.errors);
      
      
      const newData = this.storeForm.value;
      if(this.uploadedFiles){
        newData.images = this.uploadedFiles;
      }
      delete newData.id;
      delete newData.country_id;
      delete newData.area_id;
      delete newData.offers;
      console.log(newData);
      //Dispatch Action
      this.store.dispatch(addStorelist({ newData }));
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
      this.storeForm.markAllAsTouched();
    }
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
  
  // /**
  //  * Upload Store Logo
  //  */
  // async uploadStoreLogo(event: any){
  //   try {
  //     const imageURL = await this.fileChange(event);
  //     console.log(imageURL);
  //     //this.storeForm.controls['storeLogo'].setValue(imageURL);
  //     this.storeLogoBase64 = imageURL;
  //   } catch (error: any) {
  //     console.error('Error reading file:', error);
  //   }
  // }
  // /**
  //  * Upload Store Picture
  //  */
  // async uploadStorePicture(event: any){
  //   try {
  //     const imageURL = await this.fileChange(event);
  //     console.log(imageURL);
  //     //this.storeForm.controls['StorePicture'].setValue(imageURL);
  //     this.StorePictureBase64 = imageURL;
  //   } catch (error: any) {
  //     console.error('Error reading file:', error);
  //   }
    
  // }
 
onUploadSuccess(event: any) {
  setTimeout(() => {
    this.uploadedFiles.push(event[0]);
  }, 100);
}

// File Remove
removeFile(event: any) {
  this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
}


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onCancel(){
    console.log('Form status:', this.storeForm.status);
    console.log('Form errors:', this.storeForm.errors);
    this.storeForm.reset();
    this.router.navigateByUrl('/private/stores');
  }

}