import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-merchant',
  templateUrl: './edit-merchant.component.html',
  styleUrl: './edit-merchant.component.css'
})
export class EditMerchantComponent {
// bread crumb items
breadCrumbItems: Array<{}>;
  
ngOnInit() {
  console.log('i am in edit merchant');
  this.breadCrumbItems = [{ label: 'Merchants' }, { label: 'Edit Merchant', active: true }];
}
}
