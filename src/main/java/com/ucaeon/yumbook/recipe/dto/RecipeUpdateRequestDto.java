package com.ucaeon.yumbook.recipe.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecipeUpdateRequestDto {
    private String title;
    private String ingredients;
    private String instructions;
}
