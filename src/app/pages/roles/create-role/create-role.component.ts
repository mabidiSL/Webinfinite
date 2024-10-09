import { Component } from '@angular/core';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent {
  breadCrumbItems: Array<{}>;

  ngOnInit() {
    console.log('i am in create role');
    this.breadCrumbItems = [{ label: 'Roles' }, { label: 'Add role', active: true }];
  }
}
