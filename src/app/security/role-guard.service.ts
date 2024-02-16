// role-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {Observable, of} from 'rxjs';
import { UserService } from '../users/user.service';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {User} from "../users/user";
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data['expectedRole'];
    const userId = this.authService.getUserIdFromToken();

    if (userId === null) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.userService.getUser(userId).pipe(
      map((user: User) => {
        if (expectedRole !== user.roleDutilisateur) {
          this.router.navigate(['/dashboard']);
          return false;
        }
        return true;
      })
    );
  }
}
