import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipResolverService } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const routes: Routes= [
    {
    // path: 'recipes',   //without lazy Loading
    path: '',       //with Lazy Loading
    component: RecipesComponent, 
    canActivate: [AuthGuard],
    children:[
        {path:'', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},  //put "new" path above ":id" eles show error
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipResolverService]},
        {path: ':id/edit' , component: RecipeEditComponent, resolve: [RecipResolverService]} 
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule{}