import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrl: './edit-city.component.css'
})
export class EditCityComponent {
  breadCrumbItems: Array<{}>;

  ngOnInit() {
    console.log('i am in edit city');
    this.breadCrumbItems = [{ label: 'Cities' }, { label: 'Edit City', active: true }];
  }
}
