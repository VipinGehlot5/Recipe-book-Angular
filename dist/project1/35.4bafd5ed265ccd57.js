"use strict";(self.webpackChunkproject1=self.webpackChunkproject1||[]).push([[35],{3035:(M,d,l)=>{l.r(d),l.d(d,{AuthModule:()=>A});var t=l(8256);let m=(()=>{class n{constructor(){this.close=new t.vpe}onClose(){this.close.emit()}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-alert"]],inputs:{message:"message"},outputs:{close:"close"},decls:7,vars:1,consts:[[1,"backdrop",3,"click"],[1,"alert-box"],[1,"alert-box-actions"],[1,"btn","btn-default",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.NdJ("click",function(){return o.onClose()}),t.TgZ(1,"div",1)(2,"p"),t._uU(3),t.qZA(),t.TgZ(4,"div",2)(5,"button",3),t.NdJ("click",function(){return o.onClose()}),t._uU(6,"Close"),t.qZA()()()()),2&e&&(t.xp6(3),t.hij("An Error Occoured: ",o.message,""))},styles:[".backdrop[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,.75);z-index:50}.alert-box[_ngcontent-%COMP%]{position:fixed;top:30vh;left:20vw;width:60vw;padding:16px;z-index:100;background:rgb(248,197,197);box-shadow:0 2px 8x #00000042;border:solid 2px red;border-radius:15px}.alert-box-actions[_ngcontent-%COMP%]{text-align:right}"]}),n})(),p=(()=>{class n{constructor(e){this.viewContainerRef=e}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(t.s_b))},n.\u0275dir=t.lG2({type:n,selectors:[["","appPlaceholder",""]]}),n})();var h=l(9622),u=l(3841),g=l(6895),s=l(433);let f=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-loading-spinner"]],decls:5,vars:0,consts:[[1,"lds-ring"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t._UZ(1,"div")(2,"div")(3,"div")(4,"div"),t.qZA())},styles:[".lds-ring[_ngcontent-%COMP%]{display:inline-block;position:relative;width:80px;height:80px}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{box-sizing:border-box;display:block;position:absolute;width:64px;height:64px;margin:8px;border:8px solid blue;border-radius:50%;animation:_ngcontent-%COMP%_lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:blue transparent transparent transparent}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(1){animation-delay:-.45s}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2){animation-delay:-.3s}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3){animation-delay:-.15s}@keyframes _ngcontent-%COMP%_lds-ring{0%{transform:rotate(0)}to{transform:rotate(360deg)}}"]}),n})();function b(n,r){}function v(n,r){1&n&&(t.TgZ(0,"div",5),t._UZ(1,"app-loading-spinner"),t.qZA())}function C(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"form",6,7),t.NdJ("ngSubmit",function(){t.CHM(e);const i=t.MAs(1),c=t.oxw();return t.KtG(c.onSubmit(i))}),t.TgZ(2,"div",8)(3,"label",9),t._uU(4,"Email"),t.qZA(),t._UZ(5,"input",10),t.qZA(),t.TgZ(6,"div",8)(7,"label",11),t._uU(8,"Password"),t.qZA(),t._UZ(9,"input",12),t.qZA(),t.TgZ(10,"div")(11,"button",13),t._uU(12),t.qZA(),t._uU(13," | "),t.TgZ(14,"button",14),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.onSwitchMode())}),t._uU(15),t.qZA()()()}if(2&n){const e=t.MAs(1),o=t.oxw();t.xp6(11),t.Q6J("disabled",!e.valid),t.xp6(1),t.Oqu(o.isLoginMode?"Login":"Sign Up"),t.xp6(3),t.hij(" Switch to ",o.isLoginMode?"Sign up":"Login","")}}let _=(()=>{class n{constructor(e,o,i){this.authService=e,this.router=o,this.componentFactoryResolver=i,this.isLoginMode=!0,this.isLoading=!1,this.error=null}onSwitchMode(){this.isLoginMode=!this.isLoginMode}onSubmit(e){if(console.log(e.value),!e.valid)return;const o=e.value.email,i=e.value.password;let c;this.isLoading=!0,c=this.isLoginMode?this.authService.login(o,i):this.authService.signup(o,i),c.subscribe(a=>{console.log("Response data of Authentication",a),this.isLoading=!1,this.router.navigate(["/recipes"])},a=>{console.log("Error Response:",a),this.error=a.error.error.message,console.log("Error Message: ",this.error),this.showErrorAlert(a.error.error.message),this.isLoading=!1}),e.reset()}onHandleError(){this.error=null}ngOnDestroy(){this.closeSub&&this.closeSub.unsubscribe()}showErrorAlert(e){const o=this.componentFactoryResolver.resolveComponentFactory(m),i=this.alertHost.viewContainerRef;i.clear();const c=i.createComponent(o);c.instance.message=e,this.closeSub=c.instance.close.subscribe(()=>{this.closeSub.unsubscribe(),i.clear()})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(h.e),t.Y36(u.F0),t.Y36(t._Vd))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-auth"]],viewQuery:function(e,o){if(1&e&&t.Gf(p,5),2&e){let i;t.iGM(i=t.CRH())&&(o.alertHost=i.first)}},decls:5,vars:2,consts:[[1,"row"],[1,"col-xs-12","col-md-6","col-md-offset-3"],["appPlaceholder",""],["style","text-align: center;",4,"ngIf"],[3,"ngSubmit",4,"ngIf"],[2,"text-align","center"],[3,"ngSubmit"],["authForm","ngForm"],[1,"form-group"],["for","email"],["type","text","id","email","ngModel","","name","email","required","","email","",1,"form-control"],["for","password"],["type","password","id","password","ngModel","","name","password","required","","minlength","6",1,"form-control"],["type","submit",1,"btn","btn-primary",3,"disabled"],["type","button",1,"btn","btn-primary",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1),t.YNc(2,b,0,0,"ng-template",2),t.YNc(3,v,2,0,"div",3),t.YNc(4,C,16,3,"form",4),t.qZA()()),2&e&&(t.xp6(3),t.Q6J("ngIf",o.isLoading),t.xp6(1),t.Q6J("ngIf",!o.isLoading))},dependencies:[g.O5,s._Y,s.Fj,s.JJ,s.JL,s.Q7,s.wO,s.on,s.On,s.F,f,p]}),n})();var x=l(4466);let A=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[g.ez,s.u5,u.Bz.forChild([{path:"",component:_}]),x.m]}),n})()}}]);