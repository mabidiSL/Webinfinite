import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponsComponent } from './coupons.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';
import { EditCouponComponent } from './edit-coupon/edit-coupon.component';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { Modules, Permission } from 'src/app/store/Role/role.models';

const routes: Routes = [
  
// {
//   path: "",
//   component: CouponsComponent,
//   //canActivate: [ClaimGuard],
//   // data: {
//   //  // permission: 'user.index',
//   //  // claim: { claimType:Modules.Users, claimValue:[Permission.ViewAll]}
//   // }
// },
{
  path: "create",
  component: CreateCouponComponent,
   canActivate: [RoleGuard],
  data: {
    //permission: ['user.index', 'user.create'],
    claim: { claimType:Modules.Coupons, claimValue:[Permission.ViewAll,Permission.Create]}

  }
},
{
  path: "edit/:id",
  component: EditCouponComponent,
  // canActivate: [ClaimGuard],
  // data: {
  //   //permission: ['user.index', 'user.edit'],
  //   claim: { claimType:Modules.Users, claimValue:[Permission.ViewAll,Permission.Update]}

  // }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule { }
