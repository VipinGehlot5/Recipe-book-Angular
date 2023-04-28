import { EventEmitter } from "@angular/core";
import { Ingredients } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredients[]>();
    startedEditing = new Subject<number>();
    private  ingredients : Ingredients[] = [
        new Ingredients("Ingredient 1", 5),
        new Ingredients("Ingredient 2", 10)
      ];

      getIngredients(){
       return this.ingredients.slice();
      }

      getIngredient(index: number){
        return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredients){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice())
      }

      addIngredients(ingredients: Ingredients[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice())
      }

      updateIngrediet(index: number, newIngredient: Ingredients){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice())
      }

      deleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}