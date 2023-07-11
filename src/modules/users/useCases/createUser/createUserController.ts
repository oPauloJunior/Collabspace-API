import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./createUserUseCase";
import { IRequestCreateUser } from "@modules/users/dtos/users";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const {
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      telephone,
      birthDate,
    } = req.body as IRequestCreateUser;

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

    return res.status(result.statusCode).json(result);
  }
}

export { CreateUserController };
