interface ErrorOptions {
  cause?: unknown;
  message?: string;
}

export class InternalServerError extends Error {
  readonly action;
  readonly statusCode;
  readonly cause;
  constructor({ cause }: ErrorOptions) {
    super("Um Erro Interno não esperado aconteceu.");
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte";
    this.statusCode = 500;
    this.cause = cause;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  readonly action;
  readonly statusCode;
  constructor() {
    super("Método não permitido para este endpoint.");
    this.name = "MethodNotAllowedError";
    this.action = "Verifique o método HTTP utilizado";
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class BadRequestError extends Error {
  readonly action;
  readonly statusCode;
  readonly cause;
  constructor({ cause, message }: ErrorOptions) {
    super(message || "Requisição inválida");
    this.name = "BadRequestError";
    this.action = "Verifique os dados enviados";
    this.statusCode = 400;
    this.cause = cause;
  }
}
