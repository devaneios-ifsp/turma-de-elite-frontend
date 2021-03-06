import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {switchMap, take} from "rxjs/operators";

@Injectable()
export class BearerInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.auth.getToken().pipe(
      take(1),
      switchMap(token => {
        if(token){
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}`}
          });
        }
        return next.handle(request);
      })
    );
  }
}
