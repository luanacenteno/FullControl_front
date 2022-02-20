import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  users: any
  userForm: any

  constructor(public http: HttpClient) {
    http.get('http://localhost:3000/users').subscribe(data => {
      console.log('users', data);
      this.users = data
    });
  }

  createUser() {
    this.http.post('http://localhost:3000/users', {name: this.userForm.name, lastName: this.userForm.lastName}).subscribe(data => {
      console.log('users', data);
      this.users = data
    });
  }

  ngOnInit(): void {
  }

}