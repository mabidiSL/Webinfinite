import { Component } from '@angular/core';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrl: './create-city.component.css'
})
export class CreateCityComponent {
  breadCrumbItems: Array<{}>;

  ngOnInit() {
    console.log('i am in create City');
    this.breadCrumbItems = [{ label: 'Cities' }, { label: 'Add City', active: true }];
  }
}
