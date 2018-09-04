import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShopingListService } from "../shopping-list/shoping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
        'This is simply a test', 
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    
    [
        new Ingredient('Mean', 1),
        new Ingredient('French fr', 20)
    ]),
        new Recipe('A second Recipe', 
        'This is simply a test', 
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    [
        new Ingredient('Buns',2),
        new Ingredient('Meat', 2)
    ])
  
    ];

    constructor(private slService: ShopingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());

    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }


}