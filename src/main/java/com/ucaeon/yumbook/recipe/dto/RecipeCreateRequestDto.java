package com.ucaeon.yumbook.recipe.dto;

import com.ucaeon.yumbook.recipe.domain.Recipe;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecipeCreateRequestDto {

    private String title;
    private String ingredients;
    private String instructions;

    public Recipe toEntity() {
        return Recipe.builder()
                .title(title)
                .ingredients(ingredients)
                .instructions(instructions)
                .build();
    }
}