import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService]   //put in app.module.ts to sync with entire data.
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe;    //before routing

constructor(
  // private recipeService: RecipeService     //before routing
  ){}

ngOnInit(): void {
  // this.recipeService.recipeSelected      //before routing
  // .subscribe(
  //   (recipe: Recipe)=>{
  //     this.selectedRecipe = recipe
  //   })
}
}
