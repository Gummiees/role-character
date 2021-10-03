import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadersService {
  private $forgotPasswordLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $tableLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $signInLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $signUpLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $userInfoLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $categoriesLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}

  isAnyLoading(): boolean {
    return (
      this.forgotPasswordLoading ||
      this.tableLoading ||
      this.signInLoading ||
      this.signUpLoading ||
      this.userInfoLoading ||
      this.categoriesLoading
    );
  }

  set forgotPasswordLoading(value: boolean) {
    this.$forgotPasswordLoading.next(value);
  }
  get forgotPasswordLoading(): boolean {
    return this.$forgotPasswordLoading.value;
  }
  set tableLoading(value: boolean) {
    this.$tableLoading.next(value);
  }
  get tableLoading(): boolean {
    return this.$tableLoading.value;
  }
  set signInLoading(value: boolean) {
    this.$signInLoading.next(value);
  }
  get signInLoading(): boolean {
    return this.$signInLoading.value;
  }
  set signUpLoading(value: boolean) {
    this.$signUpLoading.next(value);
  }
  get signUpLoading(): boolean {
    return this.$signUpLoading.value;
  }
  set userInfoLoading(value: boolean) {
    this.$userInfoLoading.next(value);
  }
  get userInfoLoading(): boolean {
    return this.$userInfoLoading.value;
  }
  set categoriesLoading(value: boolean) {
    this.$categoriesLoading.next(value);
  }
  get categoriesLoading(): boolean {
    return this.$categoriesLoading.value;
  }
}
