import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const gettoken = localStorage.getItem('token')
    
  
      console.log("log token in interceptor: ", gettoken);
     const cloneReq = req.clone({
        setHeaders :{
          Authorization : `Bearer ${gettoken}` 
        }
      });
    
    return next.handle(cloneReq);
  }
}
