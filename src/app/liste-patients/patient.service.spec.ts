import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PatientService } from './patient.service';
import { Patient } from './patient';
import { environment } from '../../environments/environment';

describe('PatientService', () => {
  let service: PatientService;
  let httpTestingController: HttpTestingController;
  let apiUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientService],
    });
    service = TestBed.inject(PatientService);
    httpTestingController = TestBed.inject(HttpTestingController);
    apiUrl = `${environment.apiBaseUrl}/patient`;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the list of patients', () => {
    const dummyPatients: Patient[] = [
      { patientId: 1, nom: 'John Doe', dateDeNaissance: new Date(), sexe: 'Male', adresse: 'Address 1', telephone: '123456789' },
      { patientId: 2, nom: 'Jane Doe', dateDeNaissance: new Date(), sexe: 'Female', adresse: 'Address 2', telephone: '987654321' },
    ];

    service.getPatients().subscribe((patients) => {
      expect(patients).toEqual(dummyPatients);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPatients);
  });

  it('should add a new patient', () => {
    const newPatient: Patient = { patientId: 3, nom: 'New Patient', dateDeNaissance: new Date(), sexe: 'Male', adresse: 'Address 3', telephone: '555555555' };

    service.addPatient(newPatient).subscribe((patient) => {
      expect(patient).toEqual(newPatient);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(newPatient);
  });

  it('should retrieve a patient by ID', () => {
    const patientId = 1;
    const dummyPatient: Patient = { patientId: 1, nom: 'John Doe', dateDeNaissance: new Date(), sexe: 'Male', adresse: 'Address 1', telephone: '123456789' };

    service.getPatient(patientId).subscribe((patient) => {
      expect(patient).toEqual(dummyPatient);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${patientId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPatient);
  });

  it('should update a patient', () => {
    const updatedPatient: Patient = { patientId: 1, nom: 'Updated Patient', dateDeNaissance: new Date(), sexe: 'Male', adresse: 'Updated Address', telephone: '999999999' };

    service.updatePatient(updatedPatient).subscribe((patient) => {
      expect(patient).toEqual(updatedPatient);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${updatedPatient.patientId}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedPatient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});