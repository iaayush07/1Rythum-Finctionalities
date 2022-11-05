import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private overlayRef!: OverlayRef;
  constructor(
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
  }

  public openForm() {
    // this.router.navigateByUrl("employee/employee-form")
    // Overlay config
    const overlayConfig: OverlayConfig = new OverlayConfig();
    overlayConfig.positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();

    this.overlayRef = this.overlay.create(overlayConfig);
    // Over Porat;
    const portal = new ComponentPortal(FormComponent);
    // porat attched
    const componentRef = this.overlayRef.attach(portal);

    componentRef.instance.confirm.subscribe((res) => {
      this.overlayRef.detach();
    });

    componentRef.instance.cancle.subscribe((res) => {
      this.overlayRef.detach();
    });
  }
}

