import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, take } from 'rxjs';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
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

  returnedArray: Observable<any[]>;
  

  public Modules = Modules;
  public Permission = Permission;

  columns : any[]= [
    { property: 'name', label: 'Store Name' },
    { property: 'merchant.name', label: 'Merchant' },
    { property: 'city.name', label: 'City' },
    { property: 'offers.total', label: 'Total Offers' },
    { property: 'status', label: 'Status' },
  ];

  constructor(
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

 
  // pagechanged
  onPageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    //this.StoreList$ = this.returnedArray.slice(startItem, this.endItem);
   // this.StoreList$ = this.returnedArray.sort((a: any, b: any) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()).slice(0,10);

  }

  // Delete Store
  onDelete(id: any) {
    this.store.dispatch(deleteStorelist({ storeId: id }));
  }

 
  onChangeEvent( event: any) {
    const newStatus = event.checked ? 'active' : 'inactive'; 
    console.log('Store ID:', event.data.id, 'New Status:', newStatus);
    event.data.status = newStatus;
    this.store.dispatch(updateStorelist({ updatedData: event.data }));

   
  }


}
