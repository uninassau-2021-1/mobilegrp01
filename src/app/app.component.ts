import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user:string = '';

  constructor(
    private router:Router
  ) {
    this.user = window.sessionStorage.user ? window.sessionStorage.user: '';
  }

  ngOnInit(){
    
    this.isLoggedIn();
  }

  isLoggedIn(){
    if(!this.user.length){
      this.router.navigateByUrl('login');
    }
  }

}
