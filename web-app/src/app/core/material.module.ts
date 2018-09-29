import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule, MatSelectModule, MatOptionModule,
    MatInputModule, BrowserAnimationsModule
  ],
  exports: [
    MatFormFieldModule, MatSelectModule, MatOptionModule,
    MatInputModule, BrowserAnimationsModule
  ]
})
export class MaterialModule { }
