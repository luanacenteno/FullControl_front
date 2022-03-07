import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    selector: 'btn-cell-renderer',
    template: `
          <button class="btn btn-xs btn-info" type="button" (click)="btnClickedHandler()">
            <em class="fas fa-bars"></em>
          </button>
    `,
  })
  
  export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
    
    constructor(private router: Router){}

    refresh(params: any): boolean {
      throw new Error("Method not implemented.");
    }
    private params: any;
  
    agInit(params: any): void {
      this.params = params;
    }
  
    btnClickedHandler() {
      this.router.navigate(['/auditorias/' + this.params.data.id]);
    }
  
    ngOnDestroy() {
      // no need to remove the button click handler 
      // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
    }
  }