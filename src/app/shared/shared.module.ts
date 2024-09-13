import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';

import { WidgetModule } from './widget/widget.module';
import { HasClaimDirective } from './directives/has-claim.directive';

@NgModule({
  declarations: [
    HasClaimDirective
  ],
  imports: [
    CommonModule,
    UIModule,
    WidgetModule
  ],
  exports: [
    HasClaimDirective
  ]
})

export class SharedModule { }
