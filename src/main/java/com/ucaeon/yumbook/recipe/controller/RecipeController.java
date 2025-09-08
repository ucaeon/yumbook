package com.ucaeon.yumbook.recipe.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ucaeon.yumbook.common.dto.ApiResponseDto;
import com.ucaeon.yumbook.recipe.dto.RecipeCreateRequestDto;
import com.ucaeon.yumbook.recipe.dto.RecipeCreateResponseDto;
import com.ucaeon.yumbook.recipe.dto.RecipeDetailResponseDto;
import com.ucaeon.yumbook.recipe.dto.RecipeListResponseDto;
import com.ucaeon.yumbook.recipe.dto.RecipeUpdateRequestDto;
import com.ucaeon.yumbook.recipe.dto.RecipeUpdateResponseDto;
import com.ucaeon.yumbook.recipe.service.RecipeService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    @PostMapping
    public ResponseEntity<ApiResponseDto<RecipeCreateResponseDto>> createRecipe(@RequestBody RecipeCreateRequestDto requestDto) {
        Long recipeId = recipeService.createRecipe(requestDto);
        RecipeCreateResponseDto responseData = new RecipeCreateResponseDto(recipeId);

        ApiResponseDto<RecipeCreateResponseDto> responseBody = ApiResponseDto.success(
                HttpStatus.CREATED,
                "레시피 생성에 성공했습니다.",
                responseData
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
    }

    
    @GetMapping
    public ResponseEntity<ApiResponseDto<List<RecipeListResponseDto>>> getAllRecipes() {
        List<RecipeListResponseDto> recipes = recipeService.getAllRecipes();
        
        ApiResponseDto<List<RecipeListResponseDto>> responseBody = ApiResponseDto.success(
                HttpStatus.OK,
                "레시피 목록 조회에 성공했습니다.",
                recipes
        );
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDto<RecipeDetailResponseDto>> getRecipeById(@PathVariable Long id) {
        RecipeDetailResponseDto recipe = recipeService.getRecipeById(id);
        
        ApiResponseDto<RecipeDetailResponseDto> responseBody = ApiResponseDto.success(
                HttpStatus.OK,
                "레시피 상세 조회에 성공했습니다.",
                recipe
        );
        
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDto<RecipeUpdateResponseDto>> updateRecipe(
            @PathVariable Long id, 
            @RequestBody RecipeUpdateRequestDto requestDto) {
        RecipeUpdateResponseDto recipe = recipeService.updateRecipe(id, requestDto);
        
        ApiResponseDto<RecipeUpdateResponseDto> responseBody = ApiResponseDto.success(
                HttpStatus.OK,
                "레시피 수정에 성공했습니다.",
                recipe
        );
        
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}