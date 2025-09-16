import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Auth } from '../interfaces/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  userToken :BehaviorSubject<any> = new BehaviorSubject(null);

  registerForm(data: Auth): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'users/signUp', data);
  }

  loginForm(data: Auth): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'users/signIn', data);
  }

  setUserToken(): void {
    let token = localStorage.getItem('token');
    if(token!==null){
      this.userToken.next(token);
    }
  }

  logout():void {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  
}
