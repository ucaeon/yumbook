export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
  code?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type AppError = ApiError | ValidationError;

export const isApiError = (error: unknown): error is ApiError => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

export const isValidationError = (error: unknown): error is ValidationError => {
  return typeof error === 'object' && error !== null && 'field' in error && 'message' in error;
};
