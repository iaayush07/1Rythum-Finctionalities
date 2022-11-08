import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormComponent } from '../Dynamic Component/employee/components/form/form.component';
import { employeee } from '../Dynamic Component/employee/components/model/employee.model';

@Injectable()
export class EmployeeService {

  public baseURl: string;
  private overlayRef!: OverlayRef;
  constructor(private http: HttpClient, private overlay: Overlay) {
    this.baseURl = "http://localhost:3000/employee/"
  }

  getEmployee(scroll: number, scrollsize: number): Observable<employeee[]> {
    const url = this.baseURl;
    return this.http.get<employeee[]>(`${url}?_page=${scroll}&_limit=${scrollsize}`);
  }

  addEmployee(employee: employeee): Observable<employeee> {
    const url = this.baseURl;
    return this.http.post<employeee>(url, employee)
  }
  // getEmpId(id: number): Observable<employeee> {
  //   const url = this.baseURl + id;
  //   return this.http.get<employeee>(url)
  // }


  updateEmp(id: number, employee: employeee): Observable<employeee> {
    const url = this.baseURl + id;
    return this.http.put<employeee>(url, employee)
  }

  deleteEmp(id: number): Observable<employeee> {
    const url = this.baseURl + id;
    return this.http.delete<employeee>(url)
  }

}
