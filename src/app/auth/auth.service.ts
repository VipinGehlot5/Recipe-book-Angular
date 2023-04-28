import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { map, tap } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export interface AuthResponse {
    idToken: string ;
    email: string ;
    refreshToken: string ;
    expiresIn: string ;
    localId: string ;
    registered ?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{

    user = new BehaviorSubject<User>(null);
    
    tokenExpirationTimer: any;

    constructor(private http: HttpClient,
        private router:Router){}

    // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    signup(email: string, password:string ){        
        return   this.http.post<AuthResponse>(
            // 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWYlXzozO9BxvvRWJz2eOUuobd_U6Ea4w',
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            
            {
                email: email,
                password: password,
                returnSecureToken: true    //always true
            }
        ).pipe(
            tap(resData=>{
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        )
    }

    // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    login(email: string, password:string){
        return this.http.post<AuthResponse>(
            // 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWYlXzozO9BxvvRWJz2eOUuobd_U6Ea4w',
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            tap(resData=>{
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        )
    }

    autoLogin(){
        const userData : {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return ;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if(loadedUser.Token){
            this.user.next(loadedUser);
        // console.log('loadedUser : ', loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() 
                                 - new Date().getTime();
            this.autoLogout(expirationDuration);
        }   
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration){
        this.tokenExpirationTimer = setInterval(()=>{
            this.logout();
        },expirationDuration);
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}