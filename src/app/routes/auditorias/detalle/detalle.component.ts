
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../../../shared/colors/colors.service';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

    auditoria;
    categorias;

    constructor(public colors: ColorsService, public http: HttpClient) { }

    ngOnInit() {
      const auditoria_id = location.pathname.split('/').pop();
      this.http.get('http://localhost:3000/auditorias/detalle/' + auditoria_id).subscribe(data => {
        console.log('auditorias', data);
        this.auditoria = data
      });

      this.http.get('http://localhost:3000/categorias').subscribe(data => {
        console.log('categorias', data);
        this.categorias = data
      });
      
    }

}
