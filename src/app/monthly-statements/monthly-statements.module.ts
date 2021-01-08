import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { LoaderComponent } from './loader/loader.component';
import { StatementsComponent } from './statements/statements.component';



@NgModule({
  declarations: [FilterComponent, LoaderComponent, StatementsComponent],
  imports: [
    CommonModule
  ]
})
export class MonthlyStatementsModule { }
