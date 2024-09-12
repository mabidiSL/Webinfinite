import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { ApproveMerchantComponent } from './approve-merchant/approve-merchant.component';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { Modules, Permission } from 'src/app/store/Role/role.models';

const routes: Routes = [
  {
    path: 'list',
    canActivate: [RoleGuard],
    data: {
      claim: { claimType: Modules.Merchants, claimValue:[Permission.ViewAll]}

    },
    component: MerchantListComponent
  },
  {
    path: 'approve',
    canActivate: [RoleGuard],
    data: {
      claim: { claimType: Modules.Merchants, claimValue:[Permission.Approve]}

    },
    component: ApproveMerchantComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantsRoutingModule { }
