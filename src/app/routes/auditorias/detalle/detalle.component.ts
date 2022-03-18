
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ColorsService } from '../../../shared/colors/colors.service';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

    apiUrl;

    auditoria: any = { cliente:"" };
    categorias;

    constructor(private router:Router, public colors: ColorsService, public http: HttpClient) {

      this.apiUrl = environment.apiUrl
      
    }
      

    volver() {
      this.router.navigate(['auditorias']);
    }

    ngOnInit() {
      const auditoria_id = location.pathname.split('/').pop();
      this.http.get(this.apiUrl + '/auditorias/detalle/' + auditoria_id).subscribe(data => {
        console.log('auditorias', data);
        this.auditoria = data
      });

      this.http.get(this.apiUrl + '/categorias').subscribe(data => {
        console.log('categorias', data);
        this.categorias = data
      });
    }

}
