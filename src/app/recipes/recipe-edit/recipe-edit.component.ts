import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
id: number;
editMode = false;
recipeForm: FormGroup;

constructor(private route:ActivatedRoute,
  private router: Router,
  private recipeService: RecipeService){}

ngOnInit(): void {
  this.route.params
  .subscribe(
    (params: Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log('Is editMode: ', this.editMode);
      this.initForm()
    }
  );
}

onSubmit(){
  console.log(this.recipeForm)
  // const newRecipe = new Recipe(            //or simply use: this.recipeForm.value
  //   this.recipeForm.value['name'],
  //   this.recipeForm.value['description'],
  //   this.recipeForm.value['imagePath'],
  //   this.recipeForm.value['ingredients'] ); 
  if(this.editMode){
    this.recipeService.updateRecipe(this.id, this.recipeForm.value);
  }else{
    this.recipeService.addRecipe(this.recipeForm.value);
  }
  this.onCancel()   //just to navigate purpose
}

onAddIngredient(){
  (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    })
  )
}

get Controls(){       //a getter to get controls from ingredients array
  return (<FormArray>this.recipeForm.get('ingredients')).controls
}

onCancel(){
  this.router.navigate(['../'], {relativeTo: this.route});
}

onDeleteIngredient(index:number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}

  private initForm(){
    let recipeName = '';        //if we are creating the new recipe
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){        //if we are editing the exixting recipe
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      
      if (recipe['ingredients']){     //for filling the ingredients in recipe
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount , [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients,
    })
  }

  


}
