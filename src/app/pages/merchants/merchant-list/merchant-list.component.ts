
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, take } from 'rxjs';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';
// import { adduserlist, deleteuserlist, fetchuserlistData, updateuserlist } from 'src/app/store/UserList/userlist.action';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { addMerchantlist, deleteMerchantlist, fetchMerchantlistData, updateMerchantlist } from 'src/app/store/merchantsList/merchantlist1.action';
import { selectData } from 'src/app/store/merchantsList/merchantlist1-selector';
import { ToastrService } from 'ngx-toastr';

/**
 * Merchants list component
 */

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrl: './merchant-list.component.css'
})
export class MerchantListComponent implements OnInit {



  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any
  merchantList$: Observable<any[]>;
  // Table data
  total: Observable<number>;
  createContactForm!: UntypedFormGroup;
  submitted = false;
  contacts: any;
  files: File[] = [];
  endItem: any

  @ViewChild('newContactModal', { static: false }) newContactModal?: ModalDirective;
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
  deleteId: any;
  returnedArray: any

  constructor(
    private modalService: BsModalService,
    public toastr:ToastrService,
    private formBuilder: UntypedFormBuilder, 
    public store: Store) {
      
      this.merchantList$ = this.store.pipe(select(selectData)); // Observing the merchant list from store

  }

  ngOnInit() {
      
      console.log('begin get merchant list');

      this.store.dispatch(fetchMerchantlistData());

      console.log('finish get merchant list');

      this.merchantList$.subscribe(data => {
        this.returnedArray = data;
        //this.merchantList$ = this.returnedArray.sort((a: any, b: any) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()).slice(0,10);
      });
      document.getElementById('elmLoader')?.classList.add('d-none')

    this.createContactForm = this.formBuilder.group({
      _id: [''],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      company_registration:['', [Validators.required]],
      city:['', [Validators.required]],
      country:['', [Validators.required]],
      building:['', [Validators.required]],
      user_type:['merchant'],
      status:['active']
      
    });
    this.resetModal();
  }

  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll('#member-img').forEach((element: any) => {
        element.src = this.imageURL;
      });
      this.createContactForm.controls['profile'].setValue(this.imageURL);
    }
    reader.readAsDataURL(file)
  }

  // Save User
  saveUser() {
   
    if (this.createContactForm.get('_id')?.value){
      console.log('removing password field');
      
      this.createContactForm.get('password')?.clearValidators();
      this.createContactForm.get('password')?.updateValueAndValidity();
    } 
    else 
    {
        console.log('Adding new user, ensuring password is required');
        // Ensure password is required when adding a new user
        this.createContactForm.get('password')?.setValidators([Validators.required]);
        this.createContactForm.get('password')?.updateValueAndValidity();
    }
    console.log(this.createContactForm.value);
    console.log('Form status:', this.createContactForm.status);
    console.log('Form errors:', this.createContactForm.errors);
    

    if (this.createContactForm.valid) {
      
      if (this.createContactForm.get('_id')?.value) {
        const updatedData = this.createContactForm.value;
        this.store.dispatch(updateMerchantlist({ updatedData }));
      } 
      else {
        
        this.createContactForm.patchValue({
          user_type: 'merchant',
          status: 'active',
          });
        const newData = this.createContactForm.value;
        delete newData._id;
        this.store.dispatch(addMerchantlist({ newData }));
        
        
      }
         }
        

    this.newContactModal?.hide()
    document.querySelectorAll('#member-img').forEach((element: any) => {
      element.src = 'assets/images/users/user-dummy-img.jpg';
    });

    setTimeout(() => {
      this.createContactForm.reset();
      this.resetPasswordValidation();
    }, 1000);
  }
  resetPasswordValidation() {
    this.createContactForm.get('password')?.setValidators([Validators.required]);
    this.createContactForm.get('password')?.updateValueAndValidity();
}
  // fiter job
  searchJob() {
    if (this.term) {
      this.merchantList$ = this.returnedArray.filter((data: any) => {
        return data.name.toLowerCase().includes(this.term.toLowerCase())
      })
    } else {
      this.merchantList$ = this.returnedArray
    }
  }
  addUser() {
    this.submitted = false;
    this.createContactForm.reset(); // Reset form for new user
    this.newContactModal?.show();

    // Set modal title and button for adding
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Add New Contact';

    var updateBtn = document.getElementById('addContact-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Add";

    var passwordInput = document.getElementById('pwdField') as HTMLAreaElement;
    passwordInput.hidden = false; // Show the password field for adding new user
}
  // Edit User
  editUser(id: any) {
    this.submitted = false;
    this.newContactModal?.show()
    
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Profile';
    
    var updateBtn = document.getElementById('addContact-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    var passwordInput = document.getElementById('pwdField') as HTMLAreaElement;
    passwordInput.hidden = true;
    
    this.merchantList$.pipe(take(1)).subscribe(merchantList => {
    const user = merchantList.find(merchant => merchant._id === id);

      if (user) {
          console.log("The user to be updated", user);
          this.createContactForm.patchValue(user);
          this.createContactForm.patchValue({
            _id: user._id
          });

      } else {
          console.error('User not found');
      }
  });
  }
  resetModal() {
    this.createContactForm.reset();
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = '';
    var updateBtn = document.getElementById('addContact-btn') as HTMLAreaElement;
    updateBtn.innerHTML = '';
    var passwordInput = document.getElementById('pwdField') as HTMLAreaElement;
    passwordInput.hidden = false; // Show by default
}

  // pagechanged
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    //this.merchantList$ = this.returnedArray.slice(startItem, this.endItem);
    this.merchantList$ = this.returnedArray.sort((a: any, b: any) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()).slice(0,10);

  }

  // Disable User
  disableUser(id: any) {
    this.deleteId = id;
    console.log('the id of the user to be deleted'+this.deleteId);
    this.removeItemModal?.show();
  }

  confirmDelete() {
    this.store.dispatch(deleteMerchantlist({ userId: this.deleteId }));
    this.removeItemModal?.hide();
  }

}
