import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: string = '';
  password: string = '';

  constructor(
    private route: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  setUser(value){
    this.user = value.target.value;
  }

  setPassword(password){
    this.password = password.target.value;
  }

  login() {
    console.log(this.user);
    console.log(this.password);
    this.http
      .get(
        `http://localhost:3000/login?user=${this.user}&password=${this.password}`
      )
      .subscribe((response) => {
        if (!response) {
          alert('Senha Incorreta! Tente novamente');
        } else {
          window.sessionStorage.setItem("user", this.user);
          this.route.navigate(['/tabs']);
        }
      });
  }
}
