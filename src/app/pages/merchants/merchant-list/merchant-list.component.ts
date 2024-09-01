
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { adduserlist, deleteuserlist, fetchuserlistData, updateuserlist } from 'src/app/store/UserList/userlist.action';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { addMerchantlist, fetchMerchantlistData } from 'src/app/store/merchantsList/merchantlist1.action';
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
  merchantList: any
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

  constructor(private modalService: BsModalService,public toastr:ToastrService,  private formBuilder: UntypedFormBuilder, public store: Store) {
  }

  ngOnInit() {
    //this.breadCrumbItems = [{ label: 'Merchants' }, { label: 'Merchants List', active: true }];
    setTimeout(() => {
      console.log('begin get merchant list');
      this.store.dispatch(fetchMerchantlistData());
      console.log('finish get merchant list');
      this.store.select(selectData).subscribe(data => {
        this.merchantList = data
        console.log(this.merchantList);
        this.returnedArray = data;
        //this.merchantList = this.returnedArray.sort((a: any, b: any) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()).slice(0,10);
      })
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1200);

    this.createContactForm = this.formBuilder.group({
      id: [''],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      companyRegister:['', [Validators.required]],
      city:['', [Validators.required]],
      country:['', [Validators.required]],
      building:['', [Validators.required]],
      user_type:['merchant'],
      status:['active']
      
    })
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
    // if (this.createContactForm.valid) {
    //   console.log('enter valid form');
    //   if (this.createContactForm.get('id')?.value) {
    //     const updatedData = this.createContactForm.value;
    //     this.store.dispatch(updateuserlist({ updatedData }));
    //   } else {
    //     console.log('Valid form and user Add');
    //     //this.createContactForm.controls['id'].setValue((this.merchantList.length + 1).toString());
    //     const newData = this.createContactForm.value;
    //     console.log(newData);
    //     this.store.dispatch(addMerchantlist({ newData }));
    //     this.toastr.success('The new merchant has been added successfully.');
        
    //   }
    //  }
     console.log('Valid form and user Add');
     //this.createContactForm.controls['id'].setValue((this.merchantList.length + 1).toString());
     const newData = this.createContactForm.value;
     console.log(newData);
     this.store.dispatch(addMerchantlist({ newData }));
     this.toastr.success('The new merchant has been added successfully.');

    //  setTimeout(() => {
    //   this.store.dispatch(fetchMerchantlistData());
    //   this.store.select(selectData).subscribe(data => {
    //     this.merchantList = data
    //     console.log(this.merchantList);
    //     this.returnedArray = data
    //     this.merchantList = this.returnedArray.slice(0, 10)
    //   })
    //   document.getElementById('elmLoader')?.classList.add('d-none')
    // }, 1200);

    this.newContactModal?.hide()
    document.querySelectorAll('#member-img').forEach((element: any) => {
      element.src = 'assets/images/users/user-dummy-img.jpg';
    });

    setTimeout(() => {
      this.createContactForm.reset();
    }, 1000);
  }

  // fiter job
  searchJob() {
    if (this.term) {
      this.merchantList = this.returnedArray.filter((data: any) => {
        return data.name.toLowerCase().includes(this.term.toLowerCase())
      })
    } else {
      this.merchantList = this.returnedArray
    }
  }

  // Edit User
  editUser(id: any) {
    this.submitted = false;
    this.newContactModal?.show()
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Profile';
    var updateBtn = document.getElementById('addContact-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";
    this.createContactForm.patchValue(this.merchantList[id]);
  }

  // pagechanged
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    //this.merchantList = this.returnedArray.slice(startItem, this.endItem);
    this.merchantList = this.returnedArray.sort((a: any, b: any) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()).slice(0,10);

  }

  // Delete User
  removeUser(id: any) {
    this.deleteId = id
    this.removeItemModal?.show();
  }

  confirmDelete(id: any) {
    this.store.dispatch(deleteuserlist({ id: this.deleteId }));
    this.removeItemModal?.hide();
  }

}
