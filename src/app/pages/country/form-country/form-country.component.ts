


  import { Component, Input, OnInit } from '@angular/core';
  import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  
  import { AuthenticationService } from '../../../core/services/auth.service';
  
  import { select, Store } from '@ngrx/store';
  import { Subject, takeUntil } from 'rxjs';
  import { selectStoreById } from 'src/app/store/store/store-selector';
  import { addStorelist, getStoreById } from 'src/app/store/store/store.action';
  import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { addCountrylist, getCountryById } from 'src/app/store/country/country.action';
import { selectCountryById } from 'src/app/store/country/country-selector';
  
  
  @Component({
    selector: 'app-form-country',
    templateUrl: './form-country.component.html',
    styleUrl: './form-country.component.css'
  })
  export class FormCountryComponent implements OnInit {
    
    @Input() type: string;
    countryForm: UntypedFormGroup;
    private destroy$ = new Subject<void>();
  
    submitted: any = false;
    error: any = '';
    successmsg: any = false;
    fieldTextType!: boolean;
    imageURL: string | undefined;
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
  
        this.countryForm = this.formBuilder.group({
        
          id: [''],
          name: ['', Validators.required],
          nameTrans: [''],
          phoneCode: ['', Validators.required ],
          countryFlag:[''],
         
  
            
        });
       }
    // set the currenr year
    year: number = new Date().getFullYear();
     
  
  
    ngOnInit() {
  
      const CountryId = this.route.snapshot.params['id'];
      console.log('Country ID from snapshot:', CountryId);
      if (CountryId) {
        // Dispatch action to retrieve the Country by ID
        this.store.dispatch(getCountryById({ CountryId }));
        
        // Subscribe to the selected Country from the Country
        this.store
          .pipe(select(selectCountryById(CountryId)), takeUntil(this.destroy$))
          .subscribe(Country => {
            if (Country) {
              console.log('Retrieved Country:', Country);
              this.countryForm.patchValue(Country);
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
      this.countryForm.get('phone').setValue(phoneNumber);
    }
  
    onSupervisorPhoneChanged(phoneNumber: string) {
      this.countryForm.get('supervisorPhone').setValue(phoneNumber);
    }
    // convenience getter for easy access to form fields
    get f() { return this.countryForm.controls; }
  
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
      console.log('Form status:', this.countryForm.status);
      console.log('Form errors:', this.countryForm.errors);
      if (this.countryForm.valid) {
        console.log('i am on onSubmit');
        console.log(this.countryForm.value);
        console.log('Form status:', this.countryForm.status);
        console.log('Form errors:', this.countryForm.errors);
        
        
        const newData = this.countryForm.value;
        if(this.uploadedFiles){
          newData.images = this.uploadedFiles;
        }
        
        console.log(newData);
        //Dispatch Action
        this.store.dispatch(addCountrylist({ newData }));
      } else {
        // Form is invalid, display error messages
        console.log('Form is invalid');
        this.countryForm.markAllAsTouched();
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
     * Upload Country Logo
     */
    async uploadCountryLogo(event: any){
      try {
        const imageURL = await this.fileChange(event);
        console.log(imageURL);
        //this.CountryForm.controls['CountryLogo'].setValue(imageURL);
       // this.CountryLogoBase64 = imageURL;
      } catch (error: any) {
        console.error('Error reading file:', error);
      }
    }
    /**
     * Upload Country Picture
     */
    async uploadCountryPicture(event: any){
      try {
        const imageURL = await this.fileChange(event);
        console.log(imageURL);
        //this.CountryForm.controls['CountryPicture'].setValue(imageURL);
       // this.CountryPictureBase64 = imageURL;
      } catch (error: any) {
        console.error('Error reading file:', error);
      }
      
    }
   
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
      console.log('Form status:', this.countryForm.status);
      console.log('Form errors:', this.countryForm.errors);
      this.countryForm.reset();
      this.router.navigateByUrl('/private/countries');
    }
  
  }

