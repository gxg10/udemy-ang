import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, 
        next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercepted!', req);
        // const copyReq = req.clone({params: req.params.set('auth', 'aaa')});
        return next.handle(req);
    }
}