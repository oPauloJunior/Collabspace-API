import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./createUserUseCase";
import { IRequestCreateUser } from "@modules/users/dtos/users";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      telephone,
      birthDate,
    } = request.body as IRequestCreateUser;

    const createUserCase = container.resolve(CreateUserUseCase);

    const result = await createUserCase.execute({
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      telephone,
      birthDate,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { CreateUserController };
