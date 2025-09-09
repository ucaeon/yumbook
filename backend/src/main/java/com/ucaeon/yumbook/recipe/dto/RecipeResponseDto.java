package com.ucaeon.yumbook.recipe.dto;

import lombok.Getter;

@Getter
public class RecipeResponseDto {
    private final Long id;
    private final String title;

    public RecipeResponseDto(Long id, String title) {
        this.id = id;
        this.title = title;
    }
}
