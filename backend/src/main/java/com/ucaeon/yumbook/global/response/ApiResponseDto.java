package com.ucaeon.yumbook.global.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiResponseDto<T> {
  private final int status;
  private final String code; // 성공 시에는 보통 "SUCCESS" 같은 문자열을 넣거나 null로 둡니다.
  private final String message;
  private final T data;

  public ApiResponseDto(HttpStatus status, String code, String message, T data) {
    this.status = status.value();
    this.code = code;
    this.message = message;
    this.data = data;
  }

  public static <T> ApiResponseDto<T> success(HttpStatus status, String message, T data) {
    return new ApiResponseDto<>(status, "SUCCESS", message, data);
  }
}
