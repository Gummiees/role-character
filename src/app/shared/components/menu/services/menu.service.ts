import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MenuService {
  public isActive: boolean = false;
  public $toggle: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  public toggle(): void {
    this.isActive = !this.isActive;
    this.$toggle.next(this.isActive);
  }
}
