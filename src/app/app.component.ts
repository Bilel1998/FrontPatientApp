import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient } from './patient';
import { PatientService } from './patient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  patients : Patient[];
  editPatient:Patient;
  deletePatient:Patient;

  title = 'patientManagerApp';
  constructor( private patientService: PatientService ) { }
  public ngOnInit()
  {
    this.getAllPatients();

  }
  public getAllPatients(): void {
    this.patientService.getPatients().subscribe(
      (data:Patient[]) => {
        this.patients=data;
        console.log(this.patients);

      },
      (error:HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  }
  
  public searchPatients(key: string): void {
    console.log(key);
    const results: Patient[] = [];
    for (const patient of this.patients) {
      if (patient.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || patient.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || patient.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || patient.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(patient);
      }
    }
    this.patients = results;
    if ( !key) {
      this.getAllPatients();
    }
  }
  public onUpdatePatient(patient:Patient):void{
    this.patientService.updatePatient(patient).subscribe(
      (response:Patient) =>{
        console.log(response);
        this.getAllPatients();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }

    );
  }
  public onDeletePatient(patientId:number):void{
    this.patientService.deletePatient(patientId).subscribe(
      (response:void) =>{
        console.log(response);
        this.getAllPatients();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);

      }

    );
  }
  public onAddPatient(addForm:NgForm):void{
    document.getElementById("add-patient-form").click();
    this.patientService.addPatient(addForm.value).subscribe(
      (response:Patient) =>{
        console.log(response);
        this.getAllPatients();
        addForm.reset();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset();

      }

    );
  }
  public onOpenModal(patient:Patient, mode:String):void {
    console.log("!!!!!!");
    const container= document.getElementById("main-container")
    const button= document.createElement("button");
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-bs-toggle','modal');
    if(mode==='add')
    {
      button.setAttribute('data-bs-target','#addPatientModal');
    }
    if(mode==='edit')
    {
      this.editPatient=patient;
      button.setAttribute('data-bs-target','#updatePatientModal');
    }
    if(mode==='delete')
    {
      this.deletePatient=patient;
      button.setAttribute('data-bs-target','#deletePatientModal');
    }
    container.appendChild(button);
    button.click();
  }

}
