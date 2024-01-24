import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  loginOk: boolean = true


  constructor(private router: Router)
  {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    console.log(this.CheckLogin())
    return this.CheckLogin()
  }

  private CheckLogin()
   {
    // chiamare il service e verifico le credenziali di accesso
    if (!this.loginOk)
    {
      this.router.navigate(['/login'])
      return false
    }
    return true
   }
  
}
