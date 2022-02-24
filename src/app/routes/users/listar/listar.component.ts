import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from 'ag-grid-community';
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit, OnDestroy {

  resizeEvent = 'resize.ag-grid';
    $win = $(window);

    gridOptions: GridOptions;

  // Filter Example
  irishAthletes = ['John Joe Nevin', 'Katie Taylor', 'Paddy Barnes', 'Kenny Egan', 'Darren Sutherland', 'Margaret Thatcher', 'Tony Blair', 'Ronald Regan', 'Barack Obama'];

  columnDefsFilter = [{
      headerName: 'Razón social',
      field: 'athlete',
      width: 150,
      filter: 'set',
  }, {
      headerName: 'Sucursal',
      field: 'age',
      width: 90,
      filter: 'number'
  }, {
      headerName: 'Dirección comercial',
      field: 'country',
      width: 120
  }, {
      headerName: 'Telefono',
      field: 'year',
      width: 90
  },  {
      headerName: 'Representante legal',
      field: 'sport',
      width: 110
  }, {
    headerName: 'Fecha',
    field: 'date',
    width: 110
  }, {
      headerName: 'Puntaje',
      field: 'gold',
      width: 100,
      filter: 'number'
  }, {
      headerName: 'Estado',
      field: 'silver',
      width: 100,
      filter: 'number'
  }, {
      headerName: 'Bronze',
      field: 'bronze',
      width: 100,
      filter: 'number'
  }, {
      headerName: 'Total',
      field: 'total',
      width: 100,
      filter: 'number'
  }];

  rowData1: any;
  rowData2: any;
  rowData3: any;

  users: any
  userForm: any

  constructor(public http: HttpClient) {

    http.get('http://localhost:3000/users').subscribe(data => {
      console.log('users', data);
      this.users = data
    });

    // Filter example
    this.gridOptions = {
      headerHeight: 40,
      columnDefs: this.columnDefsFilter,
      // rowData: null,
      // enableFilter: true,
  };

  const data = http.get<any>('assets/server/ag-owinners.json');
        this.rowData1 = data;
        this.rowData2 = data;
        this.rowData3 = data;
  }

  onQuickFilterChanged($event) {
    this.gridOptions?.api?.setQuickFilter($event.target.value);
}


  ngOnInit(): void {}

  gridReady(params) {
    params.api.sizeColumnsToFit();
    this.$win.on(this.resizeEvent, () => {
        setTimeout(() => { params.api.sizeColumnsToFit(); });
    });
  }

  ngOnDestroy() {
    this.$win.off(this.resizeEvent);
  }

}
