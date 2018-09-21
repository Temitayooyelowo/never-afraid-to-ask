import { Directive, OnInit, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective implements OnInit {
  @HostBinding('class.open') isOpen = false;

  constructor() { }

  ngOnInit() { }

  @HostListener('click') toggleClass() {
    this.isOpen = !this.isOpen;
  }

}
