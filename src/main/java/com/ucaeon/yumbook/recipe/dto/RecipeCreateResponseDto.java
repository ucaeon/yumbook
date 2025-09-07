package com.ucaeon.yumbook.recipe.dto;

import lombok.Getter;

@Getter
public class RecipeCreateResponseDto {
    private final Long id;

    public RecipeCreateResponseDto(Long id) {
        this.id = id;
    }
}

