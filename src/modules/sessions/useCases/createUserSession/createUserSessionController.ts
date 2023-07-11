import { IRequestCreateUserSession } from "@modules/sessions/dtos/sessions";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserSessionUseCase } from "./createUserSessionUseCase";

class CreateUserSessionController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body as IRequestCreateUserSession;

    const createUserSessionUseCase = container.resolve(
      CreateUserSessionUseCase
    );

    const result = await createUserSessionUseCase.execute({
      email,
      password,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { CreateUserSessionController };
