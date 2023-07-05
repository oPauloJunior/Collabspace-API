interface IAppError {
  statusCode?: number;
  message?: string;
}

class AppError {
  public readonly statusCode: number;
  public readonly result: string;
  public readonly message: string | undefined;

  constructor({ statusCode = 400, message }: IAppError) {
    this.statusCode = statusCode;
    this.result = "error";
    this.message = message;
  }
}

export { AppError };
