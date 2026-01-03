import { useState } from "react";

export interface ValidationError {
  field: string;
  message: string;
}

export const useValidation = () => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateCurrency = (value: string): boolean => {
    const currencyRegex = /^(\d+([.,]\d{2})?)?$/;
    return currencyRegex.test(value.trim()) && parseFloat(value.replace(",", ".")) > 0;
  };

  const addError = (field: string, message: string) => {
    setErrors((prev) => {
      const existing = prev.find((e) => e.field === field);
      if (existing) {
        return prev.map((e) =>
          e.field === field ? { ...e, message } : e
        );
      }
      return [...prev, { field, message }];
    });
  };

  const removeError = (field: string) => {
    setErrors((prev) => prev.filter((e) => e.field !== field));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const getError = (field: string): string | undefined => {
    return errors.find((e) => e.field === field)?.message;
  };

  const hasErrors = (): boolean => {
    return errors.length > 0;
  };

  return {
    errors,
    validateEmail,
    validatePassword,
    validateCurrency,
    addError,
    removeError,
    clearErrors,
    getError,
    hasErrors,
  };
};
