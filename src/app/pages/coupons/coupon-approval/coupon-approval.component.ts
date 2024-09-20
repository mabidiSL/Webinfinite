

import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Modules, Permission } from 'src/app/store/Role/role.models';
import { selectApprovalData } from 'src/app/store/coupon/coupon-selector';
import { updateCouponlist, updateCouponStatus } from 'src/app/store/coupon/coupon.action';


@Component({
  selector: 'app-coupons-approval',
  templateUrl: './coupons-approval.component.html',
  styleUrl: './coupons-approval.component.css'
})
export class CouponsApprovalComponent implements OnInit {


  public Modules = Modules;
  public Permission = Permission;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any
  merchantApprovalList: any

  couponApprovalList$: Observable<any[]>;

  // Table data
  total: Observable<number>;
  
  endItem: any
  isEmpty: boolean = false;


  returnedArray: any

  constructor(public toastr:ToastrService,  public store: Store) {
   
    this.couponApprovalList$ = this.store.select(selectApprovalData);
  }

  ngOnInit() {
    //this.breadCrumbItems = [{ label: 'Merchants' }, { label: 'Merchants Approval List', active: true }];
    setTimeout(() => {
     
      this.couponApprovalList$.subscribe(data => {
        this.returnedArray = data
       
      })
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1200);
  }

  // filter Approval Requests
  searchRequest() {
    if (this.term) {
      this.merchantApprovalList = this.returnedArray.filter((data: any) => {
        return data.username.toLowerCase().includes(this.term.toLowerCase())
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
        const updatedData = {id: item.id, status: action == 'approve' ?  'active':  'refused'}
        this.store.dispatch(updateCouponlist(updatedData as any));
        
        // // Show success message
        // Swal.fire('Approved!', 'The merchant has been approved.', 'success').then(() => {
        //   // You can also update the item status in the list if needed
          
        // });
      }
    });
  }


 

}