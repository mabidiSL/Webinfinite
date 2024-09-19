import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { selectData } from 'src/app/store/coupon/coupon-selector';
import { fetchCouponlistData } from 'src/app/store/coupon/coupon.action';
import { Modules, Permission } from 'src/app/store/Role/role.models';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent  implements OnInit {



  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any
  couponList$: Observable<any[]>;
  // Table data
  total: Observable<number>;
  createContactForm!: UntypedFormGroup;
  submitted = false;
  contacts: any;
  files: File[] = [];
  endItem: any;
  viewType: string;
  isDropdownOpen : boolean = false;
  filteredArray: any[] = [];
  originalArray: any[] = [];
  

  @ViewChild('newContactModal', { static: false }) newContactModal?: ModalDirective;
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
  deleteId: any;
  returnedArray: Observable<any[]>;
  
  public Modules = Modules;
  public Permission = Permission;


  constructor(
    public toastr:ToastrService,
    public store: Store) {
      
     // this.couponList$ = this.store.pipe(select(selectData)); // Observing the coupon list from store

  }

  ngOnInit() {

    setTimeout(() => {
      this.store.dispatch(fetchCouponlistData());
      this.store.select(selectData).subscribe(data => {
        this.originalArray = data; // Store the full coupon list
        console.log(this.originalArray);
        this.filteredArray = [...this.originalArray];
      })
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1200);
      
       console.log('finish get coupon list');
       console.log(this.filteredArray);

      // this.couponList$.subscribe(data => {
      //   this.originalArray = data; // Store the full coupon list
      //   this.filteredArray = [...this.originalArray];
      // });
      // document.getElementById('elmLoader')?.classList.add('d-none')
     
  }
  addCoupon(){

  }

  // fiter job
  searchJob() {
    if (this.term) {
      this.filteredArray = this.originalArray.filter((data: any) =>
        data.username.toLowerCase().includes(this.term.toLowerCase())
      );
    } else {
      this.filteredArray = [...this.originalArray]; // Reset the filter
    }
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  applyFilter(filterType: string) {
    this.isDropdownOpen = false;
    if (filterType === 'All') {
      this.filteredArray = [...this.originalArray]; // Show all items
    } else if (filterType && this.originalArray) {
      console.log('i am in filter section');
      this.filteredArray = this.groupBy(this.originalArray, filterType.toLowerCase());
      console.log(this.filteredArray);
    }
  }

 

// Group data by the selected criterion
groupBy(data: any[], criterion: string) {
  console.log('i am in group by');
  const grouped = data.reduce((result, item) => {
    const key = item[criterion];
    if (key !== undefined) {
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
    }
    return result;
  }, {} as { [key: string]: any[] });

  // Convert grouped object into a flattened array with grouping info
  const flattened = Object.values(grouped).flat();

  return flattened;

}

  printData(){

  }
  downloadData(){

  }
  

  // pagechanged
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    //this.couponList$ = this.returnedArray.slice(startItem, this.endItem);
   // this.couponList$ = this.returnedArray.sort((a: any, b: any) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()).slice(0,10);

  }

  // Disable Coupon
  disableCoupon(id: any) {
    this.deleteId = id;
    console.log('the id of the Coupon to be deleted'+this.deleteId);
    this.removeItemModal?.show();
  }

  confirmDelete() {
    //this.store.dispatch(deletecouponlist({ couponId: this.deleteId }));
    this.removeItemModal?.hide();
  }

}

