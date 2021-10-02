import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MenuService {
  public $toggle: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  public toggle(): void {
    this.$toggle.next(true);
  }
}
