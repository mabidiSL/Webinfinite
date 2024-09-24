import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  ngOnInit() {
    console.log('i am in create employees');
    this.breadCrumbItems = [{ label: 'Employees' }, { label: 'Add employee', active: true }];
  }
}
