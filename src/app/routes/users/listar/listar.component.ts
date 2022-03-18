import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from 'ag-grid-community';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment.prod';
declare var $: any;

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit, OnDestroy {

  apiUrl: any;

  resizeEvent = 'resize.ag-grid';
    $win = $(window);

    gridOptions: GridOptions;

  // Filter Example
  

    columnDefsFilter = [{
        headerName: 'Nombre',
        field: 'nombre',
        width: 150,
        filter: 'set',
    }, {
        headerName: 'Email',
        field: 'email',
        width: 130,
        filter: 'number'
    }, {
        headerName: 'Teléfono',
        field: 'telefono',
        width: 130
    }, {
        headerName: 'Rol',
        field: 'rol',
        width: 130
    },  {
        headerName: 'Direccion',
        field: 'direccion',
        width: 130
    }, {
      headerName: 'Rubro',
      field: 'rubro',
      width: 130
    }];

    rowData1: any;
    rowData2: any;
    rowData3: any;

    users: any
    userForm: any

    constructor(public http: HttpClient) {

      this.apiUrl = environment.apiUrl;
      console.log('APIURL', this.apiUrl);

      http.get(this.apiUrl + '/usuarios').subscribe(data => {
        console.log('usuarios', data);
        this.users = data
      });

      // Filter example
      this.gridOptions = {
        headerHeight: 40,
        columnDefs: this.columnDefsFilter,
        // rowData: null,
        // enableFilter: true,
    };

  const data = http.get<any>(this.apiUrl + '/usuarios');
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
