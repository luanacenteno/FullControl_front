import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  users: any
  userForm: any

  constructor(public http: HttpClient) {
    http.get('http://localhost:3000/users').subscribe(data => {
      console.log('users', data);
      this.users = data
    });
  }


  ngOnInit(): void {
  }

}
