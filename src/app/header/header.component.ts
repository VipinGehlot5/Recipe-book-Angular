import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{  
    collapsed = true;
    // @Output() featureSelected = new EventEmitter<string>()
    isAuthenticated = false;
    private userSub : Subscription;

    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService){}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user=>{
            this.isAuthenticated = !!user;      // this.isAuthenticated =  !user ? false : true;
            // console.log(!user);
            console.log("isAuthenticated:",!!user)
        })
    }


    onSaveData(){
        this.dataStorageService.storedRecipe();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe()
    }

    onLogout(){
        this.authService.logout();
    }


    ngOnDestroy(): void {
        this.userSub.unsubscribe()
    }

    // onSelect(feature: string){
    //     this.featureSelected.emit(feature)
    // }
}