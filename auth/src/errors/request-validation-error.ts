import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Error with validation!");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors
      .map((err) => {
        if (err.type === "field")
          return {
            message: err.msg,
            field: err.path,
          };
      })
      .filter(
        (error): error is { message: string; field: string } =>
          error !== undefined
      );
  }
}