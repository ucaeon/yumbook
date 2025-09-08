package com.ucaeon.yumbook.recipe.service;

import com.ucaeon.yumbook.recipe.domain.Recipe;
import com.ucaeon.yumbook.recipe.dto.RecipeRequestDto;
import com.ucaeon.yumbook.recipe.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class RecipeServiceTest {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private RecipeRepository recipeRepository;

    @Test
    void createRecipe_Test() {
        // Given
        RecipeRequestDto requestDto = new RecipeRequestDto();
        requestDto.setTitle("김치찌개");
        requestDto.setIngredients("김치, 돼지고기, 두부");
        requestDto.setInstructions("1. 김치를 볶는다 2. 물을 넣고 끓인다");
        requestDto.setDifficulty("쉬움");
        requestDto.setCookingTime("30분");
        requestDto.setServings("2인분");

        // When
        Long recipeId = recipeService.createRecipe(requestDto);

        // Then
        assertThat(recipeId).isNotNull();
        
        Recipe savedRecipe = recipeRepository.findById(recipeId).orElse(null);
        assertThat(savedRecipe).isNotNull();
        assertThat(savedRecipe.getTitle()).isEqualTo("김치찌개");
        assertThat(savedRecipe.getDifficulty()).isEqualTo("쉬움");
        assertThat(savedRecipe.getCookingTime()).isEqualTo("30분");
        assertThat(savedRecipe.getServings()).isEqualTo("2인분");
    }

    @Test
    void getAllRecipes_Test() {
        // Given
        Recipe recipe1 = Recipe.builder()
                .title("김치찌개")
                .ingredients("김치, 돼지고기")
                .instructions("끓인다")
                .difficulty("쉬움")
                .cookingTime("30분")
                .servings("2인분")
                .build();
        
        Recipe recipe2 = Recipe.builder()
                .title("된장찌개")
                .ingredients("된장, 두부")
                .instructions("끓인다")
                .difficulty("쉬움")
                .cookingTime("20분")
                .servings("1인분")
                .build();
        
        recipeRepository.save(recipe1);
        recipeRepository.save(recipe2);

        // When
        var recipes = recipeService.getAllRecipes();

        // Then
        assertThat(recipes).hasSize(2);
        assertThat(recipes.get(0).getTitle()).isEqualTo("김치찌개");
        assertThat(recipes.get(0).getDifficulty()).isEqualTo("쉬움");
        assertThat(recipes.get(0).getCookingTime()).isEqualTo("30분");
        assertThat(recipes.get(0).getServings()).isEqualTo("2인분");
        assertThat(recipes.get(1).getTitle()).isEqualTo("된장찌개");
        assertThat(recipes.get(1).getDifficulty()).isEqualTo("쉬움");
        assertThat(recipes.get(1).getCookingTime()).isEqualTo("20분");
        assertThat(recipes.get(1).getServings()).isEqualTo("1인분");
    }

    @Test
    void getRecipeById_Test() {
        // Given
        Recipe recipe = Recipe.builder()
                .title("김치찌개")
                .ingredients("김치, 돼지고기")
                .instructions("끓인다")
                .difficulty("쉬움")
                .cookingTime("30분")
                .servings("2인분")
                .build();
        
        Recipe savedRecipe = recipeRepository.save(recipe);

        // When
        var result = recipeService.getRecipeById(savedRecipe.getId());

        // Then
        assertThat(result.getTitle()).isEqualTo("김치찌개");
        assertThat(result.getIngredients()).isEqualTo("김치, 돼지고기");
        assertThat(result.getDifficulty()).isEqualTo("쉬움");
        assertThat(result.getCookingTime()).isEqualTo("30분");
        assertThat(result.getServings()).isEqualTo("2인분");
    }

    @Test
    void updateRecipe_Test() {
        // Given
        Recipe recipe = Recipe.builder()
                .title("김치찌개")
                .ingredients("김치, 돼지고기")
                .instructions("끓인다")
                .difficulty("쉬움")
                .cookingTime("30분")
                .servings("2인분")
                .build();
        
        Recipe savedRecipe = recipeRepository.save(recipe);
        
        RecipeRequestDto updateDto = new RecipeRequestDto();
        updateDto.setTitle("된장찌개");
        updateDto.setIngredients("된장, 두부");
        updateDto.setInstructions("끓인다");
        updateDto.setDifficulty("보통");
        updateDto.setCookingTime("25분");
        updateDto.setServings("1인분");

        // When
        var result = recipeService.updateRecipe(savedRecipe.getId(), updateDto);

        // Then
        assertThat(result.getTitle()).isEqualTo("된장찌개");
        
        Recipe updatedRecipe = recipeRepository.findById(savedRecipe.getId()).orElse(null);
        assertThat(updatedRecipe.getTitle()).isEqualTo("된장찌개");
        assertThat(updatedRecipe.getDifficulty()).isEqualTo("보통");
        assertThat(updatedRecipe.getCookingTime()).isEqualTo("25분");
        assertThat(updatedRecipe.getServings()).isEqualTo("1인분");
    }

    @Test
    void deleteRecipe_Test() {
        // Given
        Recipe recipe = Recipe.builder()
                .title("김치찌개")
                .ingredients("김치, 돼지고기")
                .instructions("끓인다")
                .difficulty("쉬움")
                .cookingTime("30분")
                .servings("2인분")
                .build();
        
        Recipe savedRecipe = recipeRepository.save(recipe);

        // When
        var result = recipeService.deleteRecipe(savedRecipe.getId());

        // Then
        assertThat(result.getTitle()).isEqualTo("김치찌개");
        
        var deletedRecipe = recipeRepository.findById(savedRecipe.getId());
        assertThat(deletedRecipe).isEmpty();
    }
}