import { Component } from '@angular/core';

@Component({
  selector: 'app-create-merchant',
  templateUrl: './create-merchant.component.html',
  styleUrl: './create-merchant.component.css'
})
export class CreateMerchantComponent {
 // bread crumb items
 breadCrumbItems: Array<{}>;

 ngOnInit() {
   console.log('i am in create merchant');
   this.breadCrumbItems = [{ label: 'Merchants' }, { label: 'Add Merchant', active: true }];
 }
}
