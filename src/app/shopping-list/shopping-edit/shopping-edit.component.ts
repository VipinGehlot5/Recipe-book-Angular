import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;    //without ngform
  // @ViewChild('amountInput') amountInputRef: ElementRef;    //without ngform

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem : Ingredients;

  constructor(private slService: ShoppingListService){}

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index: number)=> {
        this.editMode = true;
        console.log("Edit Mode: ",this.editMode)
        this.editedItemIndex = index;
        console.log("editedItemIndex: ",this.editedItemIndex)
        this.editedItem = this.slService.getIngredient(index);
        console.log('editedItem:',this.editedItem)

        this.slForm.setValue({        //changing value in the input el of the slForm when we click on any item of the list.
          name: this.editedItem.name,
          amount : this.editedItem.amount
        })
      }
    );
  }

  onSubmit(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;   //without ngform
    // const ingAmount = this.amountInputRef.nativeElement.value;   //without ngform
    // const newIngredient = new Ingredients(ingName, ingAmount);
    const value = form.value
    const newIngredient = new Ingredients(value.name, value.amount);
    if (this.editMode){
      this.slService.updateIngrediet(this.editedItemIndex, newIngredient);
    }else{
    this.slService.addIngredient(newIngredient)
    }
    this.editMode = false;
    console.log("Edit Mode: ",this.editMode)    
    form.reset();       //clears the input value
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
    console.log("Edit Mode: ",this.editMode) 
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
