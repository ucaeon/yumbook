package com.ucaeon.yumbook.recipe.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ucaeon.yumbook.global.exception.CustomException;
import com.ucaeon.yumbook.global.exception.ErrorCode;
import com.ucaeon.yumbook.recipe.domain.Recipe;
import com.ucaeon.yumbook.recipe.dto.RecipeCreateRequestDto;
import com.ucaeon.yumbook.recipe.dto.RecipeDetailResponseDto;
import com.ucaeon.yumbook.recipe.dto.RecipeListResponseDto;
import com.ucaeon.yumbook.recipe.dto.RecipeUpdateRequestDto;
import com.ucaeon.yumbook.recipe.dto.RecipeUpdateResponseDto;
import com.ucaeon.yumbook.recipe.dto.RecipeDeleteResponseDto;
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


    public RecipeDetailResponseDto getRecipeById(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.RECIPE_NOT_FOUND));
        return new RecipeDetailResponseDto(recipe);
    }
    

    @Transactional
    public RecipeUpdateResponseDto updateRecipe(Long id, RecipeUpdateRequestDto requestDto) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.RECIPE_NOT_FOUND));
        
        recipe.update(requestDto.getTitle(), requestDto.getIngredients(), requestDto.getInstructions(), 
                     requestDto.getDifficulty(), requestDto.getCookingTime(), requestDto.getServings());
        
        return new RecipeUpdateResponseDto(recipe.getId(), recipe.getTitle());
    }

    
    @Transactional
    public RecipeDeleteResponseDto deleteRecipe(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.RECIPE_NOT_FOUND));
        
        recipeRepository.deleteById(id);
        
        return new RecipeDeleteResponseDto(recipe.getId(), recipe.getTitle());
    }
}