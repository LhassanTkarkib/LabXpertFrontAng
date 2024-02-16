import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "./user";
import { UserService } from "./user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showForm: boolean = false;
  showUpdateForm: boolean = false;
  userForm: FormGroup = this.formBuilder.group({
    nomUtilisateur: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    roleDutilisateur: ['', Validators.required],
    InformationsPersonalises: ['', Validators.required]
  });
  updateUserForm: FormGroup = this.formBuilder.group({
    nomUtilisateur: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    roleDutilisateur: ['', Validators.required],
    InformationsPersonalises: ['', Validators.required]
  });
  selectedUser: User | undefined;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public toggleForm(user?: User): void {
    this.showForm = !this.showForm;

    if (user) {
      this.showUpdateForm = true;
      this.selectedUser = user;
      this.updateUserForm.patchValue({
        nomUtilisateur: user.username,
        email: user.email,
        password: '',
        roleDutilisateur: user.role,
        InformationsPersonalises: user.InformationsPersonalises,
      });
    } else {
      this.showUpdateForm = false;
      this.selectedUser = undefined;
      this.updateUserForm.reset();
    }
  }

  public addUser(): void {
    this.userService.addUser(this.userForm?.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
        this.toggleForm();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public updateUser(): void {
    if (this.selectedUser) {
      const updatedUser: User = {
        ...this.selectedUser,
        ...this.updateUserForm?.value,
      };

      this.userService.updateUser(updatedUser).subscribe(
        (response: User) => {
          console.log(response);
          this.getUsers();
          this.toggleForm(); // Close the form after updating
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      (response: string) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
