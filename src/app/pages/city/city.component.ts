import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, take } from 'rxjs';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import {  UntypedFormGroup, Validators } from '@angular/forms';

import {  Store } from '@ngrx/store';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { Modules, Permission } from 'src/app/store/Role/role.models';
import { deleteCitylist, fetchCitylistData, updateCitylist } from 'src/app/store/City/city.action';
import { selectData } from 'src/app/store/City/city-selector';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent  implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any
  cityList$: Observable<any[]>;
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
    public store: Store) {
      
      this.cityList$ = this.store.select(selectData);

  }

  ngOnInit() {
      
      
        this.store.dispatch(fetchCitylistData());
       this.cityList$.subscribe(data => {
        this.originalArray = data; // Store the full city list
        this.filteredArray = [...this.originalArray];
        document.getElementById('elmLoader')?.classList.add('d-none');
        console.log('Finish get city list');
        console.log(this.filteredArray);
    
        });
          
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
    this.filteredArray = this.filteredArray.slice(startItem, this.endItem);
    //this.StoreList$ = this.returnedArray.slice(startItem, this.endItem);
   // this.StoreList$ = this.returnedArray.sort((a: any, b: any) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()).slice(0,10);

  }

  // Disable Store
  disableCity(id: any) {
    this.deleteId = id;
    console.log('the id of the city to be deleted'+this.deleteId);
    this.removeItemModal?.show();
  }

  confirmDelete() {
    this.store.dispatch(deleteCitylist({ CityId: this.deleteId }));
    this.removeItemModal?.hide();
  }
  onChangeEvent(data: any, event: any) {
    const newStatus = event.checked ? 'active' : 'inactive'; 
    console.log('city ID:', data.id, 'New Status:', newStatus);
    data.status = newStatus;
    this.store.dispatch(updateCitylist({ updatedData: data }));

   
  }


}

