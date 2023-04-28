import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients : Ingredients[] ;
  private subscription : Subscription; //Might be "subscription" in future.

  constructor(private slService: ShoppingListService){}

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredients[]) =>{
        this.ingredients = ingredients
      });
  }

  onEditItem(index : number){
    this.slService.startedEditing.next(index);
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
