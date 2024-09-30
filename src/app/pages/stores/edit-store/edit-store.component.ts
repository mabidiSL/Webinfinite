import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrl: './edit-store.component.css'
})
export class EditStoreComponent {
  breadCrumbItems: Array<{}>;

  ngOnInit() {
    console.log('i am in edit store');
    this.breadCrumbItems = [{ label: 'Stores' }, { label: 'Edit store', active: true }];
  }
}
