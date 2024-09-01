import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantsRoutingModule } from './merchants-routing.module';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgApexchartsModule } from 'ng-apexcharts';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { NgSelectModule } from '@ng-select/ng-select';

import { WidgetModule } from '../../shared/widget/widget.module';
import { UIModule } from '../../shared/ui/ui.module';


import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ApproveMerchantComponent } from './approve-merchant/approve-merchant.component';



@NgModule({
  declarations: [
    MerchantListComponent,
    ApproveMerchantComponent
  ],
  imports: [
    CommonModule, 
    WidgetModule,
    UIModule,
    NgSelectModule,
    NgApexchartsModule,
    FormsModule, 
    ReactiveFormsModule ,
 
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule,
    ModalModule,
    MerchantsRoutingModule
  ]
})
export class MerchantsModule { }
