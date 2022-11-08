import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { employeee } from '../Dynamic Component/employee/components/model/employee.model';

@Injectable()
export class DataCommunicationService {

  public subjectData$: Observable<employeee>;
  private subjectData: Subject<employeee>;

  constructor() {
    this.subjectData = new Subject();
    this.subjectData$ = this.subjectData.asObservable();
  }

  /**
   * get data using subject
   * @param employee 
   */
  getData(employee: employeee) {
    this.subjectData.next(employee);
  }
}
