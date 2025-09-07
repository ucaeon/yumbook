package com.ucaeon.yumbook.recipe.controller;

import com.ucaeon.yumbook.common.dto.ApiResponseDto;
import com.ucaeon.yumbook.recipe.dto.RecipeCreateRequestDto;
import com.ucaeon.yumbook.recipe.dto.RecipeCreateResponseDto;
import com.ucaeon.yumbook.recipe.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}