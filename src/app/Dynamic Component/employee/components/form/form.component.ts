import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() public confirm: EventEmitter<boolean>;

  @Output() public cancle: EventEmitter<boolean>;
  constructor() {
    this.confirm = new EventEmitter();
    this.cancle = new EventEmitter();
  }

  ngOnInit(): void {
  }
  public cancleData(): void {
    this.cancle.emit(true)
  }

}
