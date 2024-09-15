import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { ApproveMerchantComponent } from './approve-merchant/approve-merchant.component';
import { Modules, Permission } from 'src/app/store/Role/role.models';
import { RoleGuard } from 'src/app/core/guards/role.guard';

const routes: Routes = [
  {
    path: 'list',
    canActivate: [RoleGuard],
    data: {
      //claim: { claimType: [Modules.All,Modules.Merchants], claimValue: [Permission.All,Permission.ViewAll]}
      claim : [{claimType: Modules.All, claimValue: [Permission.All]}, {claimType: Modules.Merchants, claimValue: [Permission.ViewAll]}]

    },
    component: MerchantListComponent
  },
  {
    path: 'approve',
    canActivate: [RoleGuard],
    data: {
      claim: [{claimType: Modules.All, claimValue: [Permission.All]}]

    },
    component: ApproveMerchantComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantsRoutingModule { }
