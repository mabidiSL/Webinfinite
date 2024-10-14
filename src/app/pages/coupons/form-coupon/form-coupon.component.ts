import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {  Observable, of, Subject, takeUntil } from 'rxjs';

import { selectCouponById } from 'src/app/store/coupon/coupon-selector';
import { addCouponlist, getCouponById, getCouponByIdSuccess, updateCouponlist } from 'src/app/store/coupon/coupon.action';
import { selectDataMerchant } from 'src/app/store/merchantsList/merchantlist1-selector';
import { fetchMerchantlistData } from 'src/app/store/merchantsList/merchantlist1.action';
import { selectData, selectDataState } from 'src/app/store/store/store-selector';
import { fetchStorelistData } from 'src/app/store/store/store.action';

@Component({
  selector: 'app-form-coupon',
  templateUrl: './form-coupon.component.html',
  styleUrl: './form-coupon.component.scss'
})
export class FormCouponComponent implements OnInit{

  @Input() type: string;
  merchantList$: Observable<any[]>;
  storeList$: Observable<any[]> | undefined ;
  selectedStores: any[];



  dropdownSettings : any;
  formCoupon: UntypedFormGroup;
  private destroy$ = new Subject<void>();
  couponLogoBase64: string = null;
  stores : string[] = ['Store Riadh', 'Store Al Madina'];
  isEditing = false;
  isLoading = false;


  constructor(
    private store: Store, 
    private formBuilder: UntypedFormBuilder, 
    private router: Router,
    private route: ActivatedRoute){
   
    this.store.dispatch(fetchMerchantlistData({ page: 1, itemsPerPage: 10 , status: 'active'})); 
    

    this.formCoupon = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      transName: [''],
      termsAndConditions: [''],
      transTermsAndConditions: [''],
      codeCoupon: ['COUP123'],
      quantity: ['', Validators.required],
      nbr_of_use:['', Validators.required],
      merchantId: ['', Validators.required],
      stores: [null, Validators.required],
      managerName: [''],
      managerPhone: [''],
      startDateCoupon: ['', Validators.required],
      endDateCoupon: ['', Validators.required],
      contractRepName: [''],
      sectionOrderAppearance: [''],
      categoryOrderAppearance: [''],
      couponLogo: ['', Validators.required],
      couponType: ['free', Validators.required],// free,discountPercent,discountAmount,servicePrice checkboxes
      couponValueBeforeDiscount:[''],
      couponValueAfterDiscount:[''],
      paymentDiscountRate: ['']

    });

   
  }
  
  ngOnInit() {
   
    this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    
    this.merchantList$ = this.store.pipe(select(selectDataMerchant)); // Observing the merchant list from store
     //Get ContractResponsable list
     //this.contractRespon = this.store.pipe(select(selectData));
    const couponId = this.route.snapshot.params['id'];
    console.log('Coupon ID from snapshot:', couponId);
    if (couponId) {
      // Dispatch action to retrieve the coupon by ID
      this.store.dispatch(getCouponById({ couponId }));
      // Subscribe to the selected coupon from the store
      this.store
        .pipe(select(selectCouponById(couponId)), takeUntil(this.destroy$))
        .subscribe(coupon => {
          if (coupon) {
            console.log('Retrieved coupon:', coupon);
            // Patch the form with coupon data
            coupon.startDateCoupon = this.formatDate(coupon.startDateCoupon);
            coupon.endDateCoupon = this.formatDate(coupon.endDateCoupon);
            this.formCoupon.patchValue(coupon);
          
            this.isEditing = true;

          }
        });
    }
  
}
private formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Converts to YYYY-MM-DD format
}

getFileNameFromUrl(url: string): string {
  if (!url) return '';
  const parts = url.split('/');
  return parts[parts.length - 1]; // Returns the last part, which is the filename
}

onChangeMerchantSelection(event: any){
  const merchant = event.target.value;
  console.log(merchant);
  if(merchant){
    this.isLoading = true;
    this.store.dispatch(fetchStorelistData({ page: 1, itemsPerPage: 10 , merchant_id: merchant.id}));
    this.storeList$ = this.store.pipe(select(selectData));
  }
   
}
  onSubmit(){

    console.log('Submitting form...');
    console.log('Form status:', this.formCoupon.status);
    console.log('Form errors:', this.formCoupon.errors);

    if (this.formCoupon.valid) {
      console.log('i am on onSubmit');
      console.log(this.formCoupon.value);
      console.log('Form status:', this.formCoupon.status);
      console.log('Form errors:', this.formCoupon.errors);
      
      
      const newData = this.formCoupon.value;
      if(this.couponLogoBase64){
        newData.couponLogo = this.couponLogoBase64;
      }
      
       
      console.log(newData);
      if(!this.isEditing)
      {
        // delete newData.codeCoupon;
          delete newData.id;
          //Dispatch Action
          this.store.dispatch(addCouponlist({ newData }));
      }
      else{
        this.store.dispatch(updateCouponlist({ updatedData: newData }));

      }
      
   
    }
    

    // if(this.type == 'edit' && this.id) {
    //   this.form.removeControl('password');
    //   action = new UpdateVendor(this.prepareToSend(this.form))
    // }

    
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
 * Upload Coupon Logo
 */
async uploadCouponLogo(event: any){
  try {
    const imageURL = await this.fileChange(event);
    console.log(imageURL);
    //this.signupForm.controls['storeLogo'].setValue(imageURL);
    this.couponLogoBase64 = imageURL;
  } catch (error: any) {
    console.error('Error reading file:', error);
  }
}



  onCancel(){
    this.formCoupon.reset();
    this.router.navigateByUrl('/private/coupons');
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}