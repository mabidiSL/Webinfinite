import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent  {



  @Input() addButtonLink: string;
  @Input() addButtonLabel: string;
  @Input() addButtonPermission: string;
  @Input() columns: any[];

  @Input() viewButtonLink: string;
  @Input() viewButtonPermission: string;

  @Input() editButtonLink: string;
  @Input() editButtonPermission: string;
  @Input() deleteButtonPermission: string;

  @Input() ArrayData: any[];
  @Input() term: string;

  @Input() checkedStatus: any;
  @Input() uncheckedStatus: any;

  @Output() pageChanged = new EventEmitter();
  @Output() searchJob = new EventEmitter();
  @Output() toggleDropdown = new EventEmitter();
  @Output() applyFilter = new EventEmitter();
  @Output() printData = new EventEmitter();
  @Output() downloadData = new EventEmitter();
  @Output() onChangeEvent = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
  idToDelete : any;
  isDropdownOpen: boolean = false;

  filters = [
    { value: 'All', label: 'All' },
    { value: 'Name', label: 'Name' },
    { value: 'City', label: 'City' },
    { value: 'Status', label: 'Status' },
    { value: 'Phone', label: 'Phone' }
  ];
  constructor() { }

  getProperty(data: any, propertyPath: string): any {
    
    return propertyPath.split('.').reduce((acc, key) => acc && acc[key], data);
    
  }
  
  pageChangedEvent(event: any) {
    this.pageChanged.emit(event);
  }

  searchEvent() {
    this.searchJob.emit();
  }

  toggleDropdownEvent() {
    this.isDropdownOpen = !this.isDropdownOpen ;
  }

  applyFilterEvent(filter: string) {
    this.applyFilter.emit(filter);
  }

  printDataEvent() {
    this.printData.emit();
  }

  downloadDataEvent() {
    this.downloadData.emit();
  }

  onChangeEventEmit(data: any, event: any) {
    this.onChangeEvent.emit({ data, event });
  }


  //Delete Data
  deleteData(id: any) {
    this.idToDelete = id;
    this.removeItemModal?.show();
  }

  onConfirm() {
    this.removeItemModal?.hide();
    this.onDelete.emit(this.idToDelete);
  }
}