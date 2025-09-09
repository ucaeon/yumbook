package com.ucaeon.yumbook.recipe.repository;

import com.ucaeon.yumbook.recipe.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {}
