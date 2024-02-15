// userService.ts
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "./user";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.utilisateurId}`, user);
  }

  deleteUser(id: number): Observable<string> {

    const isConfirmed = window.confirm('Are you sure you want to delete this user?');


    if (isConfirmed) {
        return this.http.delete(`${this.apiUrl}/users/${id}`, { responseType: 'text' });
    } else {

        return new Observable<string>((observer) => {
            observer.next('Deletion canceled');
            observer.complete();
        });
    }
}
}
