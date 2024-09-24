import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { forkJoin, mergeMap, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { selectCouponById } from 'src/app/store/coupon/coupon-selector';
import { addCouponlist, getCouponById, getCouponByIdSuccess } from 'src/app/store/coupon/coupon.action';
import { selectData } from 'src/app/store/merchantsList/merchantlist1-selector';

@Component({
  selector: 'app-form-coupon',
  templateUrl: './form-coupon.component.html',
  styleUrl: './form-coupon.component.scss'
})
export class FormCouponComponent implements OnInit{

  @Input() type: string;
  merchantList$: Observable<any[]>;
  formCoupon: UntypedFormGroup;
  private destroy$ = new Subject<void>();
  couponLogoBase64: string = null;
  stores : string[] = ['Store Riadh', 'Store Al Madina'];


  constructor(
    private store: Store, 
    private formBuilder: UntypedFormBuilder, 
    private router: Router,
    private route: ActivatedRoute){
    // Get merchant list
    this.merchantList$ = this.store.pipe(select(selectData)); // Observing the merchant list from store
    
    // Get Countries, areas and cities
    //this.countries =  this.store.pipe(select(selectData));
    //this.cities =  this.store.pipe(select(selectData));
    //this.areas =  this.store.pipe(select(selectData));

    //Get ContractResponsable list
    //this.contractRespon = this.store.pipe(select(selectData));
    this.formCoupon = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      transName: [''],
      termsAndConditions: [''],
      transTermsAndConditions: [''],
      description: [''],
      transDescription: [''],
      codeCoupon: ['COUP123'],
      urlStore: [''],
      country: [''],
      area: [''],
      city: [''],
      quantity: [''],
      nbr_of_use:[''],
      merchantId: [''],
      merchantName: ['', Validators.required],
      //storeId: [''],
      storeName: ['', Validators.required],
      managerName: [''],
      managerPhone: [''],
      startDateCoupon: [''],
      endDateCoupon: [''],
      //contractRepNameId:[''],
      contractRepName: [''],
      sectionOrderAppearnance: [''],
      categoryOrderAppearnce: [''],
      //merchantLogo: [''],
      couponLogo: [''],
      couponType: ['free'],// free,discountPercent,discountAmount,servicePrice checkboxes
      couponValueBeforeDiscount:[''],
      couponValueAfterDiscount:[''],
      PaymentDiscountRate: [''],
      status: ['active'],//pending,approved,active, expired, closed

    });

   
  }
  
  ngOnInit() {
    console.log('I am in coupon management');
  
    this.route.params
      .pipe(
        switchMap(params => {
          const couponId = params['id'];
          if (!couponId) return of(null);  // Return null if there is no ID
  
          // Dispatch the action to retrieve the coupon by ID
          this.store.dispatch(getCouponById({ couponId }));
  
          // Return the observable that selects the coupon from the store
          return this.store.pipe(select(selectCouponById(couponId)));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(coupon => {
        if (coupon) {
          // Dispatch action to store the selected coupon in the reducer
          this.store.dispatch(getCouponByIdSuccess({ coupon }));
  
          // Patch the form with coupon data
          this.formCoupon.patchValue(coupon);
        }
      });
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
     // delete newData.codeCoupon;
      delete newData.id;
      //Dispatch Action
      this.store.dispatch(addCouponlist({ newData }));
      
   
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