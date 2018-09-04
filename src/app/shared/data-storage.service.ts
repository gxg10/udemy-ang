import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from "@angular/common/http";

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
    private recipeService: RecipeService) {}

    storeRecipes() {
        return this.httpClient.put('https://ng-recipe-book-67a83.firebaseio.com/recipes.json', 
        this.recipeService.getRecipes(), {
            observe: 'body'
        });
    }

    // const header =  new HttpHeaders().set('Authorization',
    // 'Bearer asdasdasd');

//     const req = new HttpRequest('PUT','https://ng-recipe-book-67a83.firebaseio.com/recipes.json',
// this.recipeService.getRecipes(), {reportProgress: true, params: new HttpParams('auth')})

    

    getRecipes() {
        // return this.httpClient.get<Recipe[]>('https://ng-recipe-book-67a83.firebaseio.com/recipes.json')
        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-67a83.firebaseio.com/recipes.json', 
    {
        observe: 'body',
        responseType: 'json'
    })

        .map(
            (recipes) => {
                console.log(recipes);
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        console.log(recipe);
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;

            }
        )
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
      }
}