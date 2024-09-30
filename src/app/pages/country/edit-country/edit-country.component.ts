import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrl: './edit-country.component.css'
})
export class EditCountryComponent {
  breadCrumbItems: Array<{}>;

  ngOnInit() {
    console.log('i am in edit country');
    this.breadCrumbItems = [{ label: 'countries' }, { label: 'Edit country', active: true }];
  }
}
