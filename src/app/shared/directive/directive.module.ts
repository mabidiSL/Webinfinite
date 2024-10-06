import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasClaimDirective } from './has-claim.directive';



@NgModule({
  declarations: [HasClaimDirective],
  imports: [
    CommonModule
  ],
  exports: [
    HasClaimDirective
  ]
})
export class DirectiveModule { }
