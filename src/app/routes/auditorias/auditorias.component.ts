import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BtnCellRenderer } from "./btn-cell-renderer";
import * as _ from 'lodash';
import { environment } from 'src/environments/environment.prod';
declare var $: any;

@Component({
  selector: 'app-auditorias',
  templateUrl: './auditorias.component.html',
  styleUrls: ['./auditorias.component.scss']
})
export class AuditoriasComponent implements OnInit, OnDestroy {

  apiUrl;

  // Tabla
  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  gridOptions: GridOptions;
  columnDefsFilter = [{
      headerName: 'Auditoria',
      field: 'id',
      width: 60,
      filter: 'set',
  },{
      headerName: 'ClienteID',
      field: 'cliente_id',
      width: 60
  },{
      headerName: 'Cliente',
      field: 'nombre',
      width: 120,
      filter: 'set',
  },{
      headerName: 'Fecha',
      field: 'fecha',
      width: 120,
      filter: 'number'
  },{
    field: "Detalle",
    cellRenderer: "btnCellRenderer",
    cellRendererParams: {
      clicked: function(field) {
        alert(`${field} was clicked`);
      }
    },
    width: 60
  }];

  frameworkComponents = {
    btnCellRenderer: BtnCellRenderer
  };

  auditorias: any;

  constructor( public http: HttpClient) { 

    this.apiUrl = environment.apiUrl;

    
    // Filter example
    this.gridOptions = {
      headerHeight: 40,
      columnDefs: this.columnDefsFilter,
      // rowData: null,
      // enableFilter: true,
    };
  }


  ngOnInit(): void {
    this.http.get(this.apiUrl + '/auditorias').subscribe(data => {
        this.auditorias = data
    });
  }

  ngOnDestroy() {
    this.$win.off(this.resizeEvent);
  }

  onQuickFilterChanged($event) {
    this.gridOptions?.api?.setQuickFilter($event.target.value);
  }

  gridReady(params) {
    params.api.sizeColumnsToFit();
    this.$win.on(this.resizeEvent, () => {
        setTimeout(() => { params.api.sizeColumnsToFit(); });
    });
  }


}
