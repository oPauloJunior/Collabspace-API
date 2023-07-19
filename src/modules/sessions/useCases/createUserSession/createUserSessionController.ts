import { Request, Response } from "express";
import { IRequestCreateUserSession } from "@modules/sessions/dtos/sessions";
import { container } from "tsyringe";
import { CreateUserSessionUseCase } from "./createUserSessionUseCase";

class CreateUserSessionController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body as IRequestCreateUserSession;

    const createUserSessionUseCase = container.resolve(
      CreateUserSessionUseCase
    );

    const result = await createUserSessionUseCase.execute({
      email,
      password,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { CreateUserSessionController };
