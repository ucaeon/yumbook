package com.ucaeon.yumbook.global.exception;

import com.ucaeon.yumbook.global.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  // 직접 정의 CustomException을 처리
  @ExceptionHandler(CustomException.class)
  protected ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
    log.error("handleCustomException: {}", e.getErrorCode());
    final ErrorResponse response = ErrorResponse.of(e.getErrorCode());
    return new ResponseEntity<>(response, e.getErrorCode().getStatus());
  }

  // 유효성 검증 예외 처리
  @ExceptionHandler(MethodArgumentNotValidException.class)
  protected ResponseEntity<ErrorResponse> handleValidationException(
      MethodArgumentNotValidException e) {
    // 구체적인 검증 에러 메시지 추출
    String errorMessage =
        e.getBindingResult().getFieldErrors().stream()
            .findFirst()
            .map(error -> error.getDefaultMessage())
            .orElse("값을 입력해주세요");

    log.error("handleValidationException: {}", errorMessage);
    final ErrorResponse response =
        ErrorResponse.of(HttpStatus.BAD_REQUEST.value(), "V001", errorMessage);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  // 나머지 모든 예외를 처리하는 핸들러
  @ExceptionHandler(Exception.class)
  protected ResponseEntity<ErrorResponse> handleException(Exception e) {
    log.error("handleException: {}", e.getMessage());
    final ErrorResponse response = ErrorResponse.of(ErrorCode.INTERNAL_SERVER_ERROR);
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
