// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {jwtDecode } from 'jwt-decode';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) { }

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/authenticate`, credentials)
      .pipe(tap((response: LoginResponse) => {
        this.jwtService.saveToken(response.access_token);
        this.jwtService.saveRefreshToken(response.refresh_token);
      }));
  }

  getUserIdFromToken(): number | null {
    const token = this.jwtService.getToken();
    if (!token) {
      return null;
    }
    const decodedToken = jwtDecode(token);
    const userId = (decodedToken as any).userId;
    return userId;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.jwtService.getToken() !== null;
  }
}
