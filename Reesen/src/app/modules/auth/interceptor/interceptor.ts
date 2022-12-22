import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {


  intercept(
    request: HttpRequest<any>, 
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const accessToken: any = localStorage.getItem('user');
      const decodedItem = JSON.parse(accessToken);
      if(request.headers.get('skip')) return next.handle(request);

      if(accessToken){
        const cloned = request.clone({
          headers: request.headers.set('X-Auth-Token', decodedItem.token),

        });
        return next.handle(cloned);
      }
      return next.handle(request);
      
  }
}
