
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetUserName } from '../services/userservices';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string | null = null;
showRole: any;
userName:any = ""

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private setUserName: SetUserName
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // localStorage.removeItem('setUserName');

    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
        } 
    //     else {
    //   console.error('localStorage is not defined.');
    // }
  }

  setUsername(): void{
    localStorage.setItem('setUserName', this.userName)
    this.setUserName.setuserName(String(this.userName))
    console.log('User Name:', this.userName);   

  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    const loginData = this.loginForm.value;

    this.http.post<any>('http://localhost:3000/api/login', loginData).subscribe(
        response => {
          const token = response.token;
          if (token) {
            localStorage.setItem('username',response.username)
            localStorage.setItem('roleId',response.role)
            localStorage.setItem('token', response.token);
            this.snackBar.open('Login Successful', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['message']
            });

            this.router.navigate(['/home']);}
        },
        error => {
          this.error = 'Invalid username or password';
          this.snackBar.open('Login Failed! Invalid Username or Password', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['error-snackbar']
          });
          console.error('Error logging in:', error);
        }
      );
  }
}
