import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const swal = require('sweetalert');

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  users: any
  userForm: any;

  constructor(public http: HttpClient) { 
    this.userForm = {
      razon: '',
      sucursal: '',
      representante: '',
      direccion: '',
      telefono: '',
      email: '',
      cuil: ''
    };
  }

  createUser() {
    console.log('this.userForm', this.userForm);
    this.http.post('http://localhost:3000/usuarios', {
      razon: this.userForm.razon, 
      sucursal: this.userForm.sucursal, 
      representante: this.userForm.representante, 
      direccion: this.userForm.direccion, 
      telefono: this.userForm.telefono, 
      email: this.userForm.email, 
      cuil: this.userForm.cuil 
    }).subscribe(data => {
      this.users = data
      this.userForm = {
        razon: '',
        sucursal: '',
        representante: '',
        direccion: '',
        telefono: '',
        email: '',
        cuil: ''
      };
      swal("Perfecto!", "Usuario creado exitosamente", "success");
    });
  }

  ngOnInit(): void {
  }

}
