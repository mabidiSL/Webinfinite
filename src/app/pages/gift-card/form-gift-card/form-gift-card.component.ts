import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {  Observable,  Subject, takeUntil } from 'rxjs';
import { selectGiftCardById } from 'src/app/store/giftCard/giftCard-selector';
import { addGiftCardlist, getGiftCardById, updateGiftCardlist } from 'src/app/store/giftCard/giftCard.action';
import { selectDataMerchant } from 'src/app/store/merchantsList/merchantlist1-selector';
import { fetchMerchantlistData } from 'src/app/store/merchantsList/merchantlist1.action';

@Component({
  selector: 'app-form-gift-card',
  templateUrl: './form-gift-card.component.html',
  styleUrl: './form-gift-card.component.css'
})
export class FormGiftCardComponent implements OnInit{

  @Input() type: string;
  merchantList$: Observable<any[]>;
  storeList$: Observable<any[]> | undefined ;
  selectedStores: any[];
  existantGiftCardLogo: string = null;
  fileName: string = ''; 



  dropdownSettings : any;
  formGiftCard: UntypedFormGroup;
  private destroy$ = new Subject<void>();
  GiftCardLogoBase64: string = null;
  isEditing = false;
  isLoading = false;


  constructor(
    private store: Store, 
    private formBuilder: UntypedFormBuilder, 
    private router: Router,
    private route: ActivatedRoute){
   
    this.store.dispatch(fetchMerchantlistData({ page: 1, itemsPerPage: 10 , status: 'active'})); 
    

    this.formGiftCard = this.formBuilder.group({
      id: [''],
      name_ar: ['', Validators.required],
      name_en: ['', Validators.required],
      description_ar: ['', Validators.required],
      description_en: ['', Validators.required],
      terms_conditions_ar: [''],
      terms_conditions_en: [''],
      quantity: ['', Validators.required],
      merchant_id: ['', Validators.required],
      managerName: [''],
      managerPhone: [''],
      startDateGiftCard: ['', Validators.required],
      endDateGiftCard: ['', Validators.required],
      sectionOrderAppearance: [''],
      categoryOrderAppearance: [''],
      giftCardImage: ['',Validators.required],
      giftCardValue: ['',Validators.required],
      discount:['']
      

    }, { validators: this.dateValidator });

   
  }
  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = new Date(control.get('startDateGiftCard')?.value);
    const endDate = new Date(control.get('endDateGiftCard')?.value);
    const currentDate = new Date();
  
    if (startDate && endDate) {
      // Check if both dates are valid
      if (startDate < currentDate || endDate < currentDate) {
        return { invalidDate: true }; // Both dates must be >= current date
      }
      if (startDate >= endDate) {
        return { dateMismatch: true }; // Start date must be before end date
      }
    }
    return null; // Valid
  }

  
  ngOnInit() {
      
    this.merchantList$ = this.store.pipe(select(selectDataMerchant)); // Observing the merchant list from store
    
    const GiftCardId = this.route.snapshot.params['id'];
    console.log('GiftCard ID from snapshot:', GiftCardId);
    if (GiftCardId) {
      // Dispatch action to retrieve the GiftCard by ID
      this.store.dispatch(getGiftCardById({ GiftCardId }));
      // Subscribe to the selected GiftCard from the store
      this.store
        .pipe(select(selectGiftCardById(GiftCardId)), takeUntil(this.destroy$))
        .subscribe(GiftCard => {
          if (GiftCard) {
            console.log('Retrieved GiftCard:', GiftCard);
            // Patch the form with GiftCard data
            this.existantGiftCardLogo = GiftCard.giftCardImage;
            if(GiftCard.giftCardImage){
              this.fileName = GiftCard.giftCardImage.split('/').pop();
            }
            GiftCard.startDateGiftCard = this.formatDate(GiftCard.startDateGiftCard);
            GiftCard.endDateGiftCard = this.formatDate(GiftCard.endDateGiftCard);
            this.formGiftCard.patchValue(GiftCard);
          
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


  onSubmit(){

    console.log('Submitting form...');
    console.log('Form status:', this.formGiftCard.status);
    console.log('Form errors:', this.formGiftCard.errors);

    if (this.formGiftCard.valid) {
      console.log('i am on onSubmit');
      console.log(this.formGiftCard.value);
      console.log('Form status:', this.formGiftCard.status);
      console.log('Form errors:', this.formGiftCard.errors);
      
      
      const newData = this.formGiftCard.value;
           
      console.log(newData);
      if(!this.isEditing)
      {
         
          //Dispatch Action
          //console.log(newData.stores);
          this.store.dispatch(addGiftCardlist({ newData }));
      }
      else{

        this.store.dispatch(updateGiftCardlist({ updatedData: newData }));

      }
      
   
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

/**
 * Upload GiftCard Logo
 */
async uploadGiftCardLogo(event: any){
  try {
    const imageURL = await this.fileChange(event);
    console.log(imageURL);
    //this.signupForm.controls['storeLogo'].setValue(imageURL);
    this.existantGiftCardLogo = imageURL;
    this.formGiftCard.controls['giftCardImage'].setValue(imageURL);
  } catch (error: any) {
    console.error('Error reading file:', error);
  }
}



  onCancel(){
    this.formGiftCard.reset();
    this.router.navigateByUrl('/private/giftCards');
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}