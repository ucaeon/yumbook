package com.ucaeon.yumbook.recipe.service;

import com.ucaeon.yumbook.recipe.domain.Recipe;
import com.ucaeon.yumbook.recipe.dto.RecipeCreateRequestDto;
import com.ucaeon.yumbook.recipe.repository.RecipeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Transactional
    public Long createRecipe(RecipeCreateRequestDto requestDto) {
        Recipe recipe = requestDto.toEntity();
        Recipe savedRecipe = recipeRepository.save(recipe);
        return savedRecipe.getId();
    }
}