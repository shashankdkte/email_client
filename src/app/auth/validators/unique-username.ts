import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, AbstractControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: AbstractControl) => {
    const { value } = control;
    return this.authService.usernameAvailable(value).pipe(
      map((value) => {
        if (value.available) {
          return null;
        }
        return null;
      }),
      catchError((err) => {
        if (err.error.username) {
          return of({ noUnique: true });
        } else {
          return of({ noConnections: true });
        }
      })
    );
  };
}
