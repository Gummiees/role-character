import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadersService {
  private $forgotPasswordLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $signInLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $signUpLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $userInfoLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $categoriesLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $createCharacterLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $characterInfoLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $inventoryLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}

  isAnyLoading(): boolean {
    return (
      this.forgotPasswordLoading ||
      this.signInLoading ||
      this.signUpLoading ||
      this.userInfoLoading ||
      this.categoriesLoading ||
      this.createCharacterLoading ||
      this.characterInfoLoading ||
      this.inventoryLoading
    );
  }

  set forgotPasswordLoading(value: boolean) {
    this.$forgotPasswordLoading.next(value);
  }
  get forgotPasswordLoading(): boolean {
    return this.$forgotPasswordLoading.value;
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
  set createCharacterLoading(value: boolean) {
    this.$createCharacterLoading.next(value);
  }
  get createCharacterLoading(): boolean {
    return this.$createCharacterLoading.value;
  }
  set characterInfoLoading(value: boolean) {
    this.$characterInfoLoading.next(value);
  }
  get characterInfoLoading(): boolean {
    return this.$characterInfoLoading.value;
  }
  set inventoryLoading(value: boolean) {
    this.$inventoryLoading.next(value);
  }
  get inventoryLoading(): boolean {
    return this.$inventoryLoading.value;
  }
}
