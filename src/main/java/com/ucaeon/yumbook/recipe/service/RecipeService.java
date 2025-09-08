package com.ucaeon.yumbook.recipe.service;

import com.ucaeon.yumbook.global.exception.CustomException;
import com.ucaeon.yumbook.global.exception.ErrorCode;
import com.ucaeon.yumbook.recipe.domain.Recipe;
import com.ucaeon.yumbook.recipe.dto.RecipeRequestDto;
import com.ucaeon.yumbook.recipe.dto.RecipeDetailResponseDto;
import com.ucaeon.yumbook.recipe.dto.RecipeListResponseDto;
import com.ucaeon.yumbook.recipe.dto.RecipeResponseDto;
import com.ucaeon.yumbook.recipe.repository.RecipeRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecipeService {

  private final RecipeRepository recipeRepository;

  @Transactional
  public Long createRecipe(RecipeRequestDto requestDto) {
    Recipe recipe = Recipe.builder()
        .title(requestDto.getTitle())
        .ingredients(requestDto.getIngredients())
        .instructions(requestDto.getInstructions())
        .difficulty(requestDto.getDifficulty())
        .cookingTime(requestDto.getCookingTime())
        .servings(requestDto.getServings())
        .build();
    Recipe savedRecipe = recipeRepository.save(recipe);
    return savedRecipe.getId();
  }

  public List<RecipeListResponseDto> getAllRecipes() {
    List<Recipe> recipes = recipeRepository.findAll();
    return recipes.stream().map(RecipeListResponseDto::new).toList();
  }

  public RecipeDetailResponseDto getRecipeById(Long id) {
    Recipe recipe =
        recipeRepository
            .findById(id)
            .orElseThrow(() -> new CustomException(ErrorCode.RECIPE_NOT_FOUND));
    return new RecipeDetailResponseDto(recipe);
  }

  @Transactional
  public RecipeResponseDto updateRecipe(Long id, RecipeRequestDto requestDto) {
    Recipe recipe =
        recipeRepository
            .findById(id)
            .orElseThrow(() -> new CustomException(ErrorCode.RECIPE_NOT_FOUND));

    recipe.update(requestDto.getTitle(), requestDto.getIngredients(), requestDto.getInstructions(),
                 requestDto.getDifficulty(), requestDto.getCookingTime(), requestDto.getServings());

    return new RecipeResponseDto(recipe.getId(), recipe.getTitle());
  }

  @Transactional
  public RecipeResponseDto deleteRecipe(Long id) {
    Recipe recipe =
        recipeRepository
            .findById(id)
            .orElseThrow(() -> new CustomException(ErrorCode.RECIPE_NOT_FOUND));

    recipeRepository.deleteById(id);

    return new RecipeResponseDto(recipe.getId(), recipe.getTitle());
  }
}
