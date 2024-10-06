
  import { Component, OnInit } from '@angular/core';
  import { Observable } from 'rxjs';

  import {  select, Store } from '@ngrx/store';
  import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { deleteCountrylist, fetchCountrylistData, updateCountrylist } from 'src/app/store/country/country.action';
import { selectDataCountry } from 'src/app/store/country/country-selector';
  
 
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit {
  
  // bread crumb items
  breadCrumbItems: Array<{}>;
  
  countriesList$: Observable<any[]>;
  isDropdownOpen : boolean = false;
  filteredArray: any[] = [];
  originalArray: any[] = [];

  itemPerPage: number = 10;
  currentPage : number = 1;
  
  columns : any[]= [
    { property: 'flag', label: 'Flag' },
    { property: 'name', label: 'Country' },
    { property: 'phoneCode', label: 'Country_Code' },
    { property: 'status', label: 'Status' },
  ];
  
  constructor(public store: Store) {
      
      this.countriesList$ = this.store.pipe(select(selectDataCountry)); 

  }

  ngOnInit() {
   
    this.store.dispatch(fetchCountrylistData({ page: this.currentPage, itemsPerPage: this.itemPerPage, status:'' }));
    this.countriesList$.subscribe(data => {
      this.originalArray = data; // Country the full Country list
      this.filteredArray = [...this.originalArray];
      document.getElementById('elmLoader')?.classList.add('d-none');
      console.log('Finish get Country list');
      console.log(this.filteredArray);

    });
       
  }
   // pagechanged
   onPageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    this.store.dispatch(fetchCountrylistData({ page: this.currentPage, itemsPerPage: this.itemPerPage, status: '' }));
    
  }

  onDelete(id: any) {
    this.store.dispatch(deleteCountrylist({ CountryId: id }));
  }

 
  onChangeEvent( event: any) {
    const newStatus = event.checked ? 'active' : 'inactive'; 
    console.log('Country ID:', event.data.id, 'New Status:', newStatus);
    event.data.status = newStatus;
    this.store.dispatch(updateCountrylist({ updatedData: event.data }));
  }
  
  }
  
