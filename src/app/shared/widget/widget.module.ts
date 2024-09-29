import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';

import { StatComponent } from './stat/stat.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';

@NgModule({
  declarations: [StatComponent, TransactionComponent, PhoneNumberComponent],
  imports: [
    
    CommonModule,
    
    ModalModule.forRoot()
  ],
  exports: [StatComponent, TransactionComponent,PhoneNumberComponent]
})
export class WidgetModule { }
