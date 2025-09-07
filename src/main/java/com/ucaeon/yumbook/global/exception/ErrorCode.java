package com.ucaeon.yumbook.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // 공통
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "C001", "잘못된 입력 값입니다."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "C002", "허용되지 않은 요청입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C003", "서버에 오류가 발생했습니다."),

    // 레시피 관련
    RECIPE_NOT_FOUND(HttpStatus.NOT_FOUND, "R001", "해당 레시피를 찾을 수 없습니다.");

    //추가 에러 코드를 여기에 작성  예정

    private final HttpStatus status;
    private final String code;
    private final String message;
}
