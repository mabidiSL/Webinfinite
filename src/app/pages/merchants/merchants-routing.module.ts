import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { ApproveMerchantComponent } from './approve-merchant/approve-merchant.component';

const routes: Routes = [
  {
    path: 'list',
    component: MerchantListComponent
  },
  {
    path: 'approve',
    component: ApproveMerchantComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantsRoutingModule { }
