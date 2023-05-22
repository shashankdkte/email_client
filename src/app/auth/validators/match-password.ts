import { Injectable } from '@angular/core';
import { Validator, FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class MatchPassword implements Validator {
  validate(formGroup: AbstractControl) {
    const { password, passwordConfirm } = formGroup.value;
    if (passwordConfirm === password) {
      return null;
    } else {
      return { passwordDontMatch: true };
    }
  }
}
