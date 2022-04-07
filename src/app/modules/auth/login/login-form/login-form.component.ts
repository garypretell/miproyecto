import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/data/services/api/auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  public loginForm;
  public loginSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get fm() {
    return this.loginForm.controls;
  }

  authenticate() {
    this.loginSubmitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(r => {
      console.log(r);
    });
  }

}
