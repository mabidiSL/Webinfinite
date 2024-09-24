import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit{
  // bread crumb items
  breadCrumbItems: Array<{}>;
  
  ngOnInit() {
    console.log('i am in edit employee');
    this.breadCrumbItems = [{ label: 'Employees' }, { label: 'Edit employee', active: true }];
  }
}
