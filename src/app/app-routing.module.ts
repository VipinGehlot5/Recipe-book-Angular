import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipResolverService } from './recipes/recipe-resolver.service';
// import { AuthGuard } from './auth/auth.guard';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  {path: '', redirectTo:'/recipes', pathMatch:'full'},
  {   //Lazy Laoding
    path : 'recipes', 
    loadChildren: ()=> import('./recipes/recipes.module')
    .then( m => m.RecipesModule)
  },
  {
    path: 'shopping-list', 
    loadChildren: ()=> import('./shopping-list/shopping-list.module')
    .then( m => m.ShoppingListModule )
  },
  {
    path: 'auth', 
    loadChildren: ()=> import('./auth/auth.module')
    .then( m => m.AuthModule )
  }

  // {path: 'shopping-list', component: ShoppingListComponent},
  /*
  {path: 'recipes', 
  component: RecipesComponent, 
  canActivate: [AuthGuard],
  children:[
    {path:'', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},  //put "new" path above ":id" eles show error
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipResolverService]},
    {path: ':id/edit' , component: RecipeEditComponent, resolve: [RecipResolverService]} ,
  ]},
  {path: 'auth', component: AuthComponent},

  */
];

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes, 
    {preloadingStrategy: PreloadAllModules}   //for Lazy Loaded Code
    )],
  exports: [RouterModule] // export in app.module.ts
})
export class AppRoutingModule { }
