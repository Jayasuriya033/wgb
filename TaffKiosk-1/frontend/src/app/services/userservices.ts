import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employees`, userData);
  }
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees`);
  }
}


@Injectable({
  providedIn: 'root'
})export class LogoutService{
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}
  logout() {   
   localStorage.clear();
    this.snackBar.open('Logout Successful', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
    });

    this.router.navigate(['/']); 
} 


}
@Injectable({
  providedIn: 'root'
}) export class OtpSend{
  private apiUrl = 'http://localhost:3000/api/mobileNumberValidation'; 
  constructor(private http: HttpClient){}
  mNumber(credentials: {username:string, mobileNumber:string }) :Observable<any>{
    return this.http.post<any>(this.apiUrl, credentials);
  }

}

@Injectable({
  providedIn:'root'
})export class OtpValidations{
  private apiUrl =  'http://localhost:3000/api/otp';
  constructor(private http: HttpClient){}
  otp(credentials: {opt:string }) :Observable<any>{
    return this.http.post<any>(this.apiUrl, credentials);
  }
}


@Injectable({
  providedIn : 'root'
}) export class UpdatePassword{
  private apiUrl =  'http://localhost:3000/api/updatePassword';
  constructor(private http: HttpClient){}
  passwordUpdate(credentials: {username:string, mobileNumber:string, newPassword:string }) :Observable<any>{
    // console.log(updatePassword);
    return this.http.post<any>(this.apiUrl, credentials);
  }
}


@Injectable({
  providedIn: 'root'
})export class SetUserName{
  private userName : string | null = null;

  setuserName(userName:string):void{
    this.userName = userName;
  }

  getuserName(): string | null {
    return this.userName;
  }
}












