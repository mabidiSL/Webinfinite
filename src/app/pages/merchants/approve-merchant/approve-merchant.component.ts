
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Modules, Permission } from 'src/app/store/Role/role.models';
import { fetchMerchantlistData, updateMerchantlist } from 'src/app/store/merchantsList/merchantlist1.action';
import { selectDataMerchant } from 'src/app/store/merchantsList/merchantlist1-selector';

@Component({
  selector: 'app-approve-merchant',
  templateUrl: './approve-merchant.component.html',
  styleUrl: './approve-merchant.component.css',
  providers: [DatePipe]
})
export class ApproveMerchantComponent implements OnInit {


  public Modules = Modules;
  public Permission = Permission;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any
  merchantApprovalList: any
  // Table data
  total: Observable<number>;
  createContactForm!: UntypedFormGroup;
  submitted = false;
  contacts: any;
  files: File[] = [];
  endItem: any
  isEmpty: boolean = false;

  @ViewChild('newContactModal', { static: false }) newContactModal?: ModalDirective;
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
  deleteId: any;
  returnedArray: any

  constructor( private formBuilder: UntypedFormBuilder, public store: Store) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(fetchMerchantlistData({ page: 1, itemsPerPage: 10, status : 'pending' }));
      this.store.select(selectDataMerchant).subscribe(data => {
        this.merchantApprovalList = data
        console.log(this.merchantApprovalList);
        this.returnedArray = data
        this.merchantApprovalList = this.returnedArray.slice(0, 10)
        this.isEmpty = this.merchantApprovalList.length === 0;
      })
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1200);
  }

  // filter Approval Requests
  searchRequest() {
    if (this.term) {
      this.merchantApprovalList = this.returnedArray.filter((data: any) => {
        return data.user.username.toLowerCase().includes(this.term.toLowerCase())
      })
    } else {
      this.merchantApprovalList = this.returnedArray
    }
  }

  
  // pagechanged
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.merchantApprovalList = this.returnedArray.slice(startItem, this.endItem);
  }

  UpdateItem(item: any, action: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: action == 'approve' ?  'Yes, Approve it!':  'Yes, Decline it!'
      
    }).then(result => {
      if (result.isConfirmed) {
        // Dispatch the action to update merchant status
        item.user.status = action == 'approve' ?  'active':  'refused';
        console.log(item);
        const newData = {id: item.id, status: item.user.status}
        this.store.dispatch(updateMerchantlist({updatedData: newData}));
        
        
      }
    });
  }

}

