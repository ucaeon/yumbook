import type { ApiError } from '../types/error';

export const createApiError = (response: Response, message?: string): ApiError => {
  return {
    message: message || `HTTP ${response.status}: ${response.statusText}`,
    status: response.status,
    statusText: response.statusText,
    code: response.status.toString(),
  };
};

export const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
  
  try {
    const errorData = await response.json();
    if (errorData.message) {
      errorMessage = errorData.message;
    } else if (errorData.error) {
      errorMessage = errorData.error;
    }
  } catch {
    // JSON 파싱 실패 시 기본 메시지 사용
  }
  
  throw createApiError(response, errorMessage);
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as { message: string }).message;
  }
  
  return '알 수 없는 오류가 발생했습니다.';
};

export const getErrorStatus = (error: unknown): number | undefined => {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    return (error as { status: number }).status;
  }
  return undefined;
};
