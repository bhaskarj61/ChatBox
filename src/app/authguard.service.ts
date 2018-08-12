import { Injectable } from '@angular/core';
import { CanActivate, Router } from '../../node_modules/@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService  implements CanActivate {

  constructor(private router:Router) { }
  canActivate(){
    if(sessionStorage.getItem("key")=="raksahb"){
      alert('please logout first');
      this.router.navigate(['/chatbox']);
      return false;
    }
    return true;
  }
}