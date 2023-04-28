import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
constructor(private authService: AuthService){}

// this interceptor will add token to all outgoing request
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user =>{
                if (!user){
                    return next.handle(req);        //for login/signup
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.Token)    
                });
                return next.handle(modifiedReq);        //for fetch/save data in database
            })
        )
    }
}