import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";



@NgModule({
    declarations: [
        RecipeStartComponent,
        RecipeEditComponent,
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
    ],
    imports: [
        RouterModule,
        // CommonModule,   //Replacement for Browser mod as BrowserModule can be declared only once that too in rootimport { RouterModule } from "@angular/router";
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
    ],
    exports: [
        RecipeStartComponent,
        RecipeEditComponent,
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
    ]
})

export class RecipesModule {}