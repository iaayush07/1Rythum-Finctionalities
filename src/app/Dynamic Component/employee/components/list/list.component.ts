import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { DataCommunicationService } from 'src/app/services/data-communication.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormComponent } from '../form/form.component';
import { employeee } from '../model/employee.model';
//---------------------------------
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private overlayRef!: OverlayRef;
  public employeeList: employeee[];
  //---------------------------------
  public scroll: number;
  public scrollSize: number;

  constructor(
    private overlay: Overlay, private empService: EmployeeService, private dcService: DataCommunicationService, private modalService: NgbModal
  ) {
    this.employeeList = [];
    //--------------------------------------------------
    this.scroll = 1;
    this.scrollSize = 15;
  }

  ngOnInit(): void {
    this.dcService.subjectData$.subscribe(res => {
      if (res) {
        this.getEmployeeArray();
      }
    })
    this.getEmployeeArray();

    // for (let i = 0; i <= 25; i++) {
    //   this.employeeList.push(i)
    // }
  }
  public openForm() {
    // this.router.navigateByUrl("employee/employee-form")
    // Overlay config
    const overlayConfig: OverlayConfig = new OverlayConfig();
    overlayConfig.positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();

    this.overlayRef = this.overlay.create(overlayConfig);
    // Over Porat;
    const portal = new ComponentPortal(FormComponent);
    // portal attched
    const componentRef = this.overlayRef.attach(portal);

    componentRef.instance.confirm.subscribe((res) => {
      this.overlayRef.detach();
    });

    componentRef.instance.cancle.subscribe((res) => {
      this.overlayRef.detach();
    });
    return componentRef;
  }

  getEmployeeArray() {
    this.empService.getEmployee(this.scroll, this.scrollSize).subscribe(res => {
      this.employeeList = this.employeeList.concat(res)
    })
  }
  onScroll() {
    this.scroll++;
    this.getEmployeeArray();
  }

  open() {
    this.openForm();
  }
  openDeletePopup(content: any) {
    this.modalService.open(content, { centered: true });
  }
  editEmp(item: employeee) {
    const componentRef = this.openForm();
    componentRef.instance.employeeForm.patchValue(item);
    // console.log(componentRef)
  }
  deleteEmp(id: number) {
    this.empService.deleteEmp(id).subscribe(res => {
      this.dcService.getData(res);
    })
  }
}

