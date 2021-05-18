import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
private apiServerUrl='http://localhost:8090';
  constructor( private http:HttpClient ) { }

  public getPatients():Observable<Patient[]>{
    return this.http.get<Patient[]>(`${this.apiServerUrl}/Patient/all`)
  }
  public addPatient(patient:Patient ):Observable<Patient>{
    return this.http.post<Patient>(`${this.apiServerUrl}/Patient/add`,patient)
  }
  public updatePatient(patient:Patient ):Observable<Patient>{
    return this.http.put<Patient>(`${this.apiServerUrl}/Patient/update`,patient)
  }
  public deletePatient(patientId:number ):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/Patient/delete/${patientId}`)
  }
}
