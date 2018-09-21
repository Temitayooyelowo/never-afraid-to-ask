import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';
import { GeneralRoutingModule } from './general-routing.module';
import { AboutUsComponent } from './help/aboutus/aboutus.component';
import { HowToComponent } from './help/howto/howto.component';

@NgModule({
  declarations: [
    DropdownDirective,
    AboutUsComponent,
    HowToComponent
  ],
  imports: [
    GeneralRoutingModule
  ],
  exports: [
    CommonModule,
    DropdownDirective
  ]
})

export class GeneralModule {

}
