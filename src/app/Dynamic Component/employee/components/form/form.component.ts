import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//------------------------
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataCommunicationService } from 'src/app/services/data-communication.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() public confirm: EventEmitter<boolean>;

  @Output() public cancle: EventEmitter<boolean>;

  public employeeForm: FormGroup;
  public isDirty: boolean;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private empService: EmployeeService, private dcService: DataCommunicationService,
    private actRoute: ActivatedRoute) {
    this.confirm = new EventEmitter();
    this.cancle = new EventEmitter();

    this.employeeForm = this.fb.group({
      id: [''],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required],
      mobile: ['', Validators.required]
    })

    this.isDirty = true;

  }

  ngOnInit(): void {

  }
  public cancleData(content: any): void {
    if (this.employeeForm.dirty || this.employeeForm.touched) {

      this.modalService.open(content, { centered: true, backdrop: true });
    }
    else {
      this.closeForm();
    }
  }
  get f(): { [key: string]: AbstractControl; } {
    return this.employeeForm.controls;
  }

  closeForm() {
    this.cancle.emit(true)
  }

  onSave() {
    if (this.employeeForm.valid) {
      if (this.employeeForm.value.id) {
        this.updateEmp();
      }
      else {
        this.addEmp();
      }
    }
  }
  addEmp() {
    this.empService.addEmployee(this.employeeForm.value).subscribe(res => {
      this.dcService.getData(res);
      this.closeForm();
    })
  }
  updateEmp() {
    this.empService.updateEmp(this.employeeForm.value.id, this.employeeForm.value).subscribe(res => {
      this.dcService.getData(res);
      this.closeForm();
    })
  }
}



