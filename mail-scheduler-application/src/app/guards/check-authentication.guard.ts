import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInComponent } from '../log-in/log-in.component';
import { LoginUserService } from '../login-user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthenticationGuard implements CanActivate {
  constructor(private userLogin:LoginUserService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("Guard is activated,protecting from unauthorised access");
      console.log("state.url vaalue is",state.url);
      
      return this.checkLoginStatus(state.url);
  }

  checkLoginStatus(url:string)
  {
    console.log("isLoggedIn value in guard's class",this.userLogin.isLoggedin);
    
    if(this.userLogin.isLoggedin)
    {
      return this.userLogin.isLoggedin
    }
      this.userLogin.redirectUrl=url
      return this.router.parseUrl('/accounts')

  }
  
}
