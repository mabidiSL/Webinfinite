import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UsersComponent } from './users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [{
  path: "",
  component: UsersComponent,
  //canActivate: [ClaimGuard],
  // data: {
  //  // permission: 'user.index',
  //  // claim: { claimType:Modules.Users, claimValue:[Permission.ViewAll]}
  // }
},
{
  path: "create",
  component: CreateUserComponent,
  // canActivate: [ClaimGuard],
  // data: {
  //   //permission: ['user.index', 'user.create'],
  //   claim: { claimType:Modules.Users, claimValue:[Permission.ViewAll,Permission.Create]}

  // }
},
{
  path: "edit/:id",
  component: EditUserComponent,
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
export class UsersRoutingModule { }
