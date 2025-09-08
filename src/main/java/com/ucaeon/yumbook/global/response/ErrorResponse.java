package com.ucaeon.yumbook.global.response;

import com.ucaeon.yumbook.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class ErrorResponse {

  private final int status;
  private final String code;
  private final String message;

  private ErrorResponse(ErrorCode errorCode) {
    this.status = errorCode.getStatus().value();
    this.code = errorCode.getCode();
    this.message = errorCode.getMessage();
  }

  private ErrorResponse(int status, String code, String message) {
    this.status = status;
    this.code = code;
    this.message = message;
  }

  public static ErrorResponse of(ErrorCode errorCode) {
    return new ErrorResponse(errorCode);
  }

  public static ErrorResponse of(int status, String code, String message) {
    return new ErrorResponse(status, code, message);
  }
}
