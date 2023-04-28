
import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredients } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{

// recipeSelected = new Subject<Recipe>();

  //  private recipes: Recipe[] = [
  //       new Recipe(
  //       'A Rice Recipe', 
  //       'A Rice recipe Description', 
  //       'https://img.freepik.com/free-photo/close-up-indian-rice-dish-with-corn_23-2148294947.jpg?w=740&t=st=1681123529~exp=1681124129~hmac=bbc5c5821e64d7e18f2d5c6a6d6edfba17c8d846d81d82c2ff983bafe3e1710b',
  //       [
  //       new Ingredients('Meat', 1),
  //       new Ingredients('Rice', 20) 
  //       ]),
  //       new Recipe(
  //         'A Burger Recipe', 
  //         'A burger recipe Description', 
  //         'https://img.freepik.com/premium-photo/big-double-cheddar-cheeseburger-with-chicken-cutlet_147620-1306.jpg?w=740',
  //         [
  //           new Ingredients('Buns', 2),
  //           new Ingredients("Fries", 22)
  //         ])
  //     ]

    recipesChanged = new Subject<Recipe[]>()

    private recipes: Recipe[] = []

      constructor(private slService: ShoppingListService){}

      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
      }

      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index: number){
        return this.recipes[index]
      }

      addIngredientsToShoppinglist(ingredients: Ingredients[]){
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice())
      }
}