import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

const swal = require('sweetalert');
const BROMATOLOGIA = 1;

@Component({
  selector: 'app-bromatologia',
  templateUrl: './bromatologia.component.html',
  styleUrls: ['./bromatologia.component.scss']
})

export class BromatologiaComponent implements OnInit {

    apiUrl: any;

    //Iniciar auditoria

    categoriaSeleccionada;
    clienteSeleccionado;
    auditoriaSeleccionada;
    filtros = true;
    nombreCategoria = "";

    //Continuar auditoria
    estado = "";
    idAuditoria = 1;
    auditoriaId;
    auditoria;

    categorias;
    auditorias;
    requisitos;
    clientes;
  
    save: any;
    saveForm: any;
    valForm: FormGroup;
    blackList = ['bad@email.com', 'some@mail.com', 'wrong@email.co'];

    constructor( fb: FormBuilder, public http: HttpClient, private router: Router) {

    this.apiUrl = environment.apiUrl;
    console.log(this.apiUrl);
        
        this.saveForm= {
            puntos: '',
            auditoria_id: '',
            requisito_id: '',
        };

      let password = new FormControl('', Validators.required);
      let certainPassword = new FormControl('', CustomValidators.equalTo(password));

      // Model Driven validation
      this.valForm = fb.group({

          'sometext': fb.control(null, Validators.required),
          'checkbox': fb.control(null, Validators.required),
          'radio': fb.control('', Validators.required),
          'select': fb.control(null, Validators.required),
          'digits': fb.control(null, Validators.pattern('^[0-9]+$')),
          'minlen': fb.control(null, Validators.minLength(6)),
          'maxlen': fb.control(null, Validators.maxLength(10)),

          'email': fb.control(null, CustomValidators.email),
          'url': fb.control(null, CustomValidators.url),
          'date': fb.control(null, CustomValidators.date),
          'number': fb.control(null, Validators.compose([Validators.required, CustomValidators.number])),
          'alphanum': fb.control(null, Validators.pattern('^[a-zA-Z0-9]+$')),
          'minvalue': fb.control(null, CustomValidators.min(6)),
          'maxvalue': fb.control(null, CustomValidators.max(10)),
          'minwords': fb.control(null, this.minWords(6)),
          'maxwords': fb.control(null, this.maxWords(10)),
          'minmaxlen': fb.control(null, CustomValidators.rangeLength([6, 10])),
          'range': fb.control(null, CustomValidators.range([10, 20])),
          'rangewords': fb.control(null, Validators.compose([this.minWords(6), this.maxWords(10)])),
          'email_bl': fb.control(null, this.checkBlackList(this.blackList) ),

          'passwordGroup': fb.group({
              password: password,
              confirmPassword: certainPassword
          })

      });
  }


  auditar() {
      // El cliente ya tiene una auditoria en proceso

    const clienteAuditoria = this.getDropDownText(this.clienteSeleccionado, this.clientes)[0];
    if(clienteAuditoria.auditoria_id){
        const categoria = this.getDropDownText(this.categoriaSeleccionada, this.categorias)[0];
        if (!categoria) {
            alert('Seleccione categoria');
            return;
        }
        this.nombreCategoria = categoria.nombre;
        this.http.get(this.apiUrl + '/auditorias/' + clienteAuditoria.auditoria_id).subscribe(dataAuditoria => {
            this.auditoria = dataAuditoria;
            
            this.http.get(this.apiUrl + '/requisitos?categoria=' + categoria.id).subscribe(data => {
                this.requisitos = data;
                this.estado = "cerrada";
                this.filtros = false;
            });
        });
    }else{
        // Nueva auditoria
        const body = {
            servicio_id: BROMATOLOGIA,
            // TODO: Obtener usuario de la session
            usuario_id: 1,
            cliente_id: this.clienteSeleccionado,
        };
        // Creamos una nueva auditoria
        this.http.post(this.apiUrl + '/auditorias', body).subscribe(dataAuditoria => {
            this.auditoria = dataAuditoria;
            this.nombreCategoria = this.getDropDownText(this.categoriaSeleccionada, this.categorias)[0].nombre;
            this.http.get(this.apiUrl + '/requisitos?categoria=' + this.categoriaSeleccionada).subscribe(data => {
                this.requisitos = data;
                this.filtros = false;
            });
        });
    }
    
  }

  terminar(){
    const clienteAuditoria = this.getDropDownText(this.clienteSeleccionado, this.clientes)[0];
    if(clienteAuditoria.auditoria_id){
        this.http.put(this.apiUrl + '/auditorias/' + clienteAuditoria.auditoria_id, {}).subscribe(dataAuditoria => {
            this.auditoria = dataAuditoria;
        })

    }
    this.ngOnInit();
    
}   
  guardar() {

    let body: any[] = [];
    this.requisitos.forEach(requisito => {
        body.push({
            auditoria_id: this.auditoria.id,
            requisito_id: requisito.id,
            puntaje: requisito.puntaje
        });
    });
    this.http.post(this.apiUrl + '/puntos_requisitos_auditoria', body).subscribe(data => {
      this.save = data
      this.saveForm = {
        puntos: '',
        auditoria_id: '', 
        requisito_id: ''
      };
      swal("Perfecto!", "Tu auditoria se ha guardado correctamente", "success");
      this.filtros = true;
      this.ngOnInit();
    });
  }


  verFiltros() {
    this.filtros = true;
  }

  onItemChange(value, requisito){
 }

  getDropDownText(id, object){
    const selObj = _.filter(object, function (o) {
        return (_.includes(id,o.id));
    });
    return selObj;
  }

  submitForm($ev, value: any) {
      $ev.preventDefault();
      for (let c in this.valForm.controls) {
          this.valForm.controls[c].markAsTouched();
      }
      if (this.valForm.valid) {
      }
  }

  minWords(checkValue): ValidatorFn {
      return <ValidatorFn>((control: FormControl) => {
          return (control.value || '').split(' ').length >= checkValue ? null : { 'minWords': control.value };
      });
  }

  maxWords(checkValue): ValidatorFn {
      return <ValidatorFn>((control: FormControl) => {
          return (control.value || '').split(' ').length <= checkValue ? null : { 'maxWords': control.value };
      });
  }

  checkBlackList(list: Array<string>): ValidatorFn {
      return <ValidatorFn>((control: FormControl) => {
          return list.indexOf(control.value) < 0 ? null : { 'blacklist': control.value };
      });
  }

  ngOnInit(): void {
    this.http.get(this.apiUrl + '/requisitos').subscribe(data => {
        this.requisitos = data
    });

    this.http.get(this.apiUrl + '/usuarios/auditoria?rol=cliente').subscribe(data => {
        this.clientes = data
    });

    this.http.get(this.apiUrl + '/categorias').subscribe(data => {
        this.categorias = data
    });
  }

}
