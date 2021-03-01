import { NgModule } from '@angular/core';
import { DateAdapter, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  exports: [
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
  ]
})
export class MaterialModule { 
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('ru');   
  }
}
