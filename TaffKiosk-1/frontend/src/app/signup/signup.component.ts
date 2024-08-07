

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/userservices'; 
// import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';  
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
[x: string]: any;
  signupForm: FormGroup;
  maxDate = new Date(); 


  countryCodes = [
    { country: 'India', code: '+91' },
    { country: 'USA', code: '+1' },
    
  ];
  separateDialCode = false;
  // SearchCountryField = SearchCountryField;
  // CountryISO = CountryISO;
  // PhoneNumberFormat = PhoneNumberFormat;
  // preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService 
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      phoneNo: [undefined, Validators.required], 
      location: ['', Validators.required],
      roleId: [parseInt('', 10), Validators.required],
      // roleId: [,Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.userService.registerUser(this.signupForm.value).subscribe(
        response => {
          console.log('User registered successfully', response);
          
          this.router.navigate(['/home']);
        },
        error => {
          this.router.navigate(['/login']);
          this.snackBar.open('Unauthorized Request ❌. Please Login again 🔄️', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['message']
          });
          console.error('Error registering User');
        }
      );
    }
  }
}

