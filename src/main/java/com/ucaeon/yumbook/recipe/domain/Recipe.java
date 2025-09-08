package com.ucaeon.yumbook.recipe.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String ingredients;

    @Column(nullable = false)
    private String instructions;

    private String difficulty;

    private String cookingTime;

    private String servings;

    @Builder
    private Recipe(String title, String ingredients, String instructions, String difficulty, String cookingTime, String servings) {
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.difficulty = difficulty;
        this.cookingTime = cookingTime;
        this.servings = servings;
    }

    public void update(String title, String ingredients, String instructions, String difficulty, String cookingTime, String servings) {
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.difficulty = difficulty;
        this.cookingTime = cookingTime;
        this.servings = servings;
    }
}