import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const swal = require('sweetalert');

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  users: any
  userForm: any;
  apiUrl: any;

  constructor(public http: HttpClient) { 

    this.apiUrl = environment.apiUrl;

    this.userForm = {
      nombre: '',
      email: '',
      telefono: '',
      pass: '',
      rol: '',
      direccion: '',
      rubro: '',
    };
  }

  createUser() {
    console.log('this.userForm', this.userForm);
    this.http.post(this.apiUrl + '/usuarios', {
      nombre: this.userForm.nombre, 
      email: this.userForm.email, 
      telefono: this.userForm.telefono, 
      pass: this.userForm.pass,
      rol: this.userForm.rol, 
      direccion: this.userForm.direccion, 
      rubro: this.userForm.rubro
       
    }).subscribe(data => {
      this.users = data
      this.userForm = {
        nombre: '',
        email: '', 
        telefono: '',
        pass: '',
        rol: '',
        direccion: '',
        rubro: ''
      };
      swal("Perfecto!", "Usuario creado exitosamente", "success");
    });
  }

  ngOnInit(): void {
  }

}
