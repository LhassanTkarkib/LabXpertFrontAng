import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from './user';
import { environment } from '../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  let apiUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
    apiUrl = `${environment.apiBaseUrl}/users`;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the list of users', () => {
    const dummyUsers: User[] = [
      { utilisateurId: 1, nomUtilisateur: 'John Doe', email: 'john@example.com', password: 'password1', roleDutilisateur: 'Admin', InformationsPersonalises: 'Info 1' },
      { utilisateurId: 2, nomUtilisateur: 'Jane Doe', email: 'jane@example.com', password: 'password2', roleDutilisateur: 'User', InformationsPersonalises: 'Info 2' },
    ];

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyUsers);
  });

  it('should add a new user', () => {
    const newUser: User = { utilisateurId: 3, nomUtilisateur: 'New User', email: 'newuser@example.com', password: 'newpassword', roleDutilisateur: 'User', InformationsPersonalises: 'Info 3' };

    service.addUser(newUser).subscribe((user) => {
      expect(user).toEqual(newUser);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(newUser);
  });

  it('should retrieve a user by ID', () => {
    const userId = 1;
    const dummyUser: User = { utilisateurId: 1, nomUtilisateur: 'John Doe', email: 'john@example.com', password: 'password1', roleDutilisateur: 'Admin', InformationsPersonalises: 'Info 1' };

    service.getUser(userId).subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${userId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyUser);
  });

  it('should update a user', () => {
    const updatedUser: User = { utilisateurId: 1, nomUtilisateur: 'Updated User', email: 'updated@example.com', password: 'updatedpassword', roleDutilisateur: 'User', InformationsPersonalises: 'Updated Info' };

    service.updateUser(updatedUser).subscribe((user) => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${updatedUser.utilisateurId}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedUser);
  });


  

  afterEach(() => {
    httpTestingController.verify();
  });
});
