import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../../service/auth-service';
import { Router } from '@angular/router';
import { User } from '../../../../models/usermodel';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatRadioModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  isRegisterMode = false;
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder)
  user = new User()
  hidePassword = true;
  hideLogin = true;
  
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  clickLog(event: MouseEvent){
    this.hideLogin = !this.hideLogin
    event.stopPropagation();
  }

  clickP(event: MouseEvent){
    this.hidePassword = !this.hidePassword
    event.stopPropagation();
  }

  ngOnInit() {
    this.registerData.get('role')?.valueChanges.subscribe(role => {
      const companyControl = this.registerData.get('company');
      if (role === 'RH') {
        companyControl?.addValidators(Validators.required);
      } else {
        companyControl?.clearValidators();
      }
      companyControl?.updateValueAndValidity();
    });
  }

  loginData = this.fb.group({
    email: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
    password: this.fb.control('', { validators: [Validators.required], nonNullable: true })
  });

  registerData = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
    email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: this.fb.control('', { validators: [Validators.required, this.passwordStrengthValidator.bind(this)], nonNullable: true }),
    confirmedPassword: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
    role: this.fb.control('', { validators: [Validators.required], nonNullable: true }), // ✅ radio
    company: this.fb.control('', { nonNullable: false })
  });

  toggle(mode: boolean) {
    this.isRegisterMode = mode;
  }

  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const isLongEnough = value.length >= 8;

  const valid = hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && isLongEnough;

  return valid ? null : {
    passwordStrength: {
      hasUpperCase,
      hasLowerCase,
      hasDigit,
      hasSpecialChar,
      isLongEnough
    }
  };
}


  

  onLogin() {
    if(this.loginData.valid){
      this.authService.login(this.loginData.getRawValue()).pipe(
        switchMap(() => this.authService.fetchUser()),
        tap(user => {
          if (!user) {
            console.warn("Utilisateur non trouvé");
            this.router.navigate(['/login']);
            return;
          }

          this.user = user; 
          //console.log("Utilisateur connecté :", this.user);

          if (this.user.role === "RH") {
            this.router.navigate(['/recruiter/home']);
          } else if (this.user.role === "CANDIDATE") {
            this.router.navigate(['/candidate/offers']);
          }
        }),
        catchError(err => {
          console.error("Erreur lors de la connexion ou de la récupération du profil :", err);
          this.router.navigate(['/login']);
          return of(null);
        })
      ).subscribe();
    }
  }

  onRegister() {
    if (this.registerData.valid) {
      const { name, email, password, confirmedPassword, role, company} = this.registerData.getRawValue();

      if (password !== confirmedPassword) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }

      const payload: any = {
        email,
        fullName: name,
        password,
        role
      };

      if (role === 'RH') {
        payload.company = company;
      }
      //console.log(payload)

      this.authService.register(payload).subscribe({
        next: () => {
          alert("Inscription réussie, vous pouvez vous connecter maintenant");
          this.registerData.reset()
          this.toggle(false);
        },
        error: err => console.log("Erreur lors de l'inscription", err)
      });
    }
  }

}
