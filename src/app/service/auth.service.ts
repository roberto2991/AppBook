import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string;
  private option: HttpHeaders = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

  constructor(private http: HttpClient) {
    this.url = 'http://localhost/bookServer/auth/';
  }

  private body(df: NgForm) {
    let param = new HttpParams()
      .set('username', df.value.username)
      .set('password', df.value.password);
    return param;
  }

  login(datiForm): Observable<string> {
    const body = this.body(datiForm);

    return this.http.post(this.url, body, { headers: this.option })
      .pipe(
        map(res => {
          if (res['token']) {
            this.setSession(res['token']);
          }
          return res['token'];
        }),
        catchError(this.errorhandler)
      )

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
  }

  private setSession(jwt: string) {
    let expired: number = new Date().getTime() + 120000;
    localStorage.setItem('token', jwt);
    localStorage.setItem('expire', expired.toString());
  }

  Expired(): boolean {

    if (localStorage.getItem('expire')) {
      let expire: number = parseInt(localStorage.getItem('expire'));
      console.log("expire: "+ expire);
      console.log("Date().getTime: "+ new Date().getTime());
      return new Date().getTime() > expire
    }
    return true
  }

  checkDir() {
    if (this.Expired()) {
      return '';
    }
    return 'dashboard/';
  }


  /*GESTIONE ERRORI*/
  errorhandler(error: any) {
    console.log(error);
    let msg: string;
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        msg = 'Applicazione offline';
      } else {
        msg = `Si è verificato un errore: ${error.error.msg} (server status code ${error.status})`;
      }
      return throwError(msg);
    }
    return throwError(`Si è verificato un errore di tipo: ${error.message}`);
  }


}
