import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;
  headingName: string;  //

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params)=>{
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id)
        this.headingName = this.recipeService.getRecipe(this.id).name //
        console.log(this.headingName, this.id) //
      }
    )
  }

  onAddtoShoppingList(){
    this.recipeService.addIngredientsToShoppinglist(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}) //another method
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  // onChangeHeading(){
  //   const ingNewHeading = this.textBoxInputRef.nativeElement.value;
  //   console.log(this.textBoxInputRef)
  //   this.recipeService.changeHeadingBytextBox(this.id ,ingNewHeading)
  // }
  
  // onChangeHeading(id: number, headingName:string){
  //   this.recipeService.changeHeadingBytextBox(this.id, this.headingName)
  // }
}