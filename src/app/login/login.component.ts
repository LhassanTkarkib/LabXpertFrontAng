// login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      response => console.log('Logged in!'),
      error => console.error('Error:', error)
    );
  }
}
