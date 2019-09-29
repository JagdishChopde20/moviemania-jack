import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesHomeComponent } from './movies-home/movies-home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [MoviesHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([])
  ]
})
export class CoreModule { }
