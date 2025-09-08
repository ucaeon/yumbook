package com.ucaeon.yumbook.recipe.dto;

import lombok.Getter;

@Getter
public class RecipeUpdateResponseDto {
    private final Long id;
    private final String title;

    public RecipeUpdateResponseDto(Long id, String title) {
        this.id = id;
        this.title = title;
    }
}
