package com.ucaeon.yumbook.recipe.dto;

import lombok.Getter;

@Getter
public class RecipeDeleteResponseDto {
    private final Long id;
    private final String title;

    public RecipeDeleteResponseDto(Long id, String title) {
        this.id = id;
        this.title = title;
    }
}
