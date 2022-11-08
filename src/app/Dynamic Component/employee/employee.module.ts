import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay'
import { MaskingNumberDirective } from './masking-number.directive';
import { CurrencyPipe } from './pipes/currency.pipe';
// ------------------
import { InfiniteScrollModule } from "ngx-infinite-scroll";


@NgModule({
  declarations: [
    EmployeeComponent,
    FormComponent,
    ListComponent,
    MaskingNumberDirective,
    CurrencyPipe
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    OverlayModule,
    InfiniteScrollModule
  ]
})
export class EmployeeModule { }
