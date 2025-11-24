import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/usermodel';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router, RouteReuseStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = signal<User | null>(null);
  private baseUrl = 'http://localhost:8080' 
  private router = inject(Router)

  constructor(private http: HttpClient){}

  register(data: {company: string, email: string, fullName: string, password: string, role: string}){
    return this.http.post(this.baseUrl + '/api/auth/signup', data, {withCredentials: true})
  }

  login(data: {email: string, password: string}){
    return this.http.post(this.baseUrl + '/api/auth/login', data, {withCredentials: true})
  }

  fetchUser(): Observable<User>{
    return this.http.get<User>(this.baseUrl + '/api/auth/me',{withCredentials: true})
  }

  logout(){
    return this.http.post(this.baseUrl + '/api/auth/logout', {}, {withCredentials: true}).pipe(
      tap(() => {
        this.user.set(null);
        this.router.navigate(['/login'])
      })
    )
  }

  getUser(){
    return this.user();
  }

  isLoggedIn(): boolean{
    return !!this.user();
  }

  hasRole(role: string): boolean{
    return this.user()?.role === role
  }

}
