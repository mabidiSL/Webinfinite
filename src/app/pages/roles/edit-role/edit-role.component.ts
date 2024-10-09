import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent {
  breadCrumbItems: Array<{}>;

  ngOnInit() {
    console.log('i am in edit role');
    this.breadCrumbItems = [{ label: 'Roles' }, { label: 'Edit role', active: true }];
  }
}
