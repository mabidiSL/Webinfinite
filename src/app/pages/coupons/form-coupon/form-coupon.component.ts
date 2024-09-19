import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { forkJoin, mergeMap, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
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
      transName: ['', Validators.required],
      termsAndConditions: ['', Validators.required],
      transTermsAndConditions: ['', Validators.required],
      codeCoupon: ['COUP123'],
      urlStore: ['', Validators.required],
      country: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      quantity: ['', Validators.required],
      merchantId: [''],
      merchantName: ['', Validators.required],
      storeId: [''],
      storeName: ['', Validators.required],
      managerName: ['', Validators.required],
      managerPhone: ['', Validators.required],
      startDateCoupon: ['', Validators.required],
      endDateCoupon: ['', Validators.required],
      contractRepNameId:[''],
      contractRepName: ['', Validators.required],
      sectionOrderAppearnance: [''],
      categoryOrderAppearnce: [''],
      merchantLogo: [''],
      couponLogo: ['',Validators.required],
      couponType: ['',Validators.required],// free,discountPercent,discountAmount,servicePrice checkboxes
      couponValueBeforeDiscount:['',Validators.required],
      couponValueAfterDiscount:['',Validators.required],
      PaymentDiscountRate: ['',Validators.required],
      status: [''],//pending,approved,active, expired, closed

    });

   
  }
  
  ngOnInit(){
    console.log('i am in coupon management');
    
    // this.route.params
    //   .pipe(
    //     switchMap(params => {
    //         if(!params['id']) return of();
    //         return this.store
    //                   .dispatch(new EditCoupon(params['id']))
    //                   .pipe(mergeMap(() => this.store.select(ProductState.selectedProduct)))
    //       }
    //     ),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe(coupon => {
        
    //     this.formCoupon.patchValue({});
           
    //       });
          

    }
  
  onSubmit(){

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
