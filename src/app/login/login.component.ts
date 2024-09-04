import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  })

  invalidLoginError: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  login(formData: FormGroup) {
    console.log("Hi")
    this._AuthService.login(formData.value).subscribe(
      (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this._AuthService.saveCurrentUser();
        }
        this._Router.navigate(["/home"]);
      },
      (err) => {
        console.log(err);
        this.invalidLoginError = err.error.message;
        console.log(this.invalidLoginError);
        
      }
    )
  }

}
