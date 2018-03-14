import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable, NgModule} from '@angular/core';
import 'rxjs/add/operator/do';

@Injectable()
export class EbayInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {

    if (request.url.includes('ebay')) {
      const newRequest = request.clone({

        headers: request.headers.set(
            'X-EBAY-SOA-SECURITY-APPNAME', 'AndreasM-Statisti-PRD-151ca6568-9ecacea6'
          )

        }
      );

      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }
  }
}
