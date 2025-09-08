package com.ucaeon.yumbook.recipe.dto;

import com.ucaeon.yumbook.recipe.domain.Recipe;

import lombok.Getter;

@Getter
public class RecipeListResponseDto {
    private final Long id;
    private final String title;
    private final String ingredients;
    private final String instructions;

    public RecipeListResponseDto(Recipe recipe) {
        this.id = recipe.getId();
        this.title = recipe.getTitle();
        this.ingredients = recipe.getIngredients();
        this.instructions = recipe.getInstructions();
    }
}
