import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User, UserResponse } from '../interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = enviroment.API_URL;
  private user?:User;

  private _http = inject( HttpClient );
  private _cookieService = inject(CookieService)
  private _router = inject(Router);

  get currentUser():User | undefined {
    if(!this.user) return undefined;

    return {...this.user };
  }



  isAuthenticated():boolean {
    return  !!localStorage.getItem('user-jwt');
  }

  getUser():User {
    return  JSON.parse(localStorage.getItem('user') ?? '');
  }

  getToken():string {
    return localStorage.getItem('user-jwt') ?? ''
  }



  signIn(username:string, password:string):Observable<UserResponse>{
    return this._http.post<UserResponse>(`${this.baseUrl}/user/sign-in`, {username, password})
    .pipe(
      tap((response:UserResponse)=> this.user = response.data.user),
      tap((response: UserResponse) => localStorage.setItem('user-jwt',  response.token)),
      tap((response:UserResponse) => localStorage.setItem('user', JSON.stringify( response?.data?.user )))

    )
  }

  signUp(username:string, password: string):Observable<UserResponse>{
    return this._http.post<UserResponse>(`${this.baseUrl}/user/sign-up`, {username, password})
  }


  logout():void {
    localStorage.removeItem('user-jwt')
    localStorage.removeItem('user')

    this._router.navigateByUrl('/auth/login')
  }

}
