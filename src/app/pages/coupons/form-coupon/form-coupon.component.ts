import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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



  constructor(private store: Store, private formBuilder: UntypedFormBuilder){
    this.merchantList$ = this.store.pipe(select(selectData)); // Observing the merchant list from store

   
  }
  
  ngOnInit(){
    console.log('i am in coupon management');
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
      centerLogo: [''],
      couponLogo: ['',Validators.required],
      couponType: ['',Validators.required],// free,discountPercent,discountAmount,servicePrice checkboxes
      couponValueBeforeDiscount:['',Validators.required],
      couponValueAfterDiscount:['',Validators.required],
      PaymentDiscountRate: ['',Validators.required],
      status: [''],//pending,approved,active, expired, closed

    });
  }
  onSubmit(){

  }

}
