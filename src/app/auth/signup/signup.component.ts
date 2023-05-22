import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUser: UniqueUsername,
    private authService: AuthService
  ) {}
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
        [this.uniqueUser.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    const { username, password, passwordConfirm } = this.authForm.value;
    if (username && password && passwordConfirm) {
      this.authService
        .signup({ username, password, passwordConfirmation: passwordConfirm })
        .subscribe({
          next: (response) => {},
          error: (err) => {
            if (!err.status) {
              this.authForm.setErrors({ noConnection: true });
            } else {
              this.authForm.setErrors({ unknownError: true });
            }
          },
        });
    }
  }
}
