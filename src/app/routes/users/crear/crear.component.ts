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
      name: '',
      lastName: ''
    };
  }

  createUser() {
    this.http.post('http://localhost:3000/users', {name: this.userForm.name, last_name: this.userForm.lastName}).subscribe(data => {
      this.users = data
      this.userForm = {
        name: '',
        lastName: ''
      };
      swal("Perfecto!", "Usuario creado exitosamente", "success");
    });
  }

  ngOnInit(): void {
  }

}
