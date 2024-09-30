import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, take } from 'rxjs';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { Modules, Permission } from 'src/app/store/Role/role.models';
import { deleteStorelist, fetchStorelistData, updateStorelist } from 'src/app/store/store/store.action';
import { selectData } from 'src/app/store/store/store-selector';

/**
 * Stores component
 */

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.css'
})
export class StoresComponent implements OnInit {



  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any
  storeList$: Observable<any[]>;
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
    private modalService: BsModalService,
    public toastr:ToastrService,
    private formBuilder: UntypedFormBuilder, 
    public store: Store) {
      
      this.storeList$ = this.store.pipe(select(selectData)); // Observing the Store list from store

  }

  ngOnInit() {
      
      
        this.store.dispatch(fetchStorelistData());
        this.storeList$.subscribe(data => {
        this.originalArray = data; // Store the full Store list
        this.filteredArray = [...this.originalArray];
        
        document.getElementById('elmLoader')?.classList.add('d-none');
        console.log('Finish get Store list');
        console.log(this.filteredArray);
    
        });
     

   
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
    //this.StoreList$ = this.returnedArray.slice(startItem, this.endItem);
   // this.StoreList$ = this.returnedArray.sort((a: any, b: any) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()).slice(0,10);

  }

  // Disable Store
  disableStore(id: any) {
    this.deleteId = id;
    console.log('the id of the store to be deleted'+this.deleteId);
    this.removeItemModal?.show();
  }

  confirmDelete() {
    this.store.dispatch(deleteStorelist({ storeId: this.deleteId }));
    this.removeItemModal?.hide();
  }
  onChangeEvent(data: any, event: any) {
    const newStatus = event.checked ? 'active' : 'inactive'; 
    console.log('Store ID:', data.id, 'New Status:', newStatus);
    data.status = newStatus;
    this.store.dispatch(updateStorelist({ updatedData: data }));

   
  }


}
