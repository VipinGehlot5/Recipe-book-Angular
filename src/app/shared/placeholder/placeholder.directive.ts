import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective{
    constructor(public viewContainerRef: ViewContainerRef){} 
// publically accessible : userd in auth.comp.html dom anf then accessedas vielChild in auth.comp.ts

}