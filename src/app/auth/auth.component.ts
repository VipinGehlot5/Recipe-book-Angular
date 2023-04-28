import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error : string = null;
  @ViewChild(PlaceholderDirective , {static:false}) alertHost: PlaceholderDirective; 

  private closeSub: Subscription

  constructor(private authService: AuthService, 
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    if (!form.valid){
      return;
    }
    const email= form.value.email;
    const password= form.value.password;

    let authObs : Observable<AuthResponse>;

    this.isLoading = true;
    
    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    }else{
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (resData) =>{
        console.log('Response data of Authentication' ,resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorRes)=>{
        console.log('Error Response:',errorRes);
        this.error = errorRes.error.error.message
        console.log('Error Message: ', this.error);

        this.showErrorAlert(errorRes.error.error.message);
        this.isLoading = false;
      }
    )

    form.reset();
  }

  // for *ngIf dynamic loading of alert box
  onHandleError(){
    this.error = null
  }

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

    //Dynamic Component Loader
  private showErrorAlert(message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear(); //clear all angular component render at that place before.

    const componentRef = hostViewContainer.createComponent(alertCmpFactory);
    componentRef.instance.message= message;
    this.closeSub=  componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainer.clear();
    });
  }
}
