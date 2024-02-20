import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {




  constructor(private router: Router, private auth: AuthService)
  {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    console.log("canActivate: " + this.CheckLogin())
    return this.CheckLogin()
  }

  private CheckLogin()
   {
    // chiamare il service e verifico le credenziali di accesso
    console.log("Expired: " + this.auth.Expired())
    if (this.auth.Expired())
    {
      this.router.navigate(['/login'])
      return false
    }
    return true
   }
  
}
