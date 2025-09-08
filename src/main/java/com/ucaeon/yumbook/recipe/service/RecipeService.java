package com.ucaeon.yumbook.recipe.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ucaeon.yumbook.recipe.domain.Recipe;
import com.ucaeon.yumbook.recipe.dto.RecipeCreateRequestDto;
import com.ucaeon.yumbook.recipe.dto.RecipeListResponseDto;
import com.ucaeon.yumbook.recipe.repository.RecipeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

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

    public List<RecipeListResponseDto> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        return recipes.stream()
                .map(RecipeListResponseDto::new)
                .toList();
    }
}