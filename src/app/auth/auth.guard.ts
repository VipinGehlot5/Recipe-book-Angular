import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService,
        private router:Router){}
    
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),        //to make sure only one user is taken at a time and that too recent user.
            map(user=>{
                // return !!user;
                const isAuth = !!user;  //converts into true boolean
                if (isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            }),
            // tap(isAuth=>{
            //     if (!isAuth){
            //         this.router.navigate(['/auth']);  //to prevent excessive redirecting we use urlTree.
            //     }
            // })
        )
    }
}