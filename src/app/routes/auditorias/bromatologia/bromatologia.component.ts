import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { BodyDropTarget } from 'ag-grid-community';

const swal = require('sweetalert');
const BROMATOLOGIA = 1;

@Component({
  selector: 'app-bromatologia',
  templateUrl: './bromatologia.component.html',
  styleUrls: ['./bromatologia.component.scss']
})

export class BromatologiaComponent implements OnInit {


    //Iniciar auditoria

    categoriaSeleccionada;
    clienteSeleccionado;
    auditoriaSeleccionada;
    filtros = true;
    nombreCategoria = "";

    //Continuar auditoria
    estado = "klñ";
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

    constructor(fb: FormBuilder, public http: HttpClient) {

        this.saveForm= {
            puntos: '',
            auditoria_id: '',
            requisito_id: '',
        };


        //Traer auditorias abiertas
        /*http.get('http://localhost:3000/auditorias?estado=abierta').subscribe(data => {
            console.log('auditorias', data);
            this.auditorias = data
        });*/


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
    console.log('auditoria', this.auditoria, this.clienteSeleccionado, this.clientes);
    if(clienteAuditoria.auditoria_id){
        const categoria = this.getDropDownText(this.categoriaSeleccionada, this.categorias)[0];
        if (!categoria) {
            alert('Seleccione categoria');
            return;
        }
        this.nombreCategoria = categoria.nombre;
        this.http.get('http://localhost:3000/auditorias/' + clienteAuditoria.auditoria_id).subscribe(dataAuditoria => {
            console.log('Response continuarAuditoria', dataAuditoria);
            this.auditoria = dataAuditoria;
            console.log('continuarAuditoriaa**', clienteAuditoria.auditoria_id);
            
            this.http.get('http://localhost:3000/requisitos?categoria=' + categoria.id).subscribe(data => {
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
        console.log('iniciarAuditoria', body);
        // Creamos una nueva auditoria
        this.http.post('http://localhost:3000/auditorias', body).subscribe(dataAuditoria => {
            console.log('Response auditoria', dataAuditoria);
            this.auditoria = dataAuditoria;
            console.log('auditoriaa**', this.auditoria.id);
            this.nombreCategoria = this.getDropDownText(this.categoriaSeleccionada, this.categorias)[0].nombre;
            this.http.get('http://localhost:3000/requisitos?categoria=' + this.categoriaSeleccionada).subscribe(data => {
                this.requisitos = data;
                this.filtros = false;
            });
        });
    }
    
  }


  /*iniciarAuditoria() {
    const body = {
        servicio_id: BROMATOLOGIA,
        // TODO: Obtener usuario de la session
        usuario_id: 1,
        cliente_id: this.clienteSeleccionado,
    };
    console.log('iniciarAuditoria', body);
    // Creamos una nueva auditoria
    this.http.post('http://localhost:3000/auditorias', body).subscribe(dataAuditoria => {
        console.log('Response auditoria', dataAuditoria);
        this.auditoria = dataAuditoria;
        console.log('auditoriaa**', this.auditoria.auditoria_id);
        this.nombreCategoria = this.getDropDownText(this.categoriaSeleccionada, this.categorias)[0].nombre;
        this.http.get('http://localhost:3000/requisitos?categoria=' + this.categoriaSeleccionada).subscribe(data => {
            this.requisitos = data;
            this.filtros = false;
        });
    });
  }

  continuarAuditoria() {
    const categoria = this.getDropDownText(this.categoriaSeleccionada, this.categorias)[0];
    if (!categoria) {
        alert('Seleccione categoria');
        return;
    }
    this.nombreCategoria = categoria.nombre;
    this.auditoria = this.getDropDownText(this.auditoriaSeleccionada, this.auditorias)[0];
    console.log('auditoria', this.auditoria);
    this.http.get('http://localhost:3000/auditorias/' + this.auditoria.id).subscribe(dataAuditoria => {
        console.log('Response continuarAuditoria', dataAuditoria);
        this.auditoria = dataAuditoria;
        console.log('continuarAuditoriaa**', this.auditoria.auditoria_id);
        
        this.http.get('http://localhost:3000/requisitos?categoria=' + categoria.id).subscribe(data => {
            this.requisitos = data;
            this.estado = "cerrada";
            this.filtros = false;
        });
    });
  }*/


  guardar() {
    console.log('this.saveForm', this.saveForm);
    console.log('requisitos: ', this.requisitos);
    console.log('auditoria: ', this.auditoria);

    let body: any[] = [];
    this.requisitos.forEach(requisito => {
        body.push({
            auditoria_id: this.auditoria.id,
            requisito_id: requisito.id,
            puntaje: requisito.puntaje
        });
    });
    console.log('body', body);
    this.http.post('http://localhost:3000/puntos_requisitos_auditoria', body).subscribe(data => {
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
    console.log(" Value is : ", value , " Requisito: ", requisito);
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
          console.log('Valid!');
      }
      console.log(value);
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
    this.http.get('http://localhost:3000/requisitos').subscribe(data => {
        console.log('requisitos', data);
        this.requisitos = data
    });

    this.http.get('http://localhost:3000/usuarios/auditoria?rol=cliente').subscribe(data => {
        console.log('usuarios', data);
        this.clientes = data
    });

    this.http.get('http://localhost:3000/categorias').subscribe(data => {
        console.log('categorias', data);
        this.categorias = data
    });
  }

}
