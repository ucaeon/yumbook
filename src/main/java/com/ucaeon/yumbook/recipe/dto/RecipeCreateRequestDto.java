package com.ucaeon.yumbook.recipe.dto;

import com.ucaeon.yumbook.recipe.domain.Recipe;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecipeCreateRequestDto {

    @NotBlank(message = "제목은 필수입니다")
    @Size(max = 20, message = "제목은 20자 이하로 입력해주세요")
    private String title;

    @NotBlank(message = "재료는 필수입니다")
    @Size(max = 500, message = "재료는 500자 이하로 입력해주세요")
    private String ingredients;

    @NotBlank(message = "조리법은 필수입니다")
    @Size(max = 2000, message = "조리법은 2000자 이하로 입력해주세요")
    private String instructions;

    private String difficulty;

    private String cookingTime;

    private String servings;

    public Recipe toEntity() {
        return Recipe.builder()
                .title(title)
                .ingredients(ingredients)
                .instructions(instructions)
                .difficulty(difficulty)
                .cookingTime(cookingTime)
                .servings(servings)
                .build();
    }
}