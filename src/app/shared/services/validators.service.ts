import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const passwordInput = control.get(passwordKey);
      const passwordConfirmationInput = control.get(passwordConfirmationKey);
      if (!passwordInput || !passwordConfirmationInput) {
        throw new Error('The controls for "checkIfMatchingPasswords" do not exist.');
      }
      if (passwordInput.value !== passwordConfirmationInput.value) {
        passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        passwordConfirmationInput.setErrors(null);
      }
      return {};
    };
  }
}
