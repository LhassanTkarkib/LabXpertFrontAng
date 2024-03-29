// app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './security/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LabExpertFront';
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
}
